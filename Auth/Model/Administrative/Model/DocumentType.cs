using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 01/02/2022
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Document_Type", Schema = "Administrative")]
    public class DocumentType
    {
        [Key]
        public int document_type_id { get; set; }
        [Required]
        public string document_type_name { get; set; }
        [Required]
        public int country_id { get; set; }
        public string remarks { get; set; }

    }
}
