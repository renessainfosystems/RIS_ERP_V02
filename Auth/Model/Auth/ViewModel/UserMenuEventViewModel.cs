using System;
using static Utility.Auth.Enum.GlobalEnumList;

namespace Auth.Model.Auth.ViewModel
{
    public class UserMenuEventViewModel
    {
        public int UserMenuAuthorizationEventId { get; set; }
        public long UserInfoId { get; set; }
        public int MenuEventId { get; set; }
        public int MenuId { get; set; }
        public int UserGroupId { get; set; }
        public int AuthorizationRoleId { get; set; }
        public int IsActive { get; set; }
        public bool IsPermissionExist { get; set; }
        public int EventEnumId { get; set; }

        public string EventEnumName { get; set; }
        public static UserMenuEventViewModel ConvertToModel(dynamic menuEvent)
        {

            var model = new UserMenuEventViewModel();
            model.UserMenuAuthorizationEventId = menuEvent.user_menuAuthorization_event_id;
            model.UserInfoId = menuEvent.user_info_id;
            model.MenuId = menuEvent.menu_id;
            model.MenuEventId = menuEvent.menu_event_id ?? 0;
            model.UserGroupId = menuEvent.user_group_id ?? 0;
            model.IsActive = menuEvent.is_active ?? 0;
            return model;
        }
        public static UserMenuEventViewModel ConvertToMenuEventModel(dynamic role)
        {

            var model = new UserMenuEventViewModel();
            model.MenuId = role.menu_id ?? "";
            model.IsPermissionExist = Convert.ToBoolean(role.IsPermissionExist) ?? false;
            model.EventEnumId = role.event_enum_id;
            model.MenuEventId = role.menu_event_id;
            model.UserInfoId = role.user_info_id;
            model.EventEnumName = Enum.GetName(typeof(EnumAuthorizationEvent), role.event_enum_id);
            model.UserMenuAuthorizationEventId = role.authorization_role_menu_events_id;
            return model;
        }
    }
}
