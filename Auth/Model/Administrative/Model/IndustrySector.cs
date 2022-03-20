using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Industry_Sector", Schema = "Administrative")]
    public class IndustrySector
    {
        [Key]
        public int industry_sector_id { get; set; }
        public string industry_sector_name { get; set; }
        public string remarks { get; set; }
    }
}
