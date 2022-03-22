using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 14/12/2021
/// </summary>

namespace Auth.Model.Administrative.ViewModel
{
    public class DocumentTypeViewModel
    {
        [Key]
        public int document_type_id { get; set; }
        [Required]
        public string document_type_name { get; set; }
        [Required]
        public int country_id { get; set; }

        public string country_name { get; set; }
        public string remarks { get; set; }


    }
}
