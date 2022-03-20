using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 22/11/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Security_Deposit", Schema = "Administrative")]
    public class SecurityDeposit
    {
        [Key]
        public int security_deposit_id { get; set; }
        public string security_deposit_name { get; set; }

    }
}
