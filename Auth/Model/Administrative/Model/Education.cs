using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Education", Schema = "Administrative")]
    public class Education
    {
        [Key]
        public int education_id { get; set; }
        public string education_name { get; set; }
        public string remarks { get; set; }
        public int company_corporate_id { get; set; }

    }
}
