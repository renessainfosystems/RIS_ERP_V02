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

        public static OrganogramDetailViewModel ConvertToModel(dynamic obj)
        {
            var model = new OrganogramDetailViewModel();
            model.organogram_id = obj.organogram_id ?? 0;
            model.position_id = obj.position_id ?? 0;
            model.organogram_detail_id = obj.organogram_detail_id ?? 0;
            model.salary_head_id = obj.salary_head_id ?? 0;
            model.budget = obj.budget ?? "";
            model.manpower = obj.manpower ?? "";
            model.code = obj.code ?? "";
            model.Experience = obj.Experience ?? "";           
            model.Activity = obj.Activity ?? "";           
            model.Position = obj.Position ?? "";           
            model.Increment = obj.Increment ?? "";           
            model.position_name = obj.position_name ?? "";  
            model.is_open = obj.is_open;  
            model.min_no_of_manpower = obj.min_no_of_manpower;  
            model.max_no_of_manpower = obj.max_no_of_manpower;  
            model.min_budget = obj.min_budget;  
            model.max_budget = obj.max_budget;  
            model.increment_percentage_yearly = obj.increment_percentage_yearly;  
            model.is_active = obj.is_active;  
            model.min_year_of_experience = obj.min_year_of_experience;  
            model.max_year_of_experience = obj.max_year_of_experience;  
            model.is_gross = obj.is_gross;  
            return model;
        }
    }
}
