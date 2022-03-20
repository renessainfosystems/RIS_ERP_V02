using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace Auth.Model.Auth.Model
{
    [Table("Menu_Event", Schema = "Auth")]
    public class MenuEvent
    {
        
        public MenuEvent()
        {

            menu_event_id = 0;
            menu_id = 0;
            event_enum_id = 0;
            event_enum_name = "";
        }
        [Key]
        public int menu_event_id { get; set; }
        public int menu_id { get; set; }
        public int event_enum_id { get; set; }
        public string event_enum_name { get; set; }
    }
}
