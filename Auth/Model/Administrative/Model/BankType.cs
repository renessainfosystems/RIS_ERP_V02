using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 22/11/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Bank_Type", Schema = "DBEnum")]
    public class BankType
    {
        [Key]
        public int bank_type_id { get; set; }
        public string bank_type_name { get; set; }

    }
}
