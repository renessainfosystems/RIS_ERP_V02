using Auth.Model.Auth.Model;
using Auth.Repository.UserMenuPermisssion;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Utility.Auth.Enum;

namespace Auth.Controllers.Auth
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserMenuPermissionController : ControllerBase
    {
        private IUserMenuPermisssionRepository _userMenuPermisssionRepository;
        private IConfiguration _config;

        public UserMenuPermissionController(IUserMenuPermisssionRepository userMenuPermisssionRepository, IConfiguration config)
        {
            _userMenuPermisssionRepository = userMenuPermisssionRepository;
            _config = config;
        }
        [HttpGet]
        public dynamic GetAuthorizationRole()
        {
            var data=_userMenuPermisssionRepository.GetAuthorizationRole().Result;
       
                
                var result = from r in data

                               select new { AuthorizationRoleId = r.AuthorizationRoleId, AuthorizationRoleName = r.AuthorizationRoleName };
            return result;
        }

        [HttpGet]
        public async Task<dynamic> GetRoleByUserId(int user_info_id)
        {

            return await _userMenuPermisssionRepository.GetRoleByUserId(user_info_id);
        }
        [HttpPost]
        public async Task<dynamic> AddUserWiseRole([FromBody] UserMenuEvent userMenuEvent, bool is_role_wise_event)
        {
            return await _userMenuPermisssionRepository.UserMenuPermission(userMenuEvent, true, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> AddUserMenuPermission([FromBody] UserMenuEvent userMenuEvent, bool is_role_wise_event)

        {
            return await _userMenuPermisssionRepository.UserMenuPermission(userMenuEvent, is_role_wise_event,(int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> RemoveUserMenuPermission([FromBody] UserMenuEvent userMenuEvent, bool is_role_wise_event)

        {
            return await _userMenuPermisssionRepository.UserMenuPermission(userMenuEvent,is_role_wise_event, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> GetMenuAndRoleWiseEvent(int menu_id, int authorization_role_id)
        {

            return await _userMenuPermisssionRepository.GetMenuAndRoleWiseEvent(menu_id, authorization_role_id);
        }

        [HttpGet]
        public async Task<dynamic> GetTreeMenuWithEvents(int authorization_role_id)
        {

            return await _userMenuPermisssionRepository.GetTreeMenuWithEvents(authorization_role_id);
        }
        [HttpPost]
        public async Task<dynamic> GetMenuAndRoleWiseEventByUserInfoId(int menu_id, int user_info_id)
        {

            return await _userMenuPermisssionRepository.GetMenuAndRoleWiseEventByUserInfoId(menu_id, user_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetTreeMenuWithEventsByUserInfoId(int user_info_id)
        {

            return await _userMenuPermisssionRepository.GetTreeMenuWithEventsByUserInfoId(user_info_id);
        }
    }
}
