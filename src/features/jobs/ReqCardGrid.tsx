import React from 'react';
import { Box, FormControlLabel, FormGroup,  /* CardMedia, */ Grid, Switch, Typography } from '@mui/material';
//import MyCardImage from '../../logo.svg';
import ReqCard from './ReqCard';
import { useGetJobsForContactQuery, IdProp, useGetLovQuery } from '../api/ClearConnectApiSlice'
import { ProgressBar } from '../../theme/Theme';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/system';
//import { ExpandableBox } from '../../app/transitions';

/*  export interface IdProp {
  Id: number;
  //AvatarClickFunction: () => void;
}  */

export const ReqCardGrid: React.FC<IdProp> = (cntId) => {
  const {
    data: Reqs,
    isLoading,
    isSuccess,
    isError,
    error,
    //refetch
  } = useGetJobsForContactQuery(cntId.Id)
  const {
    data: consultantReqInterests,
    isLoading: isLoadingChip,
    isSuccess: isSuccessChip,
    isError: isErrorChip,
    error: errorChip,
    //refetch
  } = useGetLovQuery()
  const {
    isLoading: isLoadingLov,
    isSuccess: isSuccessLov,
    isError: isErrorLov,
    error: errorLov
    //refetch
  } = useGetLovQuery()
  interface ChipData {
    key: number;
    label: string;
  }
  
  const [chipData, setChipData] = React.useState<readonly ChipData[]>(
    consultantReqInterests.map( (cri: any) => { return {key: cri.id, label: cri.cnsintDescription}})
  );

  const handleDelete = (chipToDelete: ChipData ) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  //const Result =  useGetJobsForContactQuery(2037)
  let boxContent: React.ReactElement | null = null
  let gridItems = null
  if (isLoading /* || isLoadingLov */) {
    boxContent = <ProgressBar message='Getting Jobs for you...' />
  }
  else if (isError /* || isErrorLov */) {
    const MyFetchBaseQueryError = error as FetchBaseQueryError;
    boxContent = <ProgressBar message={`Sorry, ${MyFetchBaseQueryError.status.toString()} has occured in ReqCardGrid.`} />
    //boxContent = <>Sorry, an error occured: {MyFetchBaseQueryError.status} {MyFetchBaseQueryError.data}</>
  } else if (isSuccess /* && isSuccessLov */) {
    gridItems = Reqs?.map(req => {
      //const c = req['jrId']
      return (<Grid item key={req['jrId']} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ReqCard ReqCardData={req} />
      </Grid>)
    })
  } else { boxContent = <div> ????????????????</div> }
  return (
    (boxContent ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1">
        {boxContent}
      </Typography>
    </Box> :
      <>

        <Stack direction={"row"} spacing={1}>
           {chipData.map( (kuku: ChipData) => <Chip
              //icon={icon}
              label={kuku.label}
              onDelete={ handleDelete(kuku)}
            />)}
          </Stack>

        <Grid container spacing={2}>
          {gridItems}
        </Grid>
      </>
    )
  )
}

