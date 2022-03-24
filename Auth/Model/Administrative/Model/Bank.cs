using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 23/12/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    
    public class Bank
    {
        public Bank()
        {
            bank_id = 0;
            bank_name = "";
            bank_short_name = "";
            bank_swift_code = "";
            bank_email = "";
            bank_web_url = "";

            country_id = 0;
            division_id = 0;
            district_id = 0;
            city = "";
            ps_area = "";
            post_code = "";
            block = "";
            road_no = "";
            house_no = "";
            flat_no = "";
            address_note = "";
            remarks = "";
            is_bank = true;       
            is_local = true;
            //is_active = true;


        }
        [Key]
        public int bank_id { get; set; }
        public string bank_name { get; set; }
        public string bank_short_name { get; set; }
        public string bank_swift_code { get; set; }
        public string bank_email { get; set; }
        public string bank_web_url { get; set; }
        public int country_id { get; set; }
        public int division_id { get; set; }
        public int district_id { get; set; }
        public string city { get; set; }
        public string ps_area { get; set; }
        public string post_code { get; set; }
        public string block { get; set; }
        public string road_no { get; set; }
        public string house_no { get; set; }
        public string flat_no { get; set; }
        public string address_note { get; set; }
        public string remarks { get; set; }
        public bool is_bank { get; set; }
        public bool is_local { get; set; }

       // public bool is_active { get; set; }
 

    }
}
