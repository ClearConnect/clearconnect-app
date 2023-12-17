export interface SkillData {
    SkSkillId: number
    SkShortName: string
    SkDesc: string
    SkCategoryId: number
    SkUpdateDate: Date
    SkUserId: number
    SkColorRgb: number
}

export interface ReqData {
    jrId: number
    id: string
    jrCompanyId: number

    jrLocationId: number

    jrDateReceive: Date

    jrDateOpen: Date

    jrPosStatusId: number //1 hot

    jrContractFlag: string // "C":

    jrSalMin: number

    jrSalMax: number

    jrNumPos: number

    jrWorkScheduleType: number

    jrReqClientNum: string

    jrAdvertSubject: string

    jrAdvertText: string

    jrEntryDate: Date

    jrUpdateDate: Date

    //     number jrUserId :

    jrPositionTitle: string

    //   string jrPosDescriptionRtf :

    //     Date jrAdvertSentDate :

    jrStatusConfirmDate: Date

    jrBeingWorked: string

    jrCategoryId: number

    jr3dworkoutStartDate: Date

    jr3dworkoutEndDate: Date

    //   number jrNewsGroupTemplateId :

    jrProjectName: string

    // string jrFileName :

    jrRecruiterAssignedStatusId: number

    jrInstructionToRecrutier: string

    jrAdvertValidated: string

    jrAdvertValidatedDate: Date

    jrAdvertHtml: string

    // string jrBatch :

    jrMassMailDate: Date

    // Date jrCutOffDate :

    // string jrSearchText :

    // number jrSubmissionOptionId :

    jrBillRate: number

    jrProjectDesc: string

    jrEnvironmentDesc: string

    jrPosDescription: string

    jrAdvertKeywords: string

    jrAdvertRate: string

    // Date jrPostOnDice :

    jrBuId: number

    // string jrAdvertRtf :

    // string jrPostOnCbId : = null!:

    // Date jrPostOnCb :

    jrInstructionsToRecruiterHtml: string

    jrInstructionsToRecruiterHtmlStyle: string

    jrPosDescriptionHtml: string

    // virtual ICollection<ConsultantJobHistory> ConsultantJobHistories { get: } = new List<ConsultantJobHistory>():

    // virtual ICollection<numbererivewTipRelevance> numbererivewTipRelevances { get: } = new List<numbererivewTipRelevance>():

    // virtual ICollection<JobReqConsultantDocumentFile> JobReqConsultantDocumentFiles { get: } = new List<JobReqConsultantDocumentFile>():

    // virtual ICollection<JobReqConsultant> JobReqConsultants { get: } = new List<JobReqConsultant>():

    // virtual ICollection<JobReqContact> JobReqContacts { get: } = new List<JobReqContact>():

    // virtual ICollection<JobReqLocation> JobReqLocations { get: } = new List<JobReqLocation>():

    // virtual ICollection<JobSkillKeyword> JobSkillKeywords { get: } = new List<JobSkillKeyword>():

    JobSkills: [SkillData]

    // virtual Skill jrCategory :

    // virtual Company jrCompany : = null!:

    // virtual JobLocation jrLocation :

    // virtual Template jrNewsGroupTemplate :

    // virtual PositionStatusType jrPosStatus : = null!:

    // virtual CbJobId jrPostOnCbNavigation : = null!:

    // virtual PositionStatusType jrRecruiterAssignedStatus : = null!:

    // virtual ResumeSubmissionOption jrSubmissionOption : = null!:

    // virtual WorkSchedulePayType jrWorkScheduleTypeNavigation :

    // virtual ICollection<Placement> Placements { get: } = new List<Placement>():

}
export interface  ConsultantReqInterestDTO
{
    cnsintId: number 
    cnsintDescription: string 
    cnsintOrder: number
}
export interface LovDTO{
  consultantReqInterests:  ConsultantReqInterestDTO[]
}

export interface JobReqConsultantDTO extends  ReqData
{
    consultantReqInterestDTO: ConsultantReqInterestDTO// Partial<ConsultantReqInterestDTO> & Pick<ConsultantReqInterestDTO, 'cnsintId'>
    //JobReq: any
}
