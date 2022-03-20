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
    public class SupplierBankAccount
    {
        [Key]
        public int supplier_id { get; set; }
        public int supplier_bank_account_id { get; set; }       
        public int bank_id { get; set; }
        public int bank_branch_id { get; set; }
        public string account_name { get; set; }
        public string account_number { get; set; }
        public string iban { get; set; }



    }

}
