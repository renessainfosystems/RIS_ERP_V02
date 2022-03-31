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
    public class SupplierCreditDeposit
    {

        
        public int supplier_id { get; set; }
        public int currency_id { get; set; }
        public int credit_days { get; set; }
        public decimal credit_limit { get; set; }
        public int payment_frequency_id { get; set; }


        public List<SecurityDepositSession> securityDepositSession { get; set; }

    }

    public class SecurityDepositSession
    {

        public int supplier_id { get; set; }
        public int security_deposit_id { get; set; }
        public decimal security_amount { get; set; }
        public DateTime expiry_date { get; set; }



    }
}
