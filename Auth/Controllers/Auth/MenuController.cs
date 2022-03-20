
using Auth.Model.Auth.Model;
using Auth.Repository.Menu;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Utility.Auth.Enum;

namespace Auth.Controllers.Auth
{

    [Route("api/[controller]/[action]")]
    [ApiController]
 
    public class MenuController : ControllerBase
    {
        private IMenuRepository _menuRepository;
        private IConfiguration _config;
        private readonly IHostEnvironment _env;
        public MenuController(IMenuRepository menuRepository, IConfiguration config, IHostEnvironment env)
        {
            _menuRepository = menuRepository;
            _config = config;
            _env = env;
        }


     
        [HttpPost]
        public async Task<dynamic> Create([FromBody] Menu menu)

        {
            return await _menuRepository.IUDMenu(menu, (int)GlobalEnumList.DBOperation.Create);
        }

    
        [HttpPut]
        public async Task<dynamic> Update(Menu menu)
        {
           
            return await _menuRepository.IUDMenu(menu, (int)GlobalEnumList.DBOperation.Update);
        }
        
        [HttpPost]
        public async Task<dynamic> Delete(Menu menuModel)
        {
           return await _menuRepository.IUDMenu(menuModel, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpPost]
        public async Task<dynamic> MenuActivity(int menu_id, int menu_parent_id)
        {
            return await _menuRepository.MenuActivity(menu_id, menu_parent_id);

        }

        [HttpGet]
        public async Task<dynamic>  GetAllMenu()
        {
             
            return await _menuRepository.GetAllMenu();
        }
        [HttpGet]
        public async Task<dynamic> GetTreeMenuForSidebar()
        {

            return await _menuRepository.GetTreeMenuForSidebar();
        }
        
        [HttpPost]
        public async Task<dynamic> GetMenuByMenuId(int menuId)
        {

          return await _menuRepository.GetMenuByMenuId(menuId);
        }

        [HttpPost, DisableRequestSizeLimit]
 
        public  IActionResult Upload()
        {
            try
            {
           
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Assets", "MenuIcons");
                var directoryName = Directory.GetCurrentDirectory();

                // var pathToSave = Path.Combine(Directory.GetCurrentDirectory().Trim(), folderName);
           
                var pathToSave  = directoryName.Replace("\\Auth", "\\WebApp\\src\\assets\\images\\menuicon");
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                   
                    return Ok(new { dbPath = dbPath.Replace(@"\\", @"\") });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost]
        public async Task<dynamic> MenuSorting(int menu_id, int menu_parent_id, bool is_upper_sorting)
        {
            
           return await _menuRepository.MenuSorting(menu_id, menu_parent_id, is_upper_sorting);
          
        }

        [HttpGet]
        public async Task<dynamic> GetMenuTree()
        {

            return await _menuRepository.GetTreeMenu();
        }

        #region: Menu Events
        [HttpPost]
        public async Task<dynamic> CreateMenuEvent([FromBody] MenuEvent menuEvent)
        {

         return await _menuRepository.CreateMenuEvent(menuEvent, (int)GlobalEnumList.DBOperation.Create);
        
        }

        [HttpPost]
        public async Task <dynamic> DeleteMenuEvent([FromBody] MenuEvent menuEvent)
        {
            
            return (await _menuRepository.DeleteMenuEvent(menuEvent, (int)GlobalEnumList.DBOperation.Delete));
  
          
        }
        #endregion
    }
}
