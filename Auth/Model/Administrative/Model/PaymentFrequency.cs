using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 31/03/2022
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Payment_Frequency", Schema = "DBEnum")]
    public class PaymentFrequency
    {
        [Key]
        public int payment_frequency_id { get; set; }
        public string payment_frequency_name { get; set; }
    }
}
