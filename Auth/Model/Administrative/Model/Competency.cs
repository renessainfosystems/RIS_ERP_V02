using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Competency", Schema = "Administrative")]
    public class Competency
    {
        [Key]
        public int competency_id { get; set; }
        public string competency_name { get; set; }
        public string remarks { get; set; }
        public int company_corporate_id { get; set; }

    }
}
