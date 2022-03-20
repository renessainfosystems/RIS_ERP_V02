using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 08/02/2022
/// </summary>
/// 
namespace Auth.Model.Administrative.Model
{
    [Table("Contact_Type", Schema = "Administrative")]
    public class ContactType
    {
        [Key]
        public int contact_type_id { get; set; }
        public string contact_type_name { get; set; }
        public int country_id { get; set; }
        public string remarks { get; set; }
    }
}
