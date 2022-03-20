using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;



/// <summary>
/// Created by Adnan
/// Dated: 22/12/2021
/// </summary>


namespace Auth.Model.Procurement.Model
{
    [Table("Supplier_Application", Schema = "Procurement")]
    public class SupplierApplication
    {

        [Key]

        public int supplier_id { get; set; }

        public string supplier_code { get; set; }
        
        public string legal_name { get; set; }
 
        public string short_name { get; set; }
        public DateTime year_established { get; set; }
       
        public int domicile_enum_id { get; set; }
        public int registry_authority_id { get; set; }
        public int regulator_id { get; set; }
 
        public int ownership_type_id { get; set; }
        public string name_in_local_language { get; set; }
        public string address_in_local_language { get; set; }
        public string supplier_logo { get; set; }

    
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
        public string email { get; set; }
        public string mobile_no { get; set; }
        public string phone_no { get; set; }
        public string pabx { get; set; }
        public IFormFile ImageUpload { get; set; }
        public int user_info_id { get; set; }

    }

}
