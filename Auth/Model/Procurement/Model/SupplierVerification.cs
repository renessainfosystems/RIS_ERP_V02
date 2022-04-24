using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


/// <summary>
/// Created by Adnan
/// Dated: 10/04/2022
/// </summary>

namespace Auth.Model.Procurement.Model
{
    public class SupplierVerification
    {
        [Key]
        public int supplier_verification_id { get; set; }
        public List<SupplierAssignSession> SupplierAssignSession { get; set; }

    }

    public class SupplierAssignSession
    {
        public SupplierAssignSession()
        {
            supplier_id = 0;
            department_id = 0;
            employee_id = 0;
            remarks = null;
            is_verified = false;
            verified_date = null;
            verified_user_id = 0;

        }
        public int supplier_id { get; set; }
        public int department_id { get; set; }
        public int employee_id { get; set; }
        public string remarks { get; set; }
        public bool is_verified { get; set; }
        public DateTime? verified_date { get; set; }
        public long verified_user_id { get; set; }
    }
}
