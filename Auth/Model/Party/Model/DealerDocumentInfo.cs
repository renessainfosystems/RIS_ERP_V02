using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahid
/// Dated: 13/02/2022
/// </summary>
namespace Auth.Model.Party.Model
{
    [Table("Dealer_Document_Info", Schema = "Party")]
    public class DealerDocumentInfo
    {
        [Key]
        public int dealer_document_info_id { get; set; }
        public int dealer_info_id { get; set; }
        public int document_type_id { get; set; }
        public string document_number { get; set; }
        public DateTime issue_date { get; set; }
        public DateTime expiry_date { get; set; }
        public string image_file { get; set; }        
        public bool is_verified { get; set; }
        public bool is_complete { get; set; }
        public string status { get; set; }
        public string remarks { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_info_id { get; set; }
        public IFormFile FileUpload { get; set; }
    }
}
