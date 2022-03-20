using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 07/02/2022
/// </summary>
/// 

namespace Auth.Model.Administrative.Model
{
    [Table("Location_Type", Schema = "Administrative")]
    public class LocationType
    {
        [Key]
        public int location_type_id { get; set; }
        public string location_type_name { get; set; }
        public int country_id { get; set; }
        public string remarks { get; set; }
    }
}
