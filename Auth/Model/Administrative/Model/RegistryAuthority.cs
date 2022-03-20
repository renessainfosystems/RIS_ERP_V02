using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


/// <summary>
/// Created by Adnan
/// Dated: 14/12/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Registry_Authority", Schema = "Administrative")]
    public class RegistryAuthority
    {
        [Key]
        public int registry_authority_id { get; set; }
        [Required]
        public string registry_authority_name { get; set; }

        public string registry_authority_short_name { get; set; }
        [Required]
        public int country_id { get; set; }
        public string remarks { get; set; }
    }
}
