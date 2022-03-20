using Auth.DataAccess;
using Auth.Model.Auth.Model;
using System.Threading.Tasks;

namespace Auth.Repository.AuthorizationRole
{
    public class AuthorizationRoleRepository : IAuthorizationRoleRepository
    {
        protected AuthorizationRoleDataAccess _authorizationRoleDataAccess { get; set; }

        //Data access initialize
        public  AuthorizationRoleRepository(AuthorizationRoleDataAccess authorizationRoleDataAccess)
        {
            _authorizationRoleDataAccess = authorizationRoleDataAccess;
        }

        public async Task<dynamic> GetAllRoles()
        {
            return  await _authorizationRoleDataAccess.GetAllRoles();
        }

        public async Task<dynamic> GetRoleById(int authorization_role_id)
        {
            return await _authorizationRoleDataAccess.GetRoleById(authorization_role_id);
        }

        public async Task<dynamic> IUD_AuthorizationRole(Model.Auth.Model.AuthorizationRole authorizationRole, int dbOperation)

        {
            return await _authorizationRoleDataAccess.IUD_AuthorizationRole(authorizationRole, dbOperation);
        }

        public async Task<dynamic> GetMenuAndRoleWiseEvent(int menu_id, int authorization_role_id)
        {
            return await _authorizationRoleDataAccess.GetMenuAndRoleWiseEvent(menu_id, authorization_role_id);
        }

        public async Task<dynamic> AuthorizationPermission(AuthorizationMenuEvent authorizationMenuEvent, int dbOperaation)
        {
            return await _authorizationRoleDataAccess.AuthorizationPermission(authorizationMenuEvent, dbOperaation);
        }

        public async Task<dynamic> AuthorizationRoleActivity(int authorization_role_id)
        {
            return await _authorizationRoleDataAccess.AuthorizationRoleActivity(authorization_role_id);
        
        }

        public async Task<dynamic> GetTreeMenuWithEvents(int authorization_role_id)
        {
            return await _authorizationRoleDataAccess.GetTreeMenuWithEvents(authorization_role_id);
        }
      

    }
}
