import { useAppSelector } from '../../app/hooks'
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, Tooltip, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDeleteContactReqMutation, useGetLovQuery, useUpdateContactReqMutation } from "../api/ClearConnectApiSlice";
import React, { ReactNode, useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
//import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isJsxElement } from 'typescript';
import { ConsultantReqInterestDTO, JobReqConsultantDTO, LovDTO, ReqData } from './ReqInterfaces';
import { jobStatuses } from './JobStatusFilter';
import ZoomIn from '@mui/icons-material/ZoomIn';
import { JobEdit } from './PastJobRHF';

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
  jobReqConsultantDTO: JobReqConsultantDTO;
  zoom: (id: string, zoomInOut: number) => void;
  zoomedIn: boolean
}

const handleNavigateAway = (event: BeforeUnloadEvent) => {
  console.log('Triggered BeforeUnloadEvent')
  const message = 'Sure you want to leave?';
  event.preventDefault()
  event.returnValue = true
};
const ReqCard: React.FC<ReqCardProps> = ({ jobReqConsultantDTO, zoom, zoomedIn }) => {
  const theme = useTheme();
  const {
    data: dataLov,
    //isLoading,
    isSuccess: isSuccessLov,
    isError,
    error,
    //refetch
  } = useGetLovQuery()
  const statusRectInit: () => ConsultantReqInterestDTO = () => jobStatuses(dataLov as LovDTO).find((jrcn: any) => {
    return jrcn.cnsintId === jobReqConsultantDTO.consultantReqInterestDTO?.cnsintId
  }) as ConsultantReqInterestDTO
  const [status, setStatus] = React.useState<ConsultantReqInterestDTO | null>(null)
  const [isEdit, setIsEdit] = React.useState<boolean>(false)
  const navigate = useNavigate();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/JobContacts/${event.currentTarget.name}`); // Replace '/your-route' with the actual route you want to navigate to
  };
  const [updateReq, { isLoading: isUpdating, isError: isUpdateError, isSuccess: isUpdateSuccess, error: errorUpdate }] = useUpdateContactReqMutation()
  const [deleteReq, { isLoading: isDeleting, isError: isDeleteError, isSuccess: isDeleteSuccess, error: errorDelete }] = useDeleteContactReqMutation()
  const userIdFromAuth0Metadata: number = useAppSelector(state => {
    if (state.tokens.auth0UserMetaData === undefined)
      return 0
    //const { cnt_contact_id } = state.tokens.auth0UserMetaData
    return state.tokens.auth0UserMetaData.cnt_contact_id
  })
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    deleteReq({ cntId: userIdFromAuth0Metadata, jrId: jobReqConsultantDTO.id ? jobReqConsultantDTO.id : jobReqConsultantDTO.jrId.toString() })
  }
  const idString: string = jobReqConsultantDTO.id ?? jobReqConsultantDTO.jrId.toString()
  const title: string = jobReqConsultantDTO.jrPositionTitle
  const jrPosDescription = jobReqConsultantDTO.jrPosDescription

  const handleChange: (event: SelectChangeEvent<ConsultantReqInterestDTO>, child?: ReactNode) => any = (event: SelectChangeEvent<typeof status>) => {
    const {
      target: { value },
    } = event;
    const newStatus = value as ConsultantReqInterestDTO
    const jobReqConsultantDTOUpdated: JobReqConsultantDTO = { ...jobReqConsultantDTO }
    jobReqConsultantDTOUpdated.consultantReqInterestDTO = { ...newStatus }
    updateReq({ cntId: userIdFromAuth0Metadata, jobReqConsultantDTO: jobReqConsultantDTOUpdated/*{ jrId: 0, jobReqConsultant: null }*/ })//: { JobReqConsultant: { jrcnStatus: newStatus.id } } })
    setStatus(newStatus);

    if (statusRectInit().cnsintId !== newStatus?.cnsintId) {
      window.addEventListener('beforeunload', handleNavigateAway);
      console.log('Added BeforeUnloadEvent')
    }
    else {
      window.removeEventListener('beforeunload', handleNavigateAway);
      console.log('Removed BeforeUnloadEvent')
    }
  };

  const handleEditSave: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, child?: ReactNode) => any = (event) => {
    const {
      target: { value },
    } = event;
    const newContent = value
    const jobReqConsultantDTOUpdated = { jrPosDescription: value, id: jobReqConsultantDTO.id, jrId: jobReqConsultantDTO.jrId }
    //jobReqConsultantDTOUpdated.consultantReqInterestDTO = null;
    updateReq({ cntId: userIdFromAuth0Metadata, jobReqConsultantDTO: jobReqConsultantDTOUpdated/*{ jrId: 0, jobReqConsultant: null }*/ })//: { JobReqConsultant: { jrcnStatus: newStatus.id } } })
    setIsEdit(false);
    /*
        if (statusRectInit().cnsintId !== newStatus?.cnsintId) {
          window.addEventListener('beforeunload', handleNavigateAway);
          console.log('Added BeforeUnloadEvent')
        }
        else {
          window.removeEventListener('beforeunload', handleNavigateAway);
          console.log('Removed BeforeUnloadEvent')
        }
    */
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

  function getStyles(name: string, names: readonly string[], theme: Theme) {
    return {
      fontWeight:
        names.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const updateInProgress: () => JSX.Element = () => <>{(isUpdating) && <CircularProgress sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',

  }} color="inherit" />} </>
  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent>
        {isError && (<Alert severity="error"> <AlertTitle>{(error as FetchBaseQueryError).status.toString()}</AlertTitle></Alert>)}
        {isUpdateError && (<Alert severity="error"> <AlertTitle>{(errorUpdate as FetchBaseQueryError).status.toString()}</AlertTitle></Alert>)}
        {isDeleteError && (<Alert severity="error"> <AlertTitle>{(errorDelete as FetchBaseQueryError).status.toString()}</AlertTitle></Alert>)}
        {isSuccessLov && (
          <FormControl sx={{ m: 1, width: "100%" }}>
            {updateInProgress()}
            <InputLabel id="job-status-label">My status</InputLabel>
            <Select autoWidth sx={{ width: '100%' }}
              labelId="demo-multiple-chip-label"
              id="Consultant-Interest"
              value={status ? status : statusRectInit()}
              onChange={handleChange}
              input={<OutlinedInput sx={{ height: "10%" }} id="job-status" label="My status" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <Chip label={selected.cnsintDescription} />
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {jobStatuses(dataLov as LovDTO)?.map((cri) => (
                <MenuItem
                  key={cri.cnsintId}
                  value={cri as any}
                  style={getStyles(cri.cnsintDescription, [status?.cnsintDescription ?? ""], theme)}
                >
                  {cri.cnsintDescription}
                </MenuItem>
              ))}
            </Select>
          </FormControl>)}
        {!isEdit ?
          <>
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
          </> :
         <JobEdit id={userIdFromAuth0Metadata} />
        }
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <Button sx={{}} size="small" disabled={isDeleting} name={"kuku"} onClick={handleButtonClick}>Contacts</Button>
          <IconButton sx={{}} aria-label="delete" onClick={() => zoom(zoomedIn ? "" : idString, zoomedIn ? 0 : 12)} disabled={isDeleting} >
            {zoomedIn ? <ZoomOutIcon /> : <ZoomInIcon />}
          </IconButton>
          {!isEdit ?
            <IconButton sx={{}} aria-label="delete" disabled={isDeleting} onClick={() => setIsEdit(!isEdit)}>
              <EditIcon color="primary" />
            </IconButton> :
            <>
              <Box>
                <IconButton sx={{}} aria-label="delete" disabled={isDeleting} onClick={() => setIsEdit(!isEdit)}>
                  <SaveIcon color="primary" />
                </IconButton>
                <IconButton sx={{}} aria-label="delete" disabled={isDeleting} onClick={() => setIsEdit(!isEdit)}>
                  <CancelIcon color="primary" />
                </IconButton>
              </Box>
            </>
          }

          <IconButton sx={{}} aria-label="delete" disabled={isDeleting} onClick={handleDelete}>
            <DeleteIcon color="primary" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
export default ReqCard;