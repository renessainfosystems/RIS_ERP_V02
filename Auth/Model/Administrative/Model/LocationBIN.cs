using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Location_BIN", Schema = "Administrative")]
    public class LocationBIN
    {
        [Key]
        public string location_bin_id { get; set; }
        public int location_id { get; set; }
        public DateTime bin_reg_date { get; set; }
        public DateTime bin_expire_date { get; set; }
        public string bin_file_path { get; set; }
        public int vat_circle_id { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long updated_user_id { get; set; }
    }
}
