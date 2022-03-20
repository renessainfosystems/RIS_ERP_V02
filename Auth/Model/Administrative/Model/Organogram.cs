using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Organogram", Schema = "Administrative")]
    public class Organogram
    {
        [Key]
        public int organogram_id { get; set; }
        public string organogram_code { get; set; }
        public int company_group_id { get; set; }
        public int company_id { get; set; }
        public int location_id { get; set; }
        public int department_id { get; set; }
        public int parent_id { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long updated_user_id { get; set; }
        public int company_corporate_id { get; set; }
    }
}
