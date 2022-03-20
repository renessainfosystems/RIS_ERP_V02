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
    public class SupplierDocument
    {
        
        public int supplier_document_id { get; set; }
        public int supplier_id { get; set; }
        public int document_type_id { get; set; }
        public string document_number { get; set; }
        public DateTime issue_date { get; set; }
        public DateTime expiry_date { get; set; }

        public IFormFile FileUpload { get; set; }
        public string file_path { get; set; }

    }

}
