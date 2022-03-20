using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Auth.Model
{
    public class UserMenuEvent
    {
        public UserMenuEvent()
        {
            user_info_id = 0;
            user_menu_authorization_event_id = 0;
            menu_event_id = 0;
            menu_id = 0;
            is_active = true;
            user_group_id = 0;
            authorization_role_id = 0;
            updated_datetime = DateTime.Now;
            created_datetime = DateTime.Now;

        }
        public int user_menu_authorization_event_id { get; set; }
        public int user_info_id { get; set; }
        public int menu_event_id { get; set; }
        public int menu_id { get; set; }
        public int user_group_id { get; set; }
        public int authorization_role_id { get; set; }
        public bool is_active { get; set; }
        public DateTime created_datetime { get; set; }
        public DateTime updated_datetime { get; set; }
    }
}
