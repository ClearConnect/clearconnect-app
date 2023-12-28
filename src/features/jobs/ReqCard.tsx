import { useAppSelector } from '../../app/hooks'
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Chip, CircularProgress, FormControl, FormGroup, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, Tooltip, Typography, useTheme } from "@mui/material";
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
import { ConsultantReqInterestDTO, JobReqConsultantDTO, JobReqConsultantDTOUpdate, LovDTO, ReqData } from './ReqInterfaces';
import { jobStatuses } from './JobStatusFilter';
import ZoomIn from '@mui/icons-material/ZoomIn';
import { Controller, FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { FormValues, JobEdit, JobEditRHFControllers } from './PastJobRHF';

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

  const handleInterestChange: (event: SelectChangeEvent<ConsultantReqInterestDTO>, child?: ReactNode) => any = (event: SelectChangeEvent<typeof status>) => {
    const {
      target: { value },
    } = event;
    const newStatus = value as ConsultantReqInterestDTO
    const jobReqConsultantDTOUpdated: JobReqConsultantDTOUpdate = { consultantReqInterestDTO: newStatus, id: jobReqConsultantDTO.id, jrId: jobReqConsultantDTO.jrId }
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

  const useFormRet: UseFormReturn<FormValues, any, undefined> = useForm<FormValues>({ mode: "all" })
  const { register, handleSubmit, reset, control, setValue, setError, formState: { dirtyFields, errors, isValid, isLoading, isSubmitSuccessful, isDirty, isSubmitting, isValidating }, trigger } = useFormRet
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(`Title: ${values.jrPositionTitle}, Description: ${values.jrPosDescription}`);
    //const canSave = [values.jrPosDescription, values.jrPositionTitle, values.id].every(Boolean) && !isLoading
    //if (canSave) {
    try {
      //let  reqData:ReqData  = {}        
      //await AddJob({ cntId: contactId, reqData: { jrPositionTitle: values.jrPositionTitle, jrPosDescription: values.jrPosDescription, jrId: values.id } }).unwrap()
      var jobReqConsultantDTOUpdated: JobReqConsultantDTOUpdate = { id: jobReqConsultantDTO.id, jrId: jobReqConsultantDTO.jrId }
      if (dirtyFields.jrPositionTitle)
        jobReqConsultantDTOUpdated = { ...jobReqConsultantDTOUpdated, jrPositionTitle: values.jrPositionTitle }
      if (dirtyFields.jrPosDescription)
        jobReqConsultantDTOUpdated = { ...jobReqConsultantDTOUpdated, jrPosDescription: values.jrPosDescription }
      await updateReq({ cntId: userIdFromAuth0Metadata, jobReqConsultantDTO: jobReqConsultantDTOUpdated/*{ jrId: 0, jobReqConsultant: null }*/ })//: { JobReqConsultant: { jrcnStatus: newStatus.id } } })
      reset(values);
    } catch (err) {
      console.error('Failed to save the post: ', err)
      const MyFetchBaseQueryError = err as FetchBaseQueryError;
      setError('submit', {
        type: 'manual',
        message: 'Req Update failed. (' + MyFetchBaseQueryError.status + ') Please try again.',
      });
    }
    //};

  }


  return (


    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ borderRadius: 5 }}>
        <CardContent>
          {isError && (<Alert severity="error"> <AlertTitle>{(error as FetchBaseQueryError).status.toString()}</AlertTitle></Alert>)}
          {isUpdateError && (<Alert severity="error"> <AlertTitle>{(errorUpdate as FetchBaseQueryError).status.toString()}</AlertTitle></Alert>)}
          {isDeleteError && (<Alert severity="error"> <AlertTitle>{(errorDelete as FetchBaseQueryError).status.toString()}</AlertTitle></Alert>)}
          {isSuccessLov && (
            <FormControl sx={{ width: "100%" }}>
              {updateInProgress()}
              <InputLabel id="job-status-label">My status</InputLabel>
              <Select autoWidth sx={{ width: '100%' }}
                labelId="demo-multiple-chip-label"
                id="Consultant-Interest"
                value={status ? status : statusRectInit()}
                onChange={handleInterestChange}
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
            <FormControl sx={{ width: "100%", mt: 1 }}>
              <FormGroup sx={{ gap: '5px' }}>
                <JobEditRHFControllers useFormRet={useFormRet} fvDefualts={{ id: userIdFromAuth0Metadata, jrPosDescription: jrPosDescription, jrPositionTitle: title }} />
              </FormGroup>
            </FormControl>

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
                  <IconButton sx={{}} aria-label="delete" disabled={isDeleting || !isDirty || !isValid || isValidating || isSubmitting} onClick={handleSubmit(onSubmit)} >
                    <SaveIcon color="primary" />
                  </IconButton>
                  <IconButton sx={{}} aria-label="delete" disabled={isDeleting} onClick={() => setIsEdit(!isEdit)}>
                    <CancelIcon color="primary" />
                  </IconButton>
                </Box>
              </>
            }
            <IconButton sx={{}} aria-label="delete" disabled={isDeleting || isUpdating} onClick={handleDelete}>
              <DeleteIcon color="primary" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </form>
  );
}
export default ReqCard;