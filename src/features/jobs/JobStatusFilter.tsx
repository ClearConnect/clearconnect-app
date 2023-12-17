import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
//import Stack from '@mui/material/Stack';
import { useGetLovQuery } from '../api/ClearConnectApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ConsultantReqInterestDTO, LovDTO } from './ReqInterfaces';
//import { Box } from '@mui/material';
export const jobStatuses: (lovDTO:LovDTO)=>ConsultantReqInterestDTO[] = (lovDTO)=> (lovDTO as LovDTO).consultantReqInterests as ConsultantReqInterestDTO[]
export const JobStatusFilter: React.FC = () => {
    const {
        data: lovDTO,
        //isLoading: isLoadingLov,
        isSuccess: isSuccessLov,
        isError: isErrorLov,
        error: errorLov
        //refetch
    } = useGetLovQuery()
    /*interface ChipData {
        id: number;
        label: string;
    }*/
    //const jobStatuses: ChipData[] = lov?.consultantReqInterests?.map((cri: any) => { return { id: cri.cnsintId, label: cri.cnsintDescription } })
    
    return (<>
    { isErrorLov && (errorLov as FetchBaseQueryError).data}
        {isSuccessLov && <Autocomplete sx={{ mr: 5 }}
            multiple
            id="tags-outlined"
            options= {jobStatuses(lovDTO)}
            getOptionLabel={(option) => option?.cnsintDescription}//   ..label}
            defaultValue={[jobStatuses(lovDTO)[36]]}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Job Status"
                />
            )}
            renderOption={(props: object, option: ConsultantReqInterestDTO,{selected}) =>
            (
                <li {...props}>
                    <Chip  label = {option.cnsintDescription} />
                </li>
            )}
        />}
    </>)
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
