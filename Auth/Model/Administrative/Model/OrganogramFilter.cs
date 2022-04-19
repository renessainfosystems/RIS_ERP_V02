using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Administrative.Model
{
    public class OrganogramFilter
    {
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public OrganogramFilter()
        {

            company_group_id = (int)_httpContextAccessor.HttpContext.Items["company_group_id"];
            company_id = (int)_httpContextAccessor.HttpContext.Items["company_id"]; ;
            location_id = 0;
            department_id = 0;
            position_id = 0;
        }
        public int company_group_id { get; set; }
        public int company_id { get; set; }
        public int location_id { get; set; }
        public int department_id { get; set; }
        public int position_id  { get; set; }
    }
}
