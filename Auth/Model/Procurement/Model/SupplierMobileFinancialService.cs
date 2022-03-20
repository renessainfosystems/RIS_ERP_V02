using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;




/// <summary>
/// Created by Adnan
/// Dated: 16/02/2022
/// </summary>

namespace Auth.Model.Procurement.Model
{
    public class SupplierMobileFinancialService
    {
        [Key]
        public int supplier_id { get; set; }

        public int supplier_mobile_bank_id { get; set; }
        public int mfs_id { get; set; }
        public int mfs_type_id { get; set; }
        public string account_number { get; set; }



    }

}
