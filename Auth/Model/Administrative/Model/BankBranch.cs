using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 27/12/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Bank_Branch", Schema = "Procurement")]
    public class BankBranch
    {

        public BankBranch()
        {
            bank_branch_id = 0;
            bank_branch_name = "";
            bank_branch_short_name = "";
            bank_branch_routing = "";
            bank_id = 0;
            bank_branch_contact_number = "";
            bank_branch_email = "";

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
            is_branch = false;
            //is_active = true;


        }

        [Key]
        public int bank_branch_id { get; set; }
        public string bank_branch_name { get; set; }
        public string bank_branch_short_name { get; set; }
        public string bank_branch_routing { get; set; }
        public int bank_id { get; set; }
        public string bank_branch_contact_number { get; set; }
        public string bank_branch_email { get; set; }
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
        public bool is_branch { get; set; }
        //public bool is_active { get; set; }
    }
}
