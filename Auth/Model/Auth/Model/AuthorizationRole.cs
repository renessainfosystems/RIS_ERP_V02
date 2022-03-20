using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Auth.Model
{
    public class AuthorizationRole
    {
        public AuthorizationRole()
        {

            authorization_role_id = 0;
            authorization_role_name = "";
            is_active = true;
            remarks = "";
            updated_datetime = DateTime.Now;
            created_datetime = DateTime.Now;

        }
       
        public int authorization_role_id { get; set; }
        public string authorization_role_name { get; set; }
        public bool is_active { get; set; }
        public string remarks { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
        public long created_user_info_id { get; set; }
        public long updated_user_info_id { get; set; }
        public int company_corporate_id { get; set; }
        public int company_id { get; set; }
    }
}
