import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import React, { useState } from 'react';
import { TextField, Button, Box, FormGroup, FormControl } from '@mui/material';
import { useAddJobForContactMutation, IdProp  } from '../api/ClearConnectApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ErrorResponse } from "@remix-run/router";
interface FormValues extends FieldValues {
    id: number;
    jrPositionTitle: string;
    jrPosDescription: string;
    [key: string]: number | string; // Add an index signature that allows string keys with number or string values
}


export const NewJobForContact1: React.FC<IdProp> = ({ id: contactId }) => {
    const [AddJob, { isLoading: isLoadingAddJob, isError, error }] = useAddJobForContactMutation()
    const { register, handleSubmit, reset, control, setValue, setError, formState: { errors, isValid, isLoading, isSubmitSuccessful, isDirty, isSubmitting, isValidating }, trigger } = useForm<FormValues>({ mode: "all" })
    const defaultValues: FormValues = {
        id: contactId,
        jrPositionTitle: "",
        jrPosDescription: "",
    };

    // Reset the form with default values after registration
   // React.useEffect(() => {
    //    reset(defaultValues);
    //}, [reset]);
    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        console.log(`Title: ${values.jrPositionTitle}, Description: ${values.jrPosDescription}`);
        //const canSave = [values.jrPosDescription, values.jrPositionTitle, values.id].every(Boolean) && !isLoading
        //if (canSave) {
            try {
                //let  reqData:ReqData  = {}        
                await AddJob({ cntId: contactId, reqData: { jrPositionTitle: values.jrPositionTitle, jrPosDescription: values.jrPosDescription, jrId: values.id } }).unwrap()
                reset(values);
            } catch (err) {
                console.error('Failed to save the post: ', err)
                const MyFetchBaseQueryError = err as FetchBaseQueryError;
                setError('submit', {
                    type: 'manual',
                    message: 'Submission failed. ('+MyFetchBaseQueryError.status+') Please try again.',
                });
            }
        //};
       
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <FormControl sx={{ width: '90%', mt: 1 }}>
                    <FormGroup sx={{ gap: '10px' }}>
                        <Controller
                            name={"Title"}
                            control={control}
                            render={({ field, fieldState: { error }, formState, }) => (
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
                                    disabled={isLoading}
                                />)}
                            defaultValue=""
                            rules={{ required: "Title is required" }}
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
                                    disabled={isLoading}
                                    {...field}
                                />
                            )}
                            defaultValue=""
                            rules={{ required: "Description is required", minLength: { value: 3, message: "Min of 3 char required" } }} />
                        <Button onClick={handleSubmit(onSubmit)} variant={"contained"} disabled={!isDirty || !isValid || isValidating || isSubmitting}>
                            Submit {errors.submit && errors.submit.message}
                        </Button>
                        <p>Is the form dirty? {isDirty ? 'Yes' : 'No'}</p>
                        {/* Display form-level error message */}
                        {errors.submit && <p>{errors.submit.message}</p>}
                        <Button onClick={() => reset()} variant={"outlined"} disabled={isSubmitting}>
                            Reset
                        </Button>
                    </FormGroup>
                </FormControl>
            </Box>
        </form>
    )
}