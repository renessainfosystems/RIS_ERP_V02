using System;

namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierAssessmentViewModel
    {
        public SupplierAssessmentViewModel()
        {
            //Constractor
        }
        public int SupplierAssessmentId { get; set; }
        public int AssessmentCriteriaId { get; set; }
        public decimal ManualWeight { get; set; }
        public decimal ActualWeight { get; set; }
        public static SupplierAssessmentViewModel ConvertToModel(dynamic supplierAssessment)
        {
            var model = new SupplierAssessmentViewModel();
            model.SupplierAssessmentId = supplierAssessment.supplier_assessment_id ?? 0;
            model.AssessmentCriteriaId = supplierAssessment.assessment_criteria_id ?? 0;
            model.ManualWeight = supplierAssessment.manual_weight ?? 0;
            model.ActualWeight = supplierAssessment.actual_weight ?? 0;
            return model;
        }
    }     

}


