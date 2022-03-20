using System;
using static Utility.Auth.Enum.GlobalEnumList;

namespace Auth.Model.Auth.ViewModel
{
    public class AuthorizationRoleViewModel
    {

        public int AuthorizationRoleId { get; set; }
        public string AuthorizationRoleName { get; set; }
        public Boolean IsActive { get; set; }
        public string remarks { get; set; }

        public int MenuCount { get; set; }
        public int MenuId { get; set; }

        public bool IsPermissionExist { get; set; }
        public int EventEnumId { get; set; }

        public string EventEnumName { get; set; }
        public int MenuEventId { get; set; }

        public long UserInfoId { get; set; }

        public int AuthorizationRoleMenuEventsId { get; set; }
        public static AuthorizationRoleViewModel ConvertToModel(dynamic role)
        {

            var model = new AuthorizationRoleViewModel();
            model.AuthorizationRoleId = role.authorization_role_id;
            model.AuthorizationRoleName = role.authorization_role_name ?? "";
            model.IsActive = role.is_active ?? false;
            model.remarks = role.remarks ?? "";
            model.MenuCount = role.TotalCount ?? 0;
            return model;
        }

        public static AuthorizationRoleViewModel ConvertToMenuEventModel(dynamic role)
        {

            var model = new AuthorizationRoleViewModel();
            model.AuthorizationRoleId = role.authorization_role_id;
            model.MenuId = role.menu_id ?? "";
            model.IsPermissionExist = Convert.ToBoolean(role.IsPermissionExist) ?? false;
            model.EventEnumId = role.event_enum_id;
            model.MenuEventId = role.menu_event_id;
            model.EventEnumName= Enum.GetName(typeof(EnumAuthorizationEvent), role.event_enum_id);
            model.AuthorizationRoleMenuEventsId = role.authorization_role_menu_events_id;
            return model;
        }

        public static AuthorizationRoleViewModel ConvertToRoleModel(dynamic role)
        {

            var model = new AuthorizationRoleViewModel();
            model.AuthorizationRoleId = role.authorization_role_id;

            model.UserInfoId = role.user_info_id ?? 0;
            return model;
        }
    }
}
