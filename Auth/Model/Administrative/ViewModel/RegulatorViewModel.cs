using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 14/12/2021
/// </summary>

namespace Auth.Model.Administrative.ViewModel
{
    public class RegulatorViewModel
    {
        [Key]
        public int regulator_id { get; set; }
        [Required]
        public string regulator_name { get; set; }
        [Required]
        public int country_id { get; set; }
        public string country_name { get; set; }
        public string remarks { get; set; }


    }
}
