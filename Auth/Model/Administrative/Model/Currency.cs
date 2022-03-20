using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Currency", Schema = "Administrative")]
    public class Currency
    {
        [Key]
        public int currency_id { get; set; }
        [Required]
        public int country_id { get; set; }
        [Required]
        public string currency_name { get; set; }
        [Required]
        public string issue_organization { get; set; }
        [Required]
        public string symbol { get; set; }
    }
}
