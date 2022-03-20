using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Industry_Sub_Sector", Schema = "Administrative")]
    public class IndustrySubSector
    {
        [Key]
        public int industry_sub_sector_id { get; set; }
        public int industry_sector_id { get; set; }
        public string industry_sub_sector_name { get; set; }
        public string remarks { get; set; }
    }
}
