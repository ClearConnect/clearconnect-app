import { useAppSelector } from '../../app/hooks'
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, Tooltip, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteReqMutation, useGetLovQuery } from "../api/ClearConnectApiSlice";
import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
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
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    //refetch
  } = useGetLovQuery()
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //const kuku = `/JobContacts/${event.currentTarget.name}`
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
  //const kuku = ReqCardData.jrId
  const jrPosDescription = ReqCardData.jrPosDescription

  //status
  const theme = useTheme();
  const [statuses, setStatuses] = React.useState<string[]>([data?.consultantReqInterests?.find( (id:any)=>  ReqCardData.jrId )?.cnsintDescription])
  
  const handleChange: (event: SelectChangeEvent<typeof statuses>) => any = (event: SelectChangeEvent<typeof statuses>) => {
    const {
      target: { value },
    } = event;
    setStatuses(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  /* const names = [
    'Leo Kogan',
    'Eva Kogan',
    'Lucy Kogan'
  ]; */
  function getStyles(name: string, names: readonly string[], theme: Theme) {
    return {
      fontWeight:
        names.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  
  const kuku: any[] = data?.consultantReqInterests
  //let kuku =  kuk.map( (d)=> d)
  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent>
        {isError && (
          <Alert severity="error">
            <AlertTitle>{(error as FetchBaseQueryError).status.toString()}</AlertTitle>
          </Alert>
        )}        
        { isSuccess && (<FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="job-status-label">My status</InputLabel>
          <Select autoWidth
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"

            value={statuses}//{data.consultantReqInterests.map((cri: any) => cri.cnsintDescription)}
            onChange={handleChange}
            input={<OutlinedInput sx={{height: "10%"}} id="job-status" label="My status" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>                
                  <Chip label={selected} />                
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {kuku?.map((cri: any) => (
              <MenuItem
                key={cri.cnsintId}
                value={cri.cnsintDescription}
                style={getStyles(cri.desc, statuses, theme)}
              >
                {cri.cnsintDescription}
              </MenuItem>
            ))}
          </Select>
        </FormControl>)}

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