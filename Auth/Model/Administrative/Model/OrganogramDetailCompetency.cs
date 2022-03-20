using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Organogram_Detail_Competency", Schema = "Administrative")]
    public class OrganogramDetailCompetency
    {
        [Key]
        public int organogram_detail_competency_id { get; set; }
        public int organogram_detail_id { get; set; }
        public int competency_id { get; set; }

    }
}
