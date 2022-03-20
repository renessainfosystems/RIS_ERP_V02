using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 22/11/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Payment_Method", Schema = "DBEnum")]
    public class PaymentMethod
    {
        [Key]
        public int payment_method_id { get; set; }
        public string payment_method_name { get; set; }
    }
}
