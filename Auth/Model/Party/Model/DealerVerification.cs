using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;




/// <summary>
/// Created by Jahid
/// Dated: 10/04/2022
/// </summary>
namespace Auth.Model.Party.Model
{
    public class DealerVerification
    {
        [Key]
        public int dealer_verification_id { get; set; }
        public List<DealerAssignSession> DealerAssignSession { get; set; }

    }

    public class DealerAssignSession
    {
        public DealerAssignSession()
        {
            dealer_info_id = 0;
            department_id = 0;
            employee_id = 0;
            remarks = null;
            is_verified = false;
            verified_date = null;
            verified_user_id = 0;

        }
        public int dealer_info_id { get; set; }
        public int department_id { get; set; }
        public int employee_id { get; set; }
        public string remarks { get; set; }
        public bool is_verified { get; set; }
        public DateTime? verified_date { get; set; }
        public long verified_user_id { get; set; }
    }
       
}

