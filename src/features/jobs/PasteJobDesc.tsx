import { useState } from 'react';
import { TextField, Button, Box, FormGroup } from '@mui/material';

interface FormValues {
    Title: string;
    Description: string;
}

export interface NewJobForContactProps {
    cntId: number;
    //AvatarClickFunction: () => void;
}

export const NewJobForContact: React.FC<NewJobForContactProps> = (contactId) => {
    const [values, setValues] = useState<FormValues>({
        Title: '',
        Description: '',
    });
    const [errors, setErrors] = useState<FormValues>({
        Title: '',
        Description: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!values.Description) {
            setErrors({
                ...errors,
                Description: 'Description is required',
            });
            return;
        }
        if (!values.Title) {
            setErrors({
                ...errors,
                Title: 'Title is required',
            });
            return;
        }
        console.log(`Title: ${values.Title}, Description: ${values.Description}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <FormGroup >
                    <TextField 
                        label="Title"
                        value={values.Title}
                        onChange={handleChange}
                        error={Boolean(errors.Title)}
                        helperText={errors.Title}
                        spellCheck
                        variant="outlined"
                    />
                    <TextField
                        label="Description"
                        value={values.Description}
                        onChange={handleChange}
                        error={Boolean(errors.Description)}
                        helperText={errors.Description}
                        multiline
                        rows={10}
                        variant="outlined"
                        spellCheck
                        InputProps={{
                            sx: { '& textarea': { overflowY: 'scroll' } },
                        }}
                    />
                    <Button type="submit">Submit</Button>
                </FormGroup>
            </Box>
        </form>

    );
}
