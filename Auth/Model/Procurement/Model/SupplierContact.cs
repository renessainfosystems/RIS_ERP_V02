using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;




/// <summary>
/// Created by Adnan
/// Dated: 22/23/2022
/// </summary>


namespace Auth.Model.Procurement.Model
{
    [Table("Supplier_Contact", Schema = "Procurement")]
    public class SupplierContact
    {
        [Key]

        public int supplier_id { get; set; }

        public int supplier_contact_id { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public string sur_name { get; set; }
        public int contact_type_id { get; set; }
        public int designation_id { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }

        public string whatsapp { get; set; }

        public string facebook { get; set; }

        public string linkedin { get; set; }

        public DateTime date_of_birth { get; set; }
        public string nationality_id { get; set; }
        public int religion_enum_id { get; set; }
        public int gender_enum_id { get; set; }
        public int marital_status_enum_id { get; set; }
        public int blood_group_enum_id { get; set; }
        public DateTime date_of_marriage { get; set; }
        public string nid_number { get; set; }
        public IFormFile FileUpload { get; set; }
        public string nid_file_path { get; set; }

        public string passport_no { get; set; }
        public string birth_id { get; set; }
        public string driving_license_no { get; set; }

    }

}
