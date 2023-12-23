import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import React, { useState } from 'react';
import { TextField, Button, Box, FormGroup, FormControl } from '@mui/material';
import { useAddJobForContactMutation, IdProp } from '../api/ClearConnectApiSlice'
import { ErrorResponse } from "@remix-run/router";
interface FormValues extends FieldValues {
    id: number;
    jrPositionTitle: string;
    jrPosDescription: string;
    [key: string]: number | string; // Add an index signature that allows string keys with number or string values
}
const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

export const NewJobForContact1: React.FC<IdProp> = ({ id }) => {
    const { register, handleSubmit, reset, control, setValue, formState: { errors },trigger } = useForm<FormValues>({mode: "all"})
   

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <FormControl sx={{ width: '90%', mt: 1 }}>
                    <FormGroup sx={{ gap: '10px' }}>                     
                        <Controller
                            name={"Title"}
                            control={control}
                            render={({ field, fieldState: { error, isDirty }, formState, }) => (

                                <TextField
                                    onBlur={field.onBlur}
                                    helperText={errors.Title?.message}
                                    error={!!errors.Title}
                                    onChange={field.onChange}
                                    value={field.value}
                                    fullWidth
                                    label="Title"
                                    name="jrPositionTitle"
                                    spellCheck
                                    variant="outlined"
                                />)}
                            defaultValue=""
                            rules={{ required: "Title is required", minLength: 3 }}
                        />
                        <Controller
                            name={"Description"}
                            control={control}
                            render={({ field, fieldState: { error }, formState, }) => (
                                <TextField
                                    label="Description"                                                                       
                                    helperText={error ? error.message : null}
                                    error={!!error}                                  
                                    multiline
                                    rows={30}
                                    variant="outlined"
                                    spellCheck
                                    InputProps={{
                                        sx: { '& textarea': { overflowY: 'scroll' } },
                                    }}
                                    {...field}
                                />
                            )}
                            rules={{ required: "Description is required", minLength: 3 }} />
                        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                            Submit
                        </Button>
                        <Button onClick={() => reset()} variant={"outlined"}>
                            Reset
                        </Button>
                    </FormGroup>
                </FormControl>
            </Box>
        </form>
    )
}