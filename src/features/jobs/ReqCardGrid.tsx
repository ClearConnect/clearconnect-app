import React from 'react';
import { Box,   /* CardMedia, */ Grid,  Typography } from '@mui/material';
//import MyCardImage from '../../logo.svg';
import ReqCard from './ReqCard';
import { useGetJobsForContactQuery, IdProp } from '../api/ClearConnectApiSlice'
import { ProgressBar } from '../../theme/Theme';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { JobStatusFilter } from './JobStatusFilter';
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
  } = useGetJobsForContactQuery(cntId.id)
  const [zoom, setZoom] = React.useState<{ id: string, zoomInOut:number}>({id:"", zoomInOut:0})//data?.consultantReqInterests?.find( (id:any)=>  ReqCardData?.jobReqConsultant?.jrcnStatus )?.cnsintDescription])
  const ZoomInOut: ( id: string, zoomBy: number) => void = (id, zoomBy) => {
    //const  newZoom: number[] = zoom.map( z => z + zoomBy)
    //setZoom( zoom.map( z => z + zoomBy))
    setZoom( {id,  zoomInOut: zoomBy})
  }
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
      const key:string = req.id? req.id:req['jrId'].toString()
      const zoomedKey =  zoom.id === key
      return (<Grid item key={key} xs={12} sm={zoomedKey?12:6} md={zoomedKey?12:4} lg={zoomedKey?12:3} xl={zoomedKey?12:2}>
        <ReqCard zoomedIn={zoomedKey} zoom={ZoomInOut} jobReqConsultantDTO={req} />
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
        <JobStatusFilter />
        {isSuccess && <Grid container spacing={2}>
          {gridItems}
        </Grid>
        }
      </>
    )
  )
}

