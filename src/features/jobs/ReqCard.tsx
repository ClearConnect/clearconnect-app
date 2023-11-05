import { useAppSelector } from '../../app/hooks'
import { Box, Button, Card, CardActions, CardContent, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, Tooltip, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteReqMutation } from "../api/ClearConnectApiSlice";
import React from 'react';
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

  //status
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
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
  const names = [
    'Leo Kogan',
    'Eva Kogan',
    'Lucy Kogan'
  ];
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="job-status-label">Status</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
           
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="job-status" label="Job Status" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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