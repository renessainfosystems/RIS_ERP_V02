using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Organogram_Detail_Key_Skill", Schema = "Administrative")]
    public class OrganogramDetailKeySkill
    {
        [Key]
        public int organogram_detail_key_skill_id { get; set; }
        public int organogram_detail_id { get; set; }
        public int key_skill_id { get; set; }

    }
}
