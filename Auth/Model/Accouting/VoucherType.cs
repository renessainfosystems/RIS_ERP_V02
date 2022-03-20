using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Masum
/// Dated: 1/1/2022
/// </summary>
namespace Auth.Model.DomainModel
{
    [Table("Accounting_Voucher_Type", Schema = "Accounting")]
    public class VoucherType
    {
        [Key]
        public int accounting_voucher_type_id { get; set; }
        public string code { get; set; }
        public string voucher_type { get; set; }
        public long created_user_id { get; set; }
        public long? updated_user_id { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime? updated_datetime { get; set; }
    }
}
