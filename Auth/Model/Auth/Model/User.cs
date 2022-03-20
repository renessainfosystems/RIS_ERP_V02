using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Auth.Model
{
    public class User
    {
     
        public User()
        {
            user_info_id = 0;
            user_name = "";
            employee_id = 0;
            remarks = "";
            is_active = false;
            company_id = 0;
            company_corporate_id = 0;
            user_type_enum_id = 0;
            login_id = "";
            phone_no = "";
            email_address = "";
            password = "";
            national_id = "";
            mobile_no = "";
            user_image_path = "";
            signature_image_path = "";
            is_password_reset = false;
            created_user_info_id = 0;
            updated_user_info_id = 0;
            updated_datetime = DateTime.Now;
            created_datetime = DateTime.Now;
           


        }
        [Key] 
        public int user_info_id { get; set; }
        public string user_name { get; set; }
        public int employee_id { get; set; }
        public string remarks { get; set; }
        public Boolean is_active { get; set; }
        public int company_id { get; set; }
        public int company_corporate_id { get; set; }
        public int user_type_enum_id { get; set; }
        public string login_id { get; set; }
        public string phone_no { get; set; }
        public string email_address { get; set; }
        public string password { get; set; }
        public string national_id { get; set; }
        public string mobile_no { get; set; }
        public string user_image_path { get; set; }
        public string signature_image_path { get; set; }
        public Boolean is_password_reset { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
        public int created_user_info_id { get; set; }
        public int updated_user_info_id { get; set; }
        public IFormFile SignatureUpload { get; set; }
        public IFormFile ImageUpload { get; set; }
    }
}
