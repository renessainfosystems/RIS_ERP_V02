using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Company_Group", Schema = "Administrative")]
    public class CompanyGroup
    {
        [Key]
        public int company_group_id { get; set; }
        [Required(ErrorMessage = "Group Name is required.")]
        public string group_name { get; set; }
        [Required(ErrorMessage = "Group Short Name is required.")]
        public string group_short_name { get; set; }        
        public int company_corporate_id { get; set; }
        [Required(ErrorMessage = "Country is required.")]
        public int country_id { get; set; }
        public int? division_id { get; set; }
        public int? district_id { get; set; }
        public string city { get; set; }
        public string ps_area { get; set; }
        public string post_code { get; set; }
        public string block { get; set; }
        public string road_no { get; set; }
        public string house_no { get; set; }
        public string flat_no { get; set; }
        public string address_note { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string web_url { get; set; }
        public int? currency_id { get; set; }
        public string group_logo { get; set; }
        public string name_in_local_language { get; set; }
        public string address_in_local_language { get; set; }
        public string remarks { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime? updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long? updated_user_id { get; set; }
    }
}
