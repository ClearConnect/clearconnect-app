import { useAppSelector } from '../../app/hooks'
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, Tooltip, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteContactReqMutation, useGetLovQuery, useUpdateContactReqMutation } from "../api/ClearConnectApiSlice";
import React, { ReactNode, useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
//import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isJsxElement } from 'typescript';
import { ConsultantReqInterestDTO, JobReqConsultantDTO, LovDTO, ReqData } from './ReqInterfaces';
import { jobStatuses } from './JobStatusFilter';

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
  //DeleteReq: () => void;
}
//interface ConsultantInterestIdDesc { id: number, desc: string }
//const GetStatusIdDes: (statusRec: any) => ConsultantInterestIdDesc = (statusRec) => {
//  const ret: ConsultantInterestIdDesc = { id: statusRec?.cnsintId, desc: statusRec?.cnsintDescription }
//  return ret
//}
const handleNavigateAway = (event: BeforeUnloadEvent) => {
  console.log('Triggered BeforeUnloadEvent')
  const message = 'Sure you want to leave?';
  event.preventDefault()
  event.returnValue = true
};
const ReqCard: React.FC<ReqCardProps> = ({ jobReqConsultantDTO }) => {
  const theme = useTheme();
  const {
    data: dataLov,
    //isLoading,
    isSuccess: isSuccessLov,
    isError,
    error,
    //refetch
  } = useGetLovQuery()
  //const consultantReqInterests: any[] = data?.consultantReqInterests
  const statusRectInit :() => ConsultantReqInterestDTO = () => jobStatuses(dataLov as LovDTO).find((jrcn: any) => {
   return jrcn.cnsintId === jobReqConsultantDTO.consultantReqInterestDTO?.cnsintId
  }) as ConsultantReqInterestDTO
  const [status, setStatus] = React.useState<ConsultantReqInterestDTO | null>(null)
 //const statusRec: any = dataLov?.consultantReqInterests?.find((jrcn: any) => jrcn.cnsintId === status ? status : jrcnDTOProp.jobReqConsultant?.cnsintId)
  // rec?.consultantReqInterests?.find( (jrcn:any)=> jrcn.cnsintId === status? status: ReqCardData?.jobReqConsultant?.jrcnStatus )
  const navigate = useNavigate();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //const kuku = `/JobContacts/${event.currentTarget.name}`
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
    deleteReq({ cntId: userIdFromAuth0Metadata, jrId: jobReqConsultantDTO.id? jobReqConsultantDTO.id:jobReqConsultantDTO.jrId.toString() })
  }
  //export default function ReqCard(ReqCardData: any) {
  const title: string = jobReqConsultantDTO.jrPositionTitle
  //const kuku = ReqCardData.jrId
  const jrPosDescription = jobReqConsultantDTO.jrPosDescription

  const handleChange: (event: SelectChangeEvent<ConsultantReqInterestDTO>, child?: ReactNode) => any = (event: SelectChangeEvent<typeof status>) => {
    const {
      target: { value },
    } = event;
    const newStatus = value as ConsultantReqInterestDTO
    //const  jobReqConsultantDTOUpdated: Partial<ConsultantReqInterestDTO> | Pick<ConsultantReqInterestDTO, 'cnsintId'> = { ...jrcnDTO.jobReqConsultant }
    const  jobReqConsultantDTOUpdated: JobReqConsultantDTO = { ...jobReqConsultantDTO }
    jobReqConsultantDTOUpdated.consultantReqInterestDTO = {...newStatus} 
    //jobReqConsultantDTOUpdated.jobReqConsultant.cnsintId = 23// = { JrcnStatus: newStatus.id }
    updateReq(  { cntId:userIdFromAuth0Metadata, jobReqConsultantDTO: jobReqConsultantDTOUpdated/*{ jrId: 0, jobReqConsultant: null }*/} )//: { JobReqConsultant: { jrcnStatus: newStatus.id } } })
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


  /*
     // Block navigating elsewhere when data has been entered into the input
     useEffect(() => {
      const handleNavigateAway = (event: BeforeUnloadEvent) => {
        console.log( 'BeforeUnloadEvent')
        const message = 'Sure you want to leave?';
        event.preventDefault();
        event.returnValue = true
      };
      console.log('addEventListener(beforeunload ')
      window.addEventListener('beforeunload', handleNavigateAway, true);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('beforeunload', handleNavigateAway);
      };
    }, [status !== null && statusRectInit?.id === status?.id ]);
  */

  //let kuku =  kuk.map( (d)=> d)
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
              value={ status ? status: statusRectInit()}
              onChange={handleChange}
              input={<OutlinedInput sx={{ height: "10%" }} id="job-status" label="My status" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <Chip label={selected.cnsintDescription} />
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {jobStatuses( dataLov as LovDTO)?.map((cri) => (
                <MenuItem
                  key={ cri.cnsintId}
                  value={cri as any}
                  style={getStyles(cri.cnsintDescription, [status?.cnsintDescription??""], theme)}
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
          <Button sx={{}} size="small" disabled={isDeleting} name={"kuku"} onClick={handleButtonClick}>Contacts</Button>
          <IconButton sx={{}} aria-label="delete" disabled={isDeleting} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ReqCard;