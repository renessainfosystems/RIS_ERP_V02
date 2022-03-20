using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;




/// <summary>
/// Created by Adnan
/// Dated: 22/12/2021
/// </summary>

namespace Auth.Model.Procurement.Model
{
    public class SupplierAssociation
    {
        [Key]

        public int supplier_association_id { get; set; }    
        public int supplier_id { get; set; }
        public int association_id { get; set; }
        public int membership_type_enum_id { get; set; }
        public string association_number { get; set; }
        public DateTime start_date { get; set; }
 
    }

}
