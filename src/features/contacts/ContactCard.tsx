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
/* {social.facebook && (
  <IconButton aria-label="Facebook" color="primary" href={social.facebook} target="_blank" rel="noopener noreferrer">
    <FacebookIcon />
  </IconButton>
)}
{social.twitter && (
  <IconButton aria-label="Twitter" color="primary" href={social.twitter} target="_blank" rel="noopener noreferrer">
    <TwitterIcon />
  </IconButton>
)} */
//sx={{ display: 'flex', alignItems: 'center', padding: 2 }}
const ContactCard: React.FC<any> = (contactData) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${contactData.cntEmail}`;
  };
  const handleDialClick = () => {
    window.location.href = `tel:${contactData.cntPhone}`;
  };
  return (
    <Card sx={{ borderRadius: 5 }} >
      <CardContent>
        <Avatar alt={`${contactData.cntFirstName} ${contactData.cntLastName}`} src={'path/to/avatar1.jpg'} sx={{ marginRight: 2 }} />
        <Typography variant="h6">{`${contactData.cntFirstName} ${contactData.cntLastName}`}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {contactData.cntTitle}
        </Typography>
        <Typography variant="body1">
          <EmailIcon /> <a href={`mailto:${contactData.cntEmail}`} onClick={handleEmailClick}>{contactData.cntEmail}</a>
        </Typography>
        <Typography variant="body1">
          {contactData.cntMobilPhone && (<><PhoneIcon />{contactData.cntMobilePhone} <button onClick={handleDialClick}>Dial</button></>)}
        </Typography>
        <Typography variant="body1">
          {contactData.cntPhone && (<><PhoneIcon /> {contactData.cntPhone} <button onClick={handleDialClick}>Dial</button></>)}
        </Typography>
        <Typography variant="body1">
          {contactData.cntHomePhone && (<><PhoneIcon /> {contactData.cntHomePhone} <button onClick={handleDialClick}>Dial</button></>)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <LocationOnIcon /> {`${contactData.cntHomeAddress}, ${contactData.cntHomeCity}, ${contactData.cntHomeState} ${contactData.cntHomeZip}`}
        </Typography>
        <Box sx={{ marginLeft: 'auto', '& > *': { marginRight: 1 } }}>

          {contactData.cntLinkedin && (
            <IconButton aria-label="LinkedIn" color="primary" href={contactData.cntLinkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
