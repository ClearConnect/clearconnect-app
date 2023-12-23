import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ContactCard from './ContactCard';
//import { ContactCardProps } from './ContactCard';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { useGetContactsForJobQuery, IdProp } from '../api/ClearConnectApiSlice'
import { ProgressBar } from '../../theme/Theme';
import { ExpandableBox } from '../../app/transitions'


/* export interface IdProp {
    Id: number;
    //AvatarClickFunction: () => void;
  }  */
const ContactCardGrid: React.FC<IdProp> = ( Contact ) => {

  const {
    data: contacts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetContactsForJobQuery(Contact.id)

  let boxContent : React.ReactElement | null = null
  let gridItems = null
  if (isLoading) {
    boxContent =  <ProgressBar message='Getting Jobs Contacts...' />
  } else if (isSuccess) {   
    if( contacts === null){
     return( <ExpandableBox />)
    } else {gridItems = contacts.map ( (contact, index) =>  { 
      //const c = req['jrId']
      return (<Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <ContactCard  {...contact} />
                                  </Grid>)
                                  })
                                }
  } else if (isError) {
    const MyFetchBaseQueryError  = error as FetchBaseQueryError;  
    boxContent =  <ProgressBar message= {`Sorry, error ${MyFetchBaseQueryError.status.toString()} has occured.`}  />
    //boxContent = <>Sorry, an error occured: {MyFetchBaseQueryError.status} {MyFetchBaseQueryError.data}</>
  }

  /*  return (
    <Grid container spacing={2}>
      {contacts.map((contact, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ContactCard {...contact} />
        </Grid>
      ))}
    </Grid>
  );  */

  return (    
    ( boxContent? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <Typography variant="h4" component="h1">
      {boxContent}
    </Typography>
  </Box> :
    <Grid container spacing={2}>
      {gridItems}
    </Grid>
    )
  )

};

export default ContactCardGrid;
