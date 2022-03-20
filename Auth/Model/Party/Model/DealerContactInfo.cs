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
    [Table("Dealer_Contact_Info", Schema = "Party")]
    public class DealerContactInfo
    {
        [Key]
        public int dealer_contact_info_id { get; set; }
        public int dealer_info_id { get; set; }
        public string dealer_contact_info_code { get; set; }
        public string person_name { get; set; }
        public string person_designation { get; set; }
        public string father_name { get; set; }
        public string mother_name { get; set; }
        public DateTime? date_of_birth { get; set; }
        public int? religion_enum_id { get; set; }
        public string nationality { get; set; }
        public string national_id_no { get; set; }
        public string birth_certificate_no { get; set; }
        public string passport_no { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string emergency_contact { get; set; }
        public int? blood_group_enum_id { get; set; }
        public string image_path { get; set; }
        public int permanent_country_id { get; set; }
        public int permanent_division_id { get; set; }
        public int permanent_district_id { get; set; }
        public int permanent_thana_id { get; set; }
        public int? permanent_zone_id { get; set; }
        public string permanent_ps_area { get; set; }
        public string permanent_post_code { get; set; }
        public string permanent_block { get; set; }
        public string permanent_road_no { get; set; }
        public string permanent_house_no { get; set; }
        public string permanent_flat_no { get; set; }
        public int present_country_id { get; set; }
        public int present_division_id { get; set; }
        public int present_district_id { get; set; }
        public int present_thana_id { get; set; }
        public int? present_zone_id { get; set; }
        public string present_ps_area { get; set; }
        public string present_post_code { get; set; }
        public string present_block { get; set; }
        public string present_road_no { get; set; }
        public string present_house_no { get; set; }
        public string present_flat_no { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_info_id { get; set; }
        public IFormFile ImageUpload { get; set; }


    }
}
