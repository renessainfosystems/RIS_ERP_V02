using Auth.DataAccess;
using Auth.Model.Auth.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auth.Repository.UserMenuPermisssion
{
    public class UserMenuPermisssionRepository : IUserMenuPermisssionRepository
    {
        protected UserMenuPermisssionDataAccess _userMenuPermisssionDataAccess { get; set; }
        public UserMenuPermisssionRepository(UserMenuPermisssionDataAccess userMenuPermisssionDataAccess)
        {
            _userMenuPermisssionDataAccess = userMenuPermisssionDataAccess;
        }
        public async Task<IEnumerable<dynamic>> GetAuthorizationRole()
        {
            return await _userMenuPermisssionDataAccess.GetAllActiveRoles();
        }

        public Task<dynamic> GetMenuAndRoleWiseEvent(int menu_id, int authorization_role_id)
        {
            return  _userMenuPermisssionDataAccess.GetMenuAndRoleWiseEvent(menu_id,authorization_role_id);
        }

        public Task<dynamic> UserMenuPermission(UserMenuEvent userMenuEvent, bool is_role_wise_event, int dbOperaation)
        {
            return _userMenuPermisssionDataAccess.UserMenuPermission(userMenuEvent, is_role_wise_event, dbOperaation);
        }

        public Task<dynamic> GetTreeMenuWithEvents(int authorization_role_id)
        {
            return _userMenuPermisssionDataAccess.GetTreeMenuWithEvents(authorization_role_id);
        }

        public Task<dynamic> GetMenuAndRoleWiseEventByUserInfoId(int menu_id, int user_info_id)
        {
           return _userMenuPermisssionDataAccess.GetMenuAndRoleWiseEventByUserInfoId(menu_id, user_info_id);
        }

        public Task<dynamic> GetTreeMenuWithEventsByUserInfoId(int user_info_id)
        {
           return  _userMenuPermisssionDataAccess.GetTreeMenuWithEventsByUserInfoId(user_info_id);
        }

        public async Task<dynamic> GetRoleByUserId(int user_info_id)
        {
            return await _userMenuPermisssionDataAccess.GetRoleByUserId(user_info_id);
        }
    }
}
