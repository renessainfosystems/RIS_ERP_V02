using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahid
/// Dated: 13/02/2022
/// </summary>
namespace Auth.Model.Party.Model
{
    [Table("Dealer_Location_Info", Schema = "Party")]
    public class DealerLocationInfo
    {
        [Key]
        public int dealer_location_info_id { get; set; }
        public int dealer_info_id { get; set; }
        public string dealer_location_info_code { get; set; }
        public string dealer_location_info_name { get; set; }
        public string dealer_location_info_short_name { get; set; }
        public string trade_license { get; set; }
        public DateTime? trade_license_date { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string emergency_contact { get; set; }
        public int country_id { get; set; }
        public int division_id { get; set; }
        public int district_id { get; set; }
        public int thana_id { get; set; }
        public string city { get; set; }
        public string post_code { get; set; }
        public string block { get; set; }
        public string road_no { get; set; }
        public string house_no { get; set; }
        public string flat_no { get; set; }
        public string address_note { get; set; }        
        public bool is_active { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_info_id { get; set; }
    }
}
