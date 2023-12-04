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
    JrId: number

    JrCompanyId: number

    JrLocationId: number

    JrDateReceive: Date

    JrDateOpen: Date

    JrPosStatusId: number //1 hot

    JrContractFlag: string // "C":

    JrSalMin: number

    JrSalMax: number

    JrNumPos: number

    JrWorkScheduleType: number

    JrReqClientNum: string

    JrAdvertSubject: string

    JrAdvertText: string

    JrEntryDate: Date

    JrUpdateDate: Date

    //     number JrUserId :

    JrPositionTitle: string

    //   string JrPosDescriptionRtf :

    //     Date JrAdvertSentDate :

    JrStatusConfirmDate: Date

    JrBeingWorked: string

    JrCategoryId: number

    Jr3dworkoutStartDate: Date

    Jr3dworkoutEndDate: Date

    //   number JrNewsGroupTemplateId :

    JrProjectName: string

    // string JrFileName :

    JrRecruiterAssignedStatusId: number

    JrInstructionToRecrutier: string

    JrAdvertValidated: string

    JrAdvertValidatedDate: Date

    JrAdvertHtml: string

    // string JrBatch :

    JrMassMailDate: Date

    // Date JrCutOffDate :

    // string JrSearchText :

    // number JrSubmissionOptionId :

    JrBillRate: number

    JrProjectDesc: string

    JrEnvironmentDesc: string

    JrPosDescription: string

    JrAdvertKeywords: string

    JrAdvertRate: string

    // Date JrPostOnDice :

    JrBuId: number

    // string JrAdvertRtf :

    // string JrPostOnCbId : = null!:

    // Date JrPostOnCb :

    JrInstructionsToRecruiterHtml: string

    JrInstructionsToRecruiterHtmlStyle: string

    JrPosDescriptionHtml: string

    // virtual ICollection<ConsultantJobHistory> ConsultantJobHistories { get: } = new List<ConsultantJobHistory>():

    // virtual ICollection<numbererivewTipRelevance> numbererivewTipRelevances { get: } = new List<numbererivewTipRelevance>():

    // virtual ICollection<JobReqConsultantDocumentFile> JobReqConsultantDocumentFiles { get: } = new List<JobReqConsultantDocumentFile>():

    // virtual ICollection<JobReqConsultant> JobReqConsultants { get: } = new List<JobReqConsultant>():

    // virtual ICollection<JobReqContact> JobReqContacts { get: } = new List<JobReqContact>():

    // virtual ICollection<JobReqLocation> JobReqLocations { get: } = new List<JobReqLocation>():

    // virtual ICollection<JobSkillKeyword> JobSkillKeywords { get: } = new List<JobSkillKeyword>():

    JobSkills: [SkillData]

    // virtual Skill JrCategory :

    // virtual Company JrCompany : = null!:

    // virtual JobLocation JrLocation :

    // virtual Template JrNewsGroupTemplate :

    // virtual PositionStatusType JrPosStatus : = null!:

    // virtual CbJobId JrPostOnCbNavigation : = null!:

    // virtual PositionStatusType JrRecruiterAssignedStatus : = null!:

    // virtual ResumeSubmissionOption JrSubmissionOption : = null!:

    // virtual WorkSchedulePayType JrWorkScheduleTypeNavigation :

    // virtual ICollection<Placement> Placements { get: } = new List<Placement>():

}

export interface JobReqConsultantDTO extends  ReqData
{
    JobReqConsultant: any
    JobReq: any
}
