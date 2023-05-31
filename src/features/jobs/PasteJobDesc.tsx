import { useState } from 'react';
import { TextField, Button, Box, FormGroup, FormControl, Grid, Card, CardContent, Typography } from '@mui/material';

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
        setErrors({
            Title: '',
            Description: '',
        })
        console.log(`Title: ${values.Title}, Description: ${values.Description}`);
    };
    // <Box sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Card sx={{ borderRadius: 5 }}>
                        <CardContent>                           
                                <FormControl sx={{ width: '100%'}}>
                                    <FormGroup sx={{  gap: '20px' }}>
                                        <TextField sx={{ width: '100%' }}
                                            label="Title"
                                            name="Title"
                                            value={values.Title}
                                            onChange={handleChange}
                                            error={Boolean(errors.Title)}
                                            helperText={errors.Title}
                                            spellCheck
                                            variant="outlined"
                                        />
                                        <TextField
                                            label="Description"
                                            name="Description"
                                            value={values.Description}
                                            onChange={handleChange}
                                            error={Boolean(errors.Description)}
                                            helperText={errors.Description}
                                            multiline
                                            rows={20}
                                            variant="outlined"
                                            spellCheck
                                            InputProps={{
                                                sx: { '& textarea': { overflowY: 'scroll' } },
                                            }}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </FormGroup>
                                </FormControl>
                            

                        </CardContent>

                    </Card>

                </Grid>
            </Grid>
        </form>

    );
}
