using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


/// <summary>
/// Created by Adnan
/// Dated: 22/12/2021
/// </summary>

namespace Auth.Model.Procurement.Model
{
    [Table("Supplier_Assessment", Schema = "Procurement")]
    public class SupplierAssessment
    {
        [Key]

        public int supplier_assessment_id { get; set; }
        public int criteria_type { get; set; }
        public int supplier_id { get; set; }
        public int assessment_criteria_id { get; set; }
        //public decimal automatic_weight { get; set; }
        public decimal manual_weight { get; set; }
        public decimal actual_weight { get; set; }
        public string comments { get; set; }
        //public DateTime start_date { get; set; }

    }
    

}
