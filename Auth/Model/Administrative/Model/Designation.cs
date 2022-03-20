using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Designation", Schema = "Administrative")]
    public class Designation
    {
        [Key]
        public int designation_id { get; set; }
        public string designation_code { get; set; }
        public string designation_name { get; set; }
        public string designation_short_name { get; set; }
        public string name_in_local_language { get; set; }
        public string remarks { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime? updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long? updated_user_id { get; set; }
        public int company_corporate_id { get; set; }
    }
}
