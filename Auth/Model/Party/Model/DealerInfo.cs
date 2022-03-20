using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahid
/// Dated: 13/02/2022
/// </summary>
namespace Auth.Model.Party.Model
{
    [Table("Dealer_Info", Schema = "Party")]
    public class DealerInfo
    {
        [Key]
        public int dealer_info_id { get; set; }
        public int company_corporate_id { get; set; }
        public int company_group_id { get; set; }
        public int company_id { get; set; }
        public string dealer_info_code { get; set; }
        public string dealer_info_short_name { get; set; }
        public string dealer_info_name { get; set; }
        public string dealer_info_display_name { get; set; }
        public string trade_license { get; set; }
        public DateTime? year_established { get; set; }
        public string TIN { get; set; }
        public string BIN { get; set; }
        public int domicile_enum_id { get; set; }
        public int? business_type_enum_id { get; set; }
        public int industry_sector_id { get; set; }
        public int? industry_sub_sector_id { get; set; }
        public int ownership_type_id { get; set; }
        public int? organization_type_enum_id { get; set; }
        public int? registry_authority_id { get; set; }
        public int? regulator_id { get; set; }
        public int currency_id { get; set; }
        public int? security_type_enum_id { get; set; }
        public int? prefered_method_enum_id { get; set; }
        public decimal? internal_credit_rating { get; set; }
        public decimal? allowable_credit { get; set; }
        public decimal? maximum_credit { get; set; }
        public decimal? credit_days { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string web_url { get; set; }
        public string logo_path { get; set; }
        public int continent_enum_id { get; set; }
        public int country_id { get; set; }
        public int division_id { get; set; }
        public int district_id { get; set; }
        public int thana_id { get; set; }
        public int? zone_id { get; set; }
        public string ps_area { get; set; }
        public string post_code { get; set; }
        public string block { get; set; }
        public string road_no { get; set; }
        public string house_no { get; set; }
        public string flat_no { get; set; }
        public string address_note { get; set; }        
        public bool is_active { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime? updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_info_id { get; set; }
        public long? updated_user_info_id { get; set; }

        public IFormFile ImageUpload { get; set; }


    }
}
