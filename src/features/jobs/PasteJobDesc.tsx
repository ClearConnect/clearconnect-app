import { useState } from 'react';
import { TextField, Button, Box, FormGroup, FormControl, Grid, Card, CardContent, Typography } from '@mui/material';
import { useAddJobMutation } from '../api/apiSlice'
import { ReqData } from '../jobs/ReqInterfaces';


export interface NewJobForContactProps {
    cntId: number;
    //AvatarClickFunction: () => void;
}
interface FormValues {
    id: number;
    jrPositionTitle: string;
    jrPosDescription: string;
    [key: string]: number | string; // Add an index signature that allows string keys with number or string values
}
export const NewJobForContact: React.FC<NewJobForContactProps> = (contactId) => {
    const [values, setValues] = useState<FormValues>({
        jrPositionTitle: '',
        jrPosDescription: '',
        id: 2037//contactId.cntId
    });
    const [errors, setErrors] = useState<FormValues>({
        id: contactId.cntId,
        jrPositionTitle: '',
        jrPosDescription: '',
    });
    const [AddJob, { isLoading }] = useAddJobMutation()
   
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {     
            setValues({
                ...values,
                [event.target.name]: event.target.value
            });
           setErrors({
                ...errors,
                [event.target.name]: !event.target.value ? `Text is required` : ''
            }); 
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`Title: ${values.jrPositionTitle}, Description: ${values.jrPosDescription}`);
        const canSave = [values.jrPosDescription, values.jrPositionTitle, values.id].every(Boolean) && !isLoading
          if (canSave) {
             try {
                 let  reqData:ReqData  = {}        
                 await AddJob({...reqData, JrPositionTitle: values.jrPositionTitle,  JrPosDescription: values.jrPosDescription, JrId: values.id }).unwrap()
             } catch (err) {
                 console.error('Failed to save the post: ', err)
             }
         }; 

    };
    // <Box sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <FormControl sx={{ width: '90%' }}>
                    <FormGroup sx={{ gap: '50px' }}>
                        <TextField sx={{ width: '100%' }}
                            label="Title"
                            name="jrPositionTitle"
                            value={values.jrPositionTitle}
                            onChange={handleChange}
                            error={Boolean(errors.jrPositionTitle)}
                            helperText={errors.jrPositionTitle}
                            spellCheck
                            variant="outlined"
                        />
                        <TextField
                            label="Description"
                            name="jrPosDescription"
                            value={values.jrPosDescription}
                            onChange={handleChange}
                            error={Boolean(errors.jrPosDescription)}
                            helperText={errors.jrPosDescription}
                            multiline
                            rows={30}
                            variant="outlined"
                            spellCheck
                            InputProps={{
                                sx: { '& textarea': { overflowY: 'scroll' } },
                            }}
                        />
                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </FormControl>
            </Box>
        </form>

    );
}
