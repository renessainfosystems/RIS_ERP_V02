using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 14/12/2021
/// </summary>

namespace Auth.Model.Administrative.ViewModel
{
    public class EcommercePlatformViewModel
    {
        [Key]

        public int ecommerce_paltforms_id { get; set; }
        [Required]
        public string ecommerce_paltforms_name { get; set; }

        public int country_id { get; set; }

        public string country_name { get; set; }
        public string remarks { get; set; }

    }
}
