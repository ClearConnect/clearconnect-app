import React from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



export interface ContactCardProps {
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


const ContactCard: React.FC<ContactCardProps> = ({ name, title, email, phone, avatar, address, social }) => {
    const handleEmailClick = () => {
        window.location.href = `mailto:${email}`;
      };
      const handleDialClick = () => {
        window.location.href = `tel:${phone}`;
      };
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <Avatar alt={name} src={avatar} sx={{ marginRight: 2 }} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="body1">
          <EmailIcon /> <a href={`mailto:${email}`} onClick={handleEmailClick}>{email}</a>
        </Typography>
        <Typography variant="body1">
          <PhoneIcon /> {phone} <button onClick={handleDialClick}>Dial</button>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <LocationOnIcon /> {address}
        </Typography>
        <Box sx={{ marginLeft: 'auto', '& > *': { marginRight: 1 } }}>
          {social.facebook && (
            <IconButton aria-label="Facebook" color="primary" href={social.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </IconButton>
          )}
          {social.twitter && (
            <IconButton aria-label="Twitter" color="primary" href={social.twitter} target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </IconButton>
          )}
          {social.linkedin && (
            <IconButton aria-label="LinkedIn" color="primary" href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
