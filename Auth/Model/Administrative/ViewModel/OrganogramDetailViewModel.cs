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

        public static OrganogramDetailViewModel ConvertToModel(dynamic user)
        {
            var model = new OrganogramDetailViewModel();
            model.organogram_id = user.organogram_id ?? 0;
            model.position_id = user.position_id ?? 0;
            model.organogram_detail_id = user.organogram_detail_id ?? 0;
            model.budget = user.budget ?? "";
            model.manpower = user.manpower ?? "";
            model.code = user.code ?? "";
            model.Experience = user.Experience ?? "";           
            model.Activity = user.Activity ?? "";           
            model.Position = user.Position ?? "";           
            model.Increment = user.Increment ?? "";           
            model.position_name = user.position_name ?? "";  
            return model;
        }
    }
}
