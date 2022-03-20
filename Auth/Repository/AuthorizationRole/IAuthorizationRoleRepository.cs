using Auth.Model.Auth.Model;
using System.Threading.Tasks;
namespace Auth.Repository.AuthorizationRole
{
    public interface IAuthorizationRoleRepository
    {
        Task<dynamic> GetAllRoles();
        Task<dynamic> GetRoleById(int authorization_role_id);


        Task<dynamic> IUD_AuthorizationRole(Model.Auth.Model.AuthorizationRole authorizationRole, int dbOperation);
        Task<dynamic> GetMenuAndRoleWiseEvent(int menu_id, int authorization_role_id);
        Task<dynamic> AuthorizationPermission(AuthorizationMenuEvent authorizationMenuEvent,int dbOperaation);
        Task<dynamic> AuthorizationRoleActivity(int authorization_role_id);
        Task<dynamic> GetTreeMenuWithEvents(int authorization_role_id);
        //Task<dynamic> IUD_AuthorizationRole(Model.Auth.Model.AuthorizationRole authorizationRole, int delete);
    }
}
