using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Location", Schema = "Administrative")]
    public class Location
    {

        public Location()
        {
            location_id = 0;
            location_code = "";
            location_name = "";
            location_short_name = "";
            location_prefix = "";
            location_reg_no = "";
            location_reg_date = new DateTime();
            location_reg_file_path = "";
            vat_applicable_type_enum_id = 0;
            country_id = 0;
            division_id = 0;
            district_id = 0;
            thana_id = 0;
            city = "";
            post_code = "";
            block = "";
            road_no = "";
            house_no = "";
            flat_no = "";
            address_note = "";
            phone = "";
            email = "";
            web_url = "";
            remarks = "";
            is_active = true;
            name_in_local_language = "";
            address_in_local_language = "";
            //created_datetime = new DateTime();
            //updated_datetime = new DateTime();
            //db_server_date_time = new DateTime();
            created_user_id = 0;
            updated_user_id = 0;
            company_corporate_id = 0;
            company_group_id = 0;
            company_id = 0;
        }

        [Key]
        public int location_id { get; set; }
        public string location_code { get; set; }
        public string location_name { get; set; }
        public string location_short_name { get; set; }
        public string location_prefix { get; set; }
        public string location_reg_no { get; set; }
        public DateTime? location_reg_date { get; set; }
        public string location_reg_file_path { get; set; }
        public byte vat_applicable_type_enum_id { get; set; }
        public int country_id { get; set; }
        public int? division_id { get; set; }
        public int? district_id { get; set; }
        public int? thana_id { get; set; }
        public string city { get; set; }
        public string post_code { get; set; }
        public string block { get; set; }
        public string road_no { get; set; }
        public string house_no { get; set; }
        public string flat_no { get; set; }
        public string address_note { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string web_url { get; set; }     
        public string remarks { get; set; }
        public bool is_active { get; set; }
        public string name_in_local_language { get; set; }
        public string address_in_local_language { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime? updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long? updated_user_id { get; set; }
        public int company_corporate_id { get; set; }
        public int company_group_id { get; set; }
        public int company_id { get; set; }        
    }
}
