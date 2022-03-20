using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Company_Ownership_Type", Schema = "Administrative")]
    public class CompanyOwnershipType
    {
        [Key]
        public int company_ownership_type_id { get; set; }
        public int company_id { get; set; }
        public int ownership_type_id { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
        public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public long updated_user_id { get; set; }
    }
}
