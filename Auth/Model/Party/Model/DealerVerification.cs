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
    //[Table("Dealer_Verification", Schema = "Party")]
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

        }
        public int dealer_info_id { get; set; }
        public int department_id { get; set; }
        public int employee_id { get; set; }
    }

    //public class DealerAssignSession
    //{

    //    //public int dealer_verification_id { get; set; }
    //    public int dealer_info_id { get; set; }
    //    //public int department_id { get; set; }
    //    //public int employee_id { get; set; }
    //    //public string remarks { get; set; }
    //    //public bool is_verified { get; set; }
    //    //public DateTime? verified_date { get; set; }
    //    //public long verified_user_id { get; set; }
    //    //public DateTime created_datetime { get; set; }
    //    //public long created_user_info_id { get; set; }
    //}
}


public class SupplierBusiness
{

    [Key]
    public int supplier_id { get; set; }
    public int business_activities_enum_id { get; set; }
    public int management_staff_no { get; set; }
    public int nonmanagement_staff_no { get; set; }
    public int permanent_worker_no { get; set; }
    public int casual_worker_no { get; set; }

    public List<SubSectorSession> subSectorSession { get; set; }

    public List<EcommerceSession> ecommerceSession { get; set; }
}
public class SubSectorSession
{
    public SubSectorSession()
    {
        supplier_id = 0;
        industry_sub_sector_id = 0;

    }
    public int supplier_id { get; set; }
    public int industry_sub_sector_id { get; set; }
}

public class EcommerceSession
{
    public EcommerceSession()
    {
        supplier_id = 0;
        ecommerce_platforms_id = 0;
    }
    public int supplier_id { get; set; }
    public int ecommerce_platforms_id { get; set; }
}