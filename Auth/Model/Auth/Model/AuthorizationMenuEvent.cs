using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Auth.Model
{
    public class AuthorizationMenuEvent
    {
        public int authorization_role_menu_events_id { get; set; }
        public int authorization_role_id { get; set; }

        public int menu_event_id { get; set; }

        public int menu_id { get; set; }
    }
}
