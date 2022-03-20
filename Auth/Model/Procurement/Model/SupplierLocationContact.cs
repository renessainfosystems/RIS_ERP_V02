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
    public class SupplierLocationContact
    {
        public int supplier_contact_location_id { get; set; }
        public int supplier_id { get; set; }
        public int supplier_contact_id { get; set; }
        public int supplier_location_id { get; set; }
        public string add_note { get; set; }

    }

}
