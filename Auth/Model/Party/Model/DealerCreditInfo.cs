using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahid
/// Dated: 10/04/2022
/// </summary>
namespace Auth.Model.Party.Model
{
    [Table("Dealer_Credit_Info", Schema = "Party")]
    public class DealerCreditInfo
    {
        [Key]
        public int dealer_credit_info_id { get; set; }
        public int dealer_info_id { get; set; }
        public int security_deposit_id { get; set; }
        public decimal amount { get; set; }
        public DateTime expiry_date { get; set; }
        public string attachment { get; set; }
        public string remarks { get; set; }
        public bool is_Approved { get; set; }
        public DateTime? approved_date { get; set; }
        public long approved_by_id { get; set; }
        public DateTime created_datetime { get; set; }
        public long created_user_info_id { get; set; }
        public IFormFile AttachmentFile { get; set; }


    }
}
