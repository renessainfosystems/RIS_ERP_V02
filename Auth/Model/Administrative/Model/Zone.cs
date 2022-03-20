using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Zone", Schema = "Administrative")]
    public class Zone
    {
        [Key]
        public int zone_id { get; set; }
        public int country_id { get; set; }
        public string zone_code { get; set; }
        public string zone_name { get; set; }
        public string zone_short_name { get; set; }
        public string name_in_local_language { get; set; }
        public string short_name_in_local_language { get; set; }
        public string remarks { get; set; }
    }
}
