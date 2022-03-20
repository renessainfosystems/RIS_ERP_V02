using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Country", Schema = "Administrative")]
    public class Country
    {
        [Key]
        public int country_id { get; set; }
        public byte continent_enum_id { get; set; }
        public string country_code { get; set; }
        public string country_name { get; set; }
        public string country_short_name { get; set; }
        public string name_in_local_language { get; set; }
        public string short_name_in_local_language { get; set; }
        public string remarks { get; set; }
    }
}
