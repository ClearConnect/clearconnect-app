import { useAppSelector } from '../../app/hooks'
import { Box, Button, Card, CardActions, CardContent, Tooltip, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteReqMutation } from "../api/ClearConnectApiSlice";
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
  //DeleteReq: () => void;
}

const ReqCard: React.FC<ReqCardProps> = ({ ReqCardData }) => {
  const navigate = useNavigate();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const kuku = `/JobContacts/${event.currentTarget.name}`
    navigate(`/JobContacts/${event.currentTarget.name}`); // Replace '/your-route' with the actual route you want to navigate to
  };

  const [deleteReq, { isLoading: idDeleting }] = useDeleteReqMutation()
  const userIdFromAuth0Metadata: number = useAppSelector(state => {
    if (state.tokens.auth0UserMetaData === undefined)
      return 0
    //const { cnt_contact_id } = state.tokens.auth0UserMetaData
    return state.tokens.auth0UserMetaData.cnt_contact_id
  })
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {   
    deleteReq({ cntId: userIdFromAuth0Metadata, jrId: ReqCardData.jrId })
  }
  //export default function ReqCard(ReqCardData: any) {
  const title: string = ReqCardData.jrPositionTitle
  const kuku = ReqCardData.jrId
  const jrPosDescription = ReqCardData.jrPosDescription
  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent>
        <Tooltip title={title} arrow>
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
        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <Button sx={{}} size="small" disabled={idDeleting} name={ReqCardData.jrId} onClick={handleButtonClick}>Contacts</Button>
          <IconButton sx={{}} aria-label="delete" disabled={idDeleting} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ReqCard;