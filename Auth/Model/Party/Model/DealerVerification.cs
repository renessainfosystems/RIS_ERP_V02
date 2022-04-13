using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahid
/// Dated: 10/04/2022
/// </summary>
namespace Auth.Model.Party.Model
{
    [Table("Dealer_Verification", Schema = "Party")]
    public class DealerVerification
    {
        [Key]
        public int dealer_verification_id { get; set; }
        public int dealer_info_id { get; set; }
        public int department_id { get; set; }
        public int employee_id { get; set; }
        public string remarks { get; set; }
        public bool is_varified { get; set; }
        public DateTime? varified_date { get; set; }
        public long varified_user_id { get; set; }
        public DateTime created_datetime { get; set; }
        public long created_user_info_id { get; set; }

    }
}
