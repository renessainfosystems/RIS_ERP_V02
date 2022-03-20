using Auth.Model.Auth.Model;
using Auth.Model.DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.UserMenuPermisssion
{
    public interface IUserMenuPermisssionRepository
    {
        Task<IEnumerable<dynamic>> GetAuthorizationRole();
        Task<dynamic> GetRoleByUserId(int user_info_id);
        Task<dynamic> GetMenuAndRoleWiseEvent(int menu_id, int authorization_role_id);
        Task<dynamic> UserMenuPermission(UserMenuEvent userMenuEvent, bool is_role_wise_event, int dbOperaation);
        Task<dynamic> GetTreeMenuWithEvents(int authorization_role_id);
        Task<dynamic> GetMenuAndRoleWiseEventByUserInfoId(int menu_id, int user_info_id);
        Task<dynamic> GetTreeMenuWithEventsByUserInfoId(int user_info_id);

    }
}
