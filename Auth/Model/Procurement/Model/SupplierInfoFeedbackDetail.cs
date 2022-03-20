using System.ComponentModel.DataAnnotations;


/// <summary>
/// Created by Adnan
/// Dated: 22/12/2021
/// </summary>


namespace Auth.Model.Procurement.Model
{
    //[Table("Supplier_Info_Feedback_Detail", Schema = "Procurement")]
    public class SupplierInfoFeedbackDetail
    {
        [Key]
        public int supplier_info_feedback_detail_id { get; set; }
        public int supplier_id { get; set; }
        public int approval_user_id { get; set; }
        public int reject_user_id { get; set; }
        public string comment { get; set; }       
        public string suggestion { get; set; }
        public int feedback_status { get; set; }      
    }
}
