using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Company_Industry_Sub_Sector", Schema = "Administrative")]
    public class CompanyIndustrySubSector
    {
        [Key]
        public int company_industry_sub_sector_id { get; set; }
        public int company_id { get; set; }
        public int industry_sub_sector_id { get; set; }
        public bool is_active { get; set; }
        public string remarks { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long updated_user_id { get; set; }
    }
}
