using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Organogram_Detail_Supervisor", Schema = "Administrative")]
    public class OrganogramDetailSupervisor
    {
        [Key]
        public int organogram_detail_supervisor_id { get; set; }
        public int organogram_detail_id { get; set; }
        public byte sub_ordinate_line_enum_id { get; set; }
        public int position_id { get; set; }

    }
}
