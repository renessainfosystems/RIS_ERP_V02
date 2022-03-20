using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Ownership_Type", Schema = "Administrative")]
    public class OwnershipType
    {
        [Key]
        public int ownership_type_id { get; set; }
        public string ownership_type_name { get; set; }
        public string remarks { get; set; }
        public int company_corporate_id { get; set; }
    }
}
