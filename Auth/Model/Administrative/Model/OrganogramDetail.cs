using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Organogram_Detail", Schema = "Administrative")]
    public class OrganogramDetail
    {
        [Key]
        public int organogram_detail_id { get; set; }
        public int organogram_id { get; set; }
        public string code { get; set; }
        public int position_id { get; set; }        
        public int? min_no_of_manpower { get; set; }
        public int? max_no_of_manpower { get; set; }
        public decimal? min_budget { get; set; }
        public decimal? max_budget { get; set; }
        public int? min_year_of_experience { get; set; }
        public int? max_year_of_experience { get; set; }
        public bool is_open { get; set; }       
        public decimal? increment_percentage_yearly { get; set; }
        //public byte increment_on_enum_id { get; set; }
        //public DateTime created_datetime { get; set; }
        //public DateTime updated_datetime { get; set; }
        public bool is_gross { get; set; }
        public int? salary_head_id { get; set; }
        public bool? is_active { get; set; }
        public int days_of_confirmation { get; set; }       
        public long created_user_id { get; set; }
        //public long updated_user_id { get; set; }
    }
}
