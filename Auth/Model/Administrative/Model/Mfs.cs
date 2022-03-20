using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 22/11/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Mobile_Financial_Service", Schema = "Administrative")]
    public class Mfs
    {
        [Key]
        public int mfs_id { get; set; }
        [Required]
        public string mfs_name { get; set; }
        [Required]
        public int country_id { get; set; }
        public string remarks { get; set; }
    }
}
