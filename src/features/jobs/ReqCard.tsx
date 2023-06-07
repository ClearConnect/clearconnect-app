import { Box, Button, Card, CardActions, CardContent, Tooltip, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

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

  const handleButtonClick = ( event: React.MouseEvent<HTMLButtonElement>) => {
    const kuku = `/JobContacts/${event.currentTarget.name}`
    navigate(`/JobContacts/${event.currentTarget.name}`); // Replace '/your-route' with the actual route you want to navigate to
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
        <Button size="medium" name={ReqCardData.jrId} onClick={handleButtonClick}>Contacts</Button>
      </CardActions>
    </Card>
  );
}

export default ReqCard;