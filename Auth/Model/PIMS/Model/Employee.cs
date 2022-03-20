using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Masum
/// Dated: 27/1/2022
/// </summary>
namespace Auth.Model.PIMS.Model
{
    [Table("Employee", Schema = "PIMS")]
    public class Employee
    {
        [Key]
        public long employee_id { get; set; }
        public string code { get; set; }
        public int title_enum_id { get; set; }
        public string employee_name { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public string sur_name { get; set; }
        public string father_name { get; set; }
        public string mother_name { get; set; }
        public int gender_enum_id { get; set; }
        public int marital_status_enum_id { get; set; }
        public string spouse_name { get; set; }
        public DateTime? date_of_marriage { get; set; }
        public string personal_phone { get; set; }
        public string official_phone { get; set; }
        public string personal_email { get; set; }
        public string official_email { get; set; }
        public DateTime date_of_birth { get; set; }
        public string identification_mark { get; set; }
        public string national_id { get; set; }
        public string passport_no { get; set; }
        public string driving_license_no { get; set; }
        public int nationality_id { get; set; }
        public int religion_enum_id { get; set; }
        public int country_of_birth_id { get; set; }
        public int blood_group_enum_id { get; set; }
        public int ethnicity_id { get; set; }
        public int residentcial_status_enum_id { get; set; }
        public int? present_country_id { get; set; }
        public int? present_division_id { get; set; }
        public int? present_district_id { get; set; }
        public string present_city { get; set; }
        public string present_ps_area { get; set; }
        public string present_post_code { get; set; }
        public string present_block { get; set; }
        public string present_road_no { get; set; }
        public string present_house_no { get; set; }
        public string present_flat_no { get; set; }
        public string present_address_note { get; set; }

        public int? permanent_country_id { get; set; }
        public int? permanent_division_id { get; set; }
        public int? permanent_district_id { get; set; }
        public string permanent_city { get; set; }
        public string permanent_ps_area { get; set; }
        public string permanent_post_code { get; set; }
        public string permanent_block { get; set; }
        public string permanent_road_no { get; set; }
        public string permanent_house_no { get; set; }
        public string permanent_flat_no { get; set; }
        public string permanent_address_note { get; set; }
        public int company_corporate_id { get; set; }
        public int company_group_id { get; set; }
        public int company_id { get; set; }
        public bool is_active { get; set; }
        public long? employee_old_id { get; set; }
        public string employee_old_code { get; set; }
        public string birth_id { get; set; }
        public string employee_image_path { get; set; }
        public string signature_image_path { get; set; }
        public string national_id_path { get; set; }


        public long created_user_id { get; set; }
        public long? updated_user_id { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime? updated_datetime { get; set; }

        public IFormFile SignatureUpload { get; set; }
        public IFormFile ImageUpload { get; set; }
      //  public IFormFile NationalIdUpload { get; set; }
    }
}
