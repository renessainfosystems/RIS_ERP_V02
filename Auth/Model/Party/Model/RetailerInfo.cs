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
    [Table("Retailer_Info", Schema = "Party")]
    public class RetailerInfo
    {
        [Key]
        public int retailer_info_id { get; set; }
        public int company_corporate_id { get; set; }
        public int company_group_id { get; set; }
        public int company_id { get; set; }
        public int dealer_info_id { get; set; }
        public string retailer_info_code { get; set; }
        public string retailer_info_short_name { get; set; }
        public string retailer_info_name { get; set; }
        public string trade_license { get; set; }
        public DateTime? trade_license_date { get; set; }
        public string TIN { get; set; }
        public string BIN { get; set; }
        public int domicile_enum_id { get; set; }
        public int? business_type_enum_id { get; set; }
        public int industry_sector_id { get; set; }
        public int? industry_sub_sector_id { get; set; }
        public int ownership_type_id { get; set; }
        public int currency_id { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string web_url { get; set; }
        public string image_path { get; set; }
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
        public DateTime db_server_date_time { get; set; }
        public long created_user_info_id { get; set; }

        public IFormFile ImageUpload { get; set; }


    }
}
