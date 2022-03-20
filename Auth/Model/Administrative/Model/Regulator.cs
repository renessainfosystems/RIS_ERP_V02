using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


/// <summary>
/// Created by Adnan
/// Dated: 22/12/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Regulator", Schema = "Administrative")]
    public class Regulator
    {
        [Key]
        public int regulator_id { get; set; }
        [Required]
        public string regulator_name { get; set; }
        [Required]
        public int country_id { get; set; }
        public string remarks { get; set; }
    }
}
