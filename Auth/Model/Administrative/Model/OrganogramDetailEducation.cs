using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Organogram_Detail_Education", Schema = "Administrative")]
    public class OrganogramDetailEducation
    {
        [Key]
        public int organogram_detail_education_id { get; set; }
        public int organogram_detail_id { get; set; }
        public int education_id { get; set; }

    }
}
