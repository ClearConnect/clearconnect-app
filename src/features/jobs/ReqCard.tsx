import { Box, Button, Card, CardActions, CardContent, Tooltip, Typography } from "@mui/material";
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

  //export default function ReqCard(ReqCardData: any) {
  const title: string = ReqCardData.jrPositionTitle
  const kuku = ReqCardData.jrId
  const jrPosDescription = ReqCardData.jrPosDescription
  return (
    <Card >
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default ReqCard;