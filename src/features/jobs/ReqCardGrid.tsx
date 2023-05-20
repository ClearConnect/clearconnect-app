import React from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import MyCardImage from '../../logo.svg';
import ReqCard from './ReqCard';
import { useGetJobsForContactQuery } from '../api/apiSlice'
import { ProgressBar } from '../../theme/Theme';
import {  FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

 export interface ReqCardGridProps {
  cntId: number;
  //AvatarClickFunction: () => void;
} 

const ReqCardGrid: React.FC<ReqCardGridProps> = (cntId) => {
  const {
    data: Reqs,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetJobsForContactQuery(cntId.cntId)

  //const Result =  useGetJobsForContactQuery(2037)
  let boxContent : React.ReactElement | null = null
  let gridItems = null
  if (isLoading) {
    boxContent =  <ProgressBar message='Getting Jobs for you...' />
  } else if (isSuccess) {
   
    gridItems = Reqs.map ( req =>  { 
      const c = req['jrId']
      return (<Grid item key={req['jrId']} xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <ReqCard  ReqCardData={req} />
                                  </Grid>)
                                  })
  } else if (isError) {
    const MyFetchBaseQueryError  = error as FetchBaseQueryError;  
    boxContent =  <ProgressBar message= {`Sorry, error ${MyFetchBaseQueryError.status.toString()} has occured.`}  />
    //boxContent = <>Sorry, an error occured: {MyFetchBaseQueryError.status} {MyFetchBaseQueryError.data}</>
  }
  
  return (    
    ( boxContent? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <Typography variant="h4" component="h1">
      {boxContent}
    </Typography>
  </Box> :
    <Grid container spacing={1}>
      {gridItems}
    </Grid>
    )
  )
}

export default ReqCardGrid;
