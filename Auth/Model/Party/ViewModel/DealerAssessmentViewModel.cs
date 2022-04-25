using System;

namespace Auth.Model.Party.ViewModel
{
    public class DealerAssessmentViewModel
    {
        public DealerAssessmentViewModel()
        {
            //Constractor
        }
        public int DealerAssessmentId { get; set; }
        public int DealerInfoId { get; set; }
        public int AssessmentCriteriaId { get; set; }
        public decimal AutomaticScore { get; set; }
        public decimal ManualScore { get; set; }
        public decimal ActualScore { get; set; }
        public string Comment { get; set; }
        public string AssessmentCriteriaName { get; set; }
        public int CriteriaTypeId { get; set; }
        public int PartyTypeId { get; set; }


        public static DealerAssessmentViewModel ConvertToModel(dynamic dealerAssessment)
        {
            var model = new DealerAssessmentViewModel();
            model.DealerAssessmentId = dealerAssessment.dealer_assessment_id ?? 0;
            model.DealerInfoId = dealerAssessment.dealer_info_id ?? 0;
            model.AssessmentCriteriaId = dealerAssessment.assessment_criteria_id ?? 0;
            model.AutomaticScore = dealerAssessment.automatic_score ?? 0;
            model.ManualScore = dealerAssessment.manual_score ?? 0;
            model.ActualScore = dealerAssessment.actual_score ?? 0;
            model.Comment = dealerAssessment.comment ?? "";
            model.AssessmentCriteriaName = dealerAssessment.assessment_criteria_name ?? "";
            model.CriteriaTypeId = dealerAssessment.criteria_type_id ?? 0;
            model.PartyTypeId = dealerAssessment.party_type_id ?? 0;
            return model;
        }
    }     

}


