using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Auth.Model
{
    public class ForgetPasswordRequest
    {
        public long user_info_id { get; set; }
        public int company_id { get; set; }
        public int company_corporate_id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string token { get; set; }
        public DateTime? tokenexpiedtime { get; set; }

        public DateTime? created_db_server_date_time { get; set; }
        public static ForgetPasswordRequest ConvertToResetModel(dynamic user)
        {

            var model = new ForgetPasswordRequest();
            model.user_info_id = user.user_info_id;
            model.company_corporate_id = user.company_corporate_id;
            model.company_id = user.company_id;
            model.email = user.email ?? "";
            model.token = user.token ?? 0;
            model.tokenexpiedtime = user.tokenexpiedtime ?? "";
            model.password = user.old_password ?? "";
   
            return model;
        }

    }
}
