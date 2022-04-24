using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


/// <summary>
/// Created by Jahid
/// Dated: 24/04/2022
/// </summary>

namespace Auth.Model.Party.Model
{
    [Table("Dealer_Assessment", Schema = "Party")]
    public class DealerAssessment
    {
        [Key]
        public int dealer_assessment_id { get; set; }
        public int dealer_info_id { get; set; }
        public int criteria_type_id { get; set; }
        public int assessment_criteria_id { get; set; }
        public decimal automatic_score { get; set; }
        public decimal manual_score { get; set; }
        public decimal actual_score { get; set; }
        public bool is_assessment { get; set; }
        public bool is_approval { get; set; }
        public string comment { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_info_id { get; set; }

    }
    

}
