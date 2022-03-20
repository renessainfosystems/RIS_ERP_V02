using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Model
{
    public class SidebarData
    {
        public int menuId { get; set; }
        public int menuParentId { get; set; }
        public string label { get; set; }
        public Boolean isActive { get; set; }
        public int sortingPriority { get; set; }
        public string icon { get; set; }
        public string routerLink { get; set; }
  
        public int permittedEvents { get; set; }
        public int totalEvents { get; set; }
    }
    public class DataObj
    {
        //public string label { get; set; }
        //public string icon { get; set; }
        //  public SidebarData label { get; set; }
        public int menuId { get; set; }
        public int menuParentId { get; set; }
        public string label { get; set; }
        public Boolean isActive { get; set; }
        public int sortingPriority { get; set; }
        public string icon { get; set; }
        public string routerLink { get; set; }

        public int permittedEvents { get; set; }
        public int totalEvents { get; set; }
        public IList<DataObj> items { get; set; }
    }
    public class SidebarRoot
    {

        public IList<DataObj> items { get; set; }

       
    }
}
