using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("District", Schema = "Administrative")]
    public class District
    {
        [Key]
        public int district_id { get; set; }
        public int division_id { get; set; }
        public string district_code { get; set; }
        public string district_name { get; set; }
        public string district_short_name { get; set; }
        public string name_in_local_language { get; set; }
        public string short_name_in_local_language { get; set; }
        public string remarks { get; set; }
    }
}
