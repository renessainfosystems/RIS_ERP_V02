using Auth.Model.Auth.Model;
using Auth.Repository.AuthorizationRole;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Utility.Auth.Enum;

namespace Auth.Controllers.Auth
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthorizationRole : ControllerBase
    {
        private IConfiguration _config;
        private IAuthorizationRoleRepository _authorizationRoleRepository;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        //Intialize
        public AuthorizationRole(IConfiguration config, IAuthorizationRoleRepository authorizationRoleRepository)
        {
            _config = config;
            _authorizationRoleRepository = authorizationRoleRepository;
        }
        [HttpPost]
        public async Task<dynamic> Create([FromBody] Model.Auth.Model.AuthorizationRole authorizationRole)

        {
            return await _authorizationRoleRepository.IUD_AuthorizationRole( authorizationRole, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPut]
        public async Task<dynamic> Update(Model.Auth.Model.AuthorizationRole authorizationRole)
        {

            return await _authorizationRoleRepository.IUD_AuthorizationRole(authorizationRole, (int)GlobalEnumList.DBOperation.Update);
        }
        [HttpPost]
        public async Task<dynamic> AddPermission([FromBody] AuthorizationMenuEvent authorizationMenuEvent)

        {
            return await _authorizationRoleRepository.AuthorizationPermission(authorizationMenuEvent, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> RemovePermission([FromBody] AuthorizationMenuEvent authorizationMenuEvent)

        {
            return await _authorizationRoleRepository.AuthorizationPermission(authorizationMenuEvent, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> Delete(Model.Auth.Model.AuthorizationRole authorizationRole)
        {
            return await _authorizationRoleRepository.IUD_AuthorizationRole(authorizationRole, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllRoles()
        {

            return await _authorizationRoleRepository.GetAllRoles();
        }

        [HttpPost]
        public async Task<dynamic> GetRoleById(int authorization_role_id)
        {

            return await _authorizationRoleRepository.GetRoleById(authorization_role_id);
        }

     

        [HttpPost]
        public async Task<dynamic> GetMenuAndRoleWiseEvent(int menu_id, int authorization_role_id)
        {

            return await _authorizationRoleRepository.GetMenuAndRoleWiseEvent(menu_id, authorization_role_id);
        }
        
        [HttpPost]
        public async Task<dynamic> AuthorizationRoleActivity( int authorization_role_id)
        {

            return await _authorizationRoleRepository.AuthorizationRoleActivity(authorization_role_id);
        }
        [HttpGet]
        public async Task<dynamic> GetTreeMenuWithEvents(int authorization_role_id)
        {

            return await _authorizationRoleRepository.GetTreeMenuWithEvents(authorization_role_id);
        }
    }
}
