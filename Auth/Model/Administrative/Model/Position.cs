using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Position", Schema = "Administrative")]
    public class Position
    {
        [Key]
        public int position_id { get; set; }
        public string position_code { get; set; }
        public string position_name { get; set; }
        public string position_short_name { get; set; }
        public string  name_in_local_language { get; set; }
        public string remarks { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime? updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long? updated_user_id { get; set; }
        public int company_corporate_id { get; set; }
    }
}
