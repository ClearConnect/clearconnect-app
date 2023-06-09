import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ContactCard from './ContactCard';
import { ContactCardProps } from './ContactCard';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { useGetContactsForJobQuery, IdProp } from '../api/apiSlice'
import { ProgressBar } from '../../theme/Theme';


const contacts: ContactCardProps[] = [
  {
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'johndoe@example.com',
    phone: '+1 123-456-7890',
    avatar: 'path/to/avatar1.jpg',
    address: '123 Main St, City, State',
    social: {
      facebook: 'https://www.facebook.com/johndoe',
      twitter: 'https://www.twitter.com/johndoe',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
  },
  {
    name: 'Jane Smith',
    title: 'Product Manager',
    email: 'janesmith@example.com',
    phone: '+1 987-654-3210',
    avatar: 'path/to/avatar2.jpg',
    address: '456 Elm St, City, State',
    social: {
      facebook: 'https://www.facebook.com/janesmith',
      twitter: 'https://www.twitter.com/janesmith',
      linkedin: 'https://www.linkedin.com/in/janesmith',
    },
  },
  // Add more contact objects as needed
];

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
  } = useGetContactsForJobQuery(Contact.Id)

  let boxContent : React.ReactElement | null = null
  let gridItems = null
  if (isLoading) {
    boxContent =  <ProgressBar message='Getting Jobs Contacts...' />
  } else if (isSuccess) {   
    gridItems = contacts.map ( (contact, index) =>  { 
      //const c = req['jrId']
      return (<Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <ContactCard  {...contact} />
                                  </Grid>)
                                  })
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
