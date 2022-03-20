using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 21/12/2021
/// </summary>


namespace Auth.Model.Administrative.Model
{
    [Table("Ecommerce_Platforms", Schema = "Administrative")]
    public class EcommercePlatform
    {
        [Key]
        public int ecommerce_paltforms_id { get; set; }
        [Required]
        public string ecommerce_paltforms_name { get; set; }
        public string remarks { get; set; }

    }
}
