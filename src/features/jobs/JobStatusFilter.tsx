import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
//import Stack from '@mui/material/Stack';
import { useGetLovQuery } from '../api/ClearConnectApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
//import { Box } from '@mui/material';

export const JobStatusFilter: React.FC = () => {
    const {
        data: lov,
        //isLoading: isLoadingLov,
        isSuccess: isSuccessLov,
        isError: isErrorLov,
        error: errorLov
        //refetch
    } = useGetLovQuery()
    interface ChipData {
        id: number;
        label: string;
    }
    const jobStatuses: ChipData[] = lov?.consultantReqInterests?.map((cri: any) => { return { id: cri.cnsintId, label: cri.cnsintDescription } })
    return (<>
    { isErrorLov && (errorLov as FetchBaseQueryError).data}
        {isSuccessLov && <Autocomplete sx={{ mr: 5 }}
            multiple
            id="tags-outlined"
            options={jobStatuses}
            getOptionLabel={(option) => option.label}
            defaultValue={[jobStatuses[13]]}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Job Status"
                />
            )}
            renderOption={(props: object, option: ChipData,{selected}) =>
            (
                <li {...props}>
                    <Chip  label = {option.label} />
                </li>
            )}
        />}
    </>)
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
