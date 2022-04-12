using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Administrative.ViewModel
{
    public class OrganogramDetailViewModel
    {
        public string code { get; set; }
        public string position_name { get; set; }
        public string manpower { get; set; }
        public string budget { get; set; }
        public string Increment { get; set; }
        public string Position { get; set; }
        public string Activity { get; set; }
        public string Experience { get; set; }        
        public int organogram_detail_id { get; set; }
        public int position_id { get; set; }
        public int organogram_id { get; set; }
        public bool is_open { get; set; }
        public int min_no_of_manpower { get; set; }
        public int max_no_of_manpower { get; set; }
        public decimal min_budget { get; set; }
        public decimal max_budget { get; set; }
        public decimal increment_percentage_yearly { get; set; }
        public bool is_active { get; set; }
        public bool is_gross { get; set; }
        public int min_year_of_experience { get; set; }
        public int max_year_of_experience { get; set; }
        public int? salary_head_id { get; set; }

        public static OrganogramDetailViewModel ConvertToModel(dynamic user)
        {
            var model = new OrganogramDetailViewModel();
            model.organogram_id = user.organogram_id ?? 0;
            model.position_id = user.position_id ?? 0;
            model.organogram_detail_id = user.organogram_detail_id ?? 0;
            model.salary_head_id = user.salary_head_id ?? 0;
            model.budget = user.budget ?? "";
            model.manpower = user.manpower ?? "";
            model.code = user.code ?? "";
            model.Experience = user.Experience ?? "";           
            model.Activity = user.Activity ?? "";           
            model.Position = user.Position ?? "";           
            model.Increment = user.Increment ?? "";           
            model.position_name = user.position_name ?? "";  
            model.is_open = user.is_open;  
            model.min_no_of_manpower = user.min_no_of_manpower;  
            model.max_no_of_manpower = user.max_no_of_manpower;  
            model.min_budget = user.min_budget;  
            model.max_budget = user.max_budget;  
            model.increment_percentage_yearly = user.increment_percentage_yearly;  
            model.is_active = user.is_active;  
            model.min_year_of_experience = user.min_year_of_experience;  
            model.max_year_of_experience = user.max_year_of_experience;  
            model.is_gross = user.is_gross;  
            return model;
        }
    }
}
