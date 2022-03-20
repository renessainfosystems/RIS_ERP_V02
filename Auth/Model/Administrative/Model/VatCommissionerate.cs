using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Vat_Commissionerate", Schema = "Administrative")]
    public class VatCommissionerate
    {
        [Key]
        public int vat_commissionerate_id { get; set; }
        public string vat_commissionerate_name { get; set; }
        public int company_corporate_id { get; set; }
        public int country_id { get; set; }
        public int division_id { get; set; }
        public int district_id { get; set; }
        public string city { get; set; }
        public string ps_area { get; set; }
        public string post_code { get; set; }
        public string block { get; set; }
        public string road_no { get; set; }
        public string house_no { get; set; }
        public string flat_no { get; set; }
        public string address_note { get; set; }
        public string remarks { get; set; }
    }
}
