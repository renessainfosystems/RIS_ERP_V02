using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Key_Skill", Schema = "Administrative")]
    public class KeySkill
    {
        [Key]
        public int key_skill_id { get; set; }
        public string key_skill_name { get; set; }
        public string remarks { get; set; }
        public int company_corporate_id { get; set; }
    }
}
