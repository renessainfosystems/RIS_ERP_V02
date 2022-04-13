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
    public class SupplierBusiness
    {

        [Key]
        public int supplier_id { get; set; }
        public int business_activities_enum_id { get; set; }
        public int management_staff_no { get; set; }
        public int nonmanagement_staff_no { get; set; }
        public int permanent_worker_no { get; set; }
        public int casual_worker_no { get; set; }

        public List<SubSectorSession> subSectorSession { get; set; }

        public List<EcommerceSession> ecommerceSession { get; set; }
    }
    public class SubSectorSession
    {
        public SubSectorSession()
        {
            supplier_id = 0;
            industry_sub_sector_id = 0;

        }
        public int supplier_id { get; set; }
        public int industry_sub_sector_id { get; set; }
    }

    public class EcommerceSession
    {
        public EcommerceSession()
        {
            supplier_id = 0;
            ecommerce_platforms_id = 0;
        }
        public int supplier_id { get; set; }
        public int ecommerce_platforms_id { get; set; }
    }
}
