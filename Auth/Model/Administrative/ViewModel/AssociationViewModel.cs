﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 14/12/2021
/// </summary>

namespace Auth.Model.Administrative.ViewModel
{
    public class AssociationViewModel
    {
        [Key]
        public int association_id { get; set; }
        [Required]
        public string association_name { get; set; }
        public string abbreviation { get; set; }
        [Required]
        public int country_id { get; set; }
        public int organization_type_id_enum { get; set; }
        public string remarks { get; set; }

        public string country_name { get; set; }

        public string organization_type_name_enum { get; set; }


    }
}
