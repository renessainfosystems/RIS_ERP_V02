using Auth.DataAccess;
using Auth.Model.Auth.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Menu
{
    public class MenuRepository : IMenuRepository
    {
        protected MenuDataAccess _menuDataAccess { get; set; }

        //Data access initialize
        public MenuRepository(MenuDataAccess menuDataAccess)
        {
            _menuDataAccess = menuDataAccess;
        }
        public async Task<dynamic> GetAllMenu()
        {
            return await _menuDataAccess.GetAllAsync();
        }

        public async Task<dynamic> GetMenuByMenuId(int menuId)
        {
            return await _menuDataAccess.GetByIdAsync(menuId);            
        }

        public async Task<dynamic> IUDMenu(Model.Auth.Model.Menu menu, int dbOperation)
        {
            return await _menuDataAccess.IUDMenu(menu,dbOperation);
        }

        public async Task<dynamic> MenuSorting(int menuId, int parent_menu_id, bool is_upper_sorting)
        {
            return await _menuDataAccess.MenuSorting(menuId, parent_menu_id, is_upper_sorting);
        }
        public async Task<dynamic> GetTreeMenu()
        {
            return await _menuDataAccess.GetTreeMenu();
        }
        public async Task<dynamic> MenuActivity(int menuId, int parent_menu_id)
        {
            return await _menuDataAccess.MenuActivity( menuId,  parent_menu_id);
        }

        #region : Menu Events

        

        public async Task<dynamic> CreateMenuEvent(MenuEvent menuEvent, int dbOperation)
        {
            return await _menuDataAccess.CreateMenuEvent(menuEvent, dbOperation);
        }
        public async Task<dynamic> DeleteMenuEvent(MenuEvent menuEvent, int dbOperation)
        {
            return await _menuDataAccess.DeleteMenuEvent(menuEvent, dbOperation);
        }

        public async Task<dynamic> GetTreeMenuForSidebar()
        {
            return await _menuDataAccess.GetTreeMenuForSidebar();
        }
        #endregion

    }
}
