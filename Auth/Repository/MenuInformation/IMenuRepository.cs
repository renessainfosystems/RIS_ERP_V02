using Auth.Model.Auth.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Menu
{
    public interface IMenuRepository
    {
        Task<dynamic> GetAllMenu();
        Task<dynamic> GetTreeMenuForSidebar();
        Task<dynamic> GetMenuByMenuId(int menuId);
        Task<dynamic> IUDMenu(Model.Auth.Model.Menu menu, int dbOperation);
        Task<dynamic> MenuSorting(int menuId, int parent_menu_id, bool is_upper_sorting);
        Task<dynamic> GetTreeMenu();
        Task<dynamic> MenuActivity(int menuId, int parent_menu_id);

        #region: Menu Event
        Task<dynamic> CreateMenuEvent(MenuEvent menuEvent, int dbOperation);
        Task<dynamic> DeleteMenuEvent(MenuEvent menuEvent, int dbOperation);
        #endregion
    }
}
