using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;




/// <summary>
/// Created by Adnan
/// Dated: 22/12/2021
/// </summary>

namespace Auth.Model.Procurement.Model
{
    public class SupplierLocation
    {
        [Key]
        public int supplier_id { get; set; }
        public int supplier_location_id { get; set; }
        public string supplier_location_name { get; set; }
        public int location_type_id { get; set; }
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

    }

}
