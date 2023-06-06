import { Box, Button, Card, CardActions, CardContent, Tooltip, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
/* import { Document, Page } from 'react-pdf';

function MyComponent({ pdfBlob }) {
  return (
    <Document file={pdfBlob}>
      <Page pageNumber={1} />
    </Document>
  );
} */

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
//be{bull}nev{bull}o{bull}lent
export interface ReqCardData {
  //imageUrl: string;
  title: string;
  description: string;
  jobSkillSetsDTO:
  [{
    jssOrder: number,
    jssSkillType: 'A' | 'B',
    skShortName: string,
  }]
}

export interface ReqCardProps {
  ReqCardData: any;
  //AvatarClickFunction: () => void;
}

const ReqCard: React.FC<ReqCardProps> = ({ ReqCardData }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/your-route'); // Replace '/your-route' with the actual route you want to navigate to
  };
  //export default function ReqCard(ReqCardData: any) {
  const title: string = ReqCardData.jrPositionTitle
  const kuku = ReqCardData.jrId
  const jrPosDescription = ReqCardData.jrPosDescription
  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent>
      <Tooltip title= {title} arrow>
        <Typography variant="h5" component="div" noWrap>
          {title}
        </Typography>
        </Tooltip>
        <Box sx={{ height: 300, overflowY: 'auto' }}>
          <Typography variant="body2">
            {jrPosDescription}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Contacts</Button>
      </CardActions>
    </Card>
  );
}

export default ReqCard;