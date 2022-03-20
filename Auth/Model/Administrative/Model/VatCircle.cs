using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Vat_Circle", Schema = "Administrative")]
    public class VatCircle
    {
        [Key]
        public int vat_circle_id { get; set; }
        public string vat_circle_name { get; set; }
        public int vat_division_id { get; set; }
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
