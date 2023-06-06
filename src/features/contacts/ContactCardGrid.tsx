import React from 'react';
import { Grid } from '@mui/material';
import ContactCard from './ContactCard';

interface Contact {
  name: string;
  title: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const contacts: Contact[] = [
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

export interface ContactCardGridProps {
    JrId: number;
    //AvatarClickFunction: () => void;
  } 
const ContactCardGrid: React.FC<ContactCardGridProps> = ({JrId}) => {
  return (
    <Grid container spacing={2}>
      {contacts.map((contact, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ContactCard {...contact} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ContactCardGrid;
