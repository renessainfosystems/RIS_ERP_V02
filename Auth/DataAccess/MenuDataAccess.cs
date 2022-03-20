using Auth.Model.Auth.Model;
using Auth.Model.Auth.ViewModel;
using Auth.Service;
using Auth.Utility;
using Auth.Utility.Model;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Utility.Auth.Enum;
using static Auth.Utility.CommonMessage;
using static Utility.Auth.Enum.GlobalEnumList;

namespace Auth.DataAccess
{
    public class MenuDataAccess
    {
        public IConfiguration _config;

        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public MenuDataAccess(IConfiguration configuration, ApplicationDBContext context, IDbConnection dbConnection)
        {
            _config = configuration;
            _dbConnection = dbConnection;
            _context = context;
        }
        //Parameter Binding
        public DynamicParameters MenuParameterBinding(Menu menuModel, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_menu_id", menuModel.menu_id, DbType.Int32);
                parameters.Add("@param_menu_parent_id", menuModel.menu_parentid, DbType.Int32);
                parameters.Add("@param_menu_name", menuModel.menu_name, DbType.String);
                parameters.Add("@param_is_active", menuModel.is_active, DbType.Boolean);
                parameters.Add("@param_sorting_priority", menuModel.sorting_priority, DbType.Int32);
                parameters.Add("@param_menu_icon_path", menuModel.menu_icon_path, DbType.String);
                parameters.Add("@param_menu_routing_path", menuModel.menu_routing_path, DbType.String);
                parameters.Add("@param_calling_parameter_value", menuModel.calling_parameter_value, DbType.String);
                parameters.Add("@param_calling_parameter_type", menuModel.calling_parameter_type, DbType.String);
                parameters.Add("@param_created_datetime", menuModel.created_datetime, DbType.DateTime);
                parameters.Add("@param_updated_datetime", menuModel.updated_datetime, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_updated_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_menu_id", menuModel.menu_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters MenuEventParameterBinding(MenuEvent menuEvent, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters menuEventparameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                menuEventparameters.Add("@param_menu_event_id", menuEvent.menu_event_id, DbType.Int32);
                menuEventparameters.Add("@param_menu_id", menuEvent.menu_id, DbType.Int32);
                menuEventparameters.Add("@param_event_id", menuEvent.event_enum_id, DbType.Int32);
                menuEventparameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                menuEventparameters.Add("@param_menu_event_id", menuEvent.menu_event_id, DbType.Int32);
                menuEventparameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return menuEventparameters;
        }


        //User Insert Update Delete
        public async Task<dynamic> IUDMenu(Menu menuModel, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = MenuParameterBinding(menuModel, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {


                if (dbOperation == 3)
                {
                    dynamic data = await _dbConnection.QueryAsync("[Auth].[SP_Menu_Delete]", parameters, commandType: CommandType.StoredProcedure);
                    message = CommonMessage.SetSuccessMessage(CommonDeleteMessage);
                }
                else
                {
                    dynamic data = await _dbConnection.QueryAsync<dynamic>("[Auth].[SP_Menu_IUD]", parameters, commandType: CommandType.StoredProcedure);

                    if (data.Count > 0)
                    {
                        List<dynamic> dataList = data;
                        result = (from dr in dataList select MenuViewModel.ConvertToModel(dr)).ToList();
                    }
                    else
                    {
                        return message = CommonMessage.SetErrorMessage(CommonErrorMessage);
                    }

                    // Insert Menu events
                    if (menuModel.menu_events.Count > 0 && result[0].MenuId > 0 && dbOperation == (int)DBOperation.Create)
                    {
                        foreach (MenuEvent item in menuModel.menu_events)
                        {
                            item.menu_id = result[0].MenuId;
                            var menuEventParameters = MenuEventParameterBinding(item, dbOperation);
                            dynamic eventData = await _dbConnection.QueryAsync<dynamic>("[Auth].[SP_Menu_Event_IUD]", menuEventParameters, commandType: CommandType.StoredProcedure);
                            // if (eventData.Count > 0)
                            // result.menuEvents = (eventData);
                        }
                    }
                    if (data.Count > 0 && dbOperation == (int)DBOperation.Create)
                    {
                        message = CommonMessage.SetSuccessMessage(CommonSaveMessage);
                    }
                    if (data.Count > 0 && dbOperation == (int)DBOperation.Update)
                    {
                        message = CommonMessage.SetSuccessMessage(CommonUpdateMessage);
                    }
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                //DB connection dispose with db connection close
                _dbConnection.Dispose();

            }



            return message;
        }


        //Delete Menu Events

        public async Task<dynamic> CreateMenuEvent(MenuEvent menuEvent, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = MenuEventParameterBinding(menuEvent, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Auth].[SP_Menu_Event_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);


            }
            finally
            {
                //DB connection dispose with db connection close
                _dbConnection.Dispose();
            }

            return (message);
        }


        public async Task<dynamic> DeleteMenuEvent(MenuEvent menuEvent, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = MenuEventParameterBinding(menuEvent, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Auth].[SP_Menu_Event_IUD]", parameters, commandType: CommandType.StoredProcedure);


                if (dbOperation == (int)DBOperation.Delete)
                {

                    message = CommonMessage.SetSuccessMessage(CommonDeleteMessage);

                }


            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);


            }
            finally
            {
                //DB connection dispose with db connection close
                _dbConnection.Dispose();

            }

            return (message);
        }


        public async Task<dynamic> GetAllAsync()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_user_info_id", currentUserInfoId);
                //var sql = "SELECT menu_id,menu_parentid,menu_name,is_active,menu_icon_path,menu_routing_path,calling_parameter_value,calling_parameter_type " +
                //    "FROM [Auth].[Menu] WHERE menu_parentid!=0 ORDER BY menu_parentid,sorting_priority ASC";
                dynamic data = await _dbConnection.QueryAsync("[Auth].[SP_Role_Wise_Menu_For_Sidebar]", parameters, commandType: CommandType.StoredProcedure);


                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select MenuViewModel.ConvertToModel(dr)).ToList();

                    //  message = CommonMessage.SetSuccessMessage(CommonSaveMessage,result);

                }

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> GetByIdAsync(int menuId)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT menu_id,menu_parentid,menu_name,is_active,menu_icon_path,menu_routing_path,calling_parameter_value,calling_parameter_type " +
                    "FROM [Auth].[Menu] WHERE  menu_id=@menuId ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@menuId", menuId);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {


                    result = MenuViewModel.ConvertToModel(data);
                    var menueventSql = "SELECT menu_event_id,menu_id,event_enum_id FROM [Auth].Menu_Event WHERE menu_id = @menuId";

                    DynamicParameters parameter = new DynamicParameters();
                    parameter.Add("@menuId", menuId);
                    dynamic menuEventData = await _dbConnection.QueryAsync<MenuEvent>(menueventSql, parameter);


                    if (menuEventData != null)
                        result.menuEvents = menuEventData;
                    for (int i = 0; i < result.menuEvents.Count; i++)
                    {
                        result.menuEvents[i].event_enum_name = Enum.GetName(typeof(EnumAuthorizationEvent), result.menuEvents[i].event_enum_id);
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }

        public async Task<IEnumerable<dynamic>> GetEventByMenuIdAsync(int menuId)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT menu_event_id,menu_id,event_enum_id FROM [Auth].Menu_Event WHERE menu_id = @menuId";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@menuId", menuId);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select MenuEventViewModel.ConvertToModel(dr)).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }
        public async Task<dynamic> MenuActivity(int menuId, int parent_menu_id)
        {
            var message = new CommonMessage();

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "UPDATE Auth.Menu SET is_active=CASE WHEN(is_active=1) THEN 0 ELSE 1 end  Where menu_id=@menuId And menu_parentid=@parent_menu_id ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@menuId", menuId);
                parameters.Add("@parent_menu_id", parent_menu_id);
                var data = await _dbConnection.ExecuteAsync(sql, parameters);
                if (data > 0)
                {

                    message = CommonMessage.SetSuccessMessage(CommonUpdateMessage);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(CommonErrorMessage);
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return message;
        }
        public async Task<dynamic> MenuSorting(int menuId, int parent_menu_id, bool is_upper_sorting)
        {
            var result = (dynamic)null;
            var message = new CommonMessage();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@param_menu_id", menuId, DbType.Int32);
            parameters.Add("@param_menu_parent_id", parent_menu_id, DbType.Int32);
            parameters.Add("@param_is_upper_sorting", is_upper_sorting, DbType.Boolean);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                dynamic data = await _dbConnection.QueryAsync<dynamic>("[Auth].[SP_Menu_Swapping]", parameters, commandType: CommandType.StoredProcedure);

                if (data != null)
                {
                    List<dynamic> dataList = data;

                    result = (from dr in dataList select MenuViewModel.ConvertToModel(dr)).ToList();
                }

                message = CommonMessage.SetSuccessMessage("The menu is sorted", result);

            }
            catch (Exception ex)
            {

                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                //DB connection dispose with db connection close
                _dbConnection.Dispose();

            }



            return message;
        }


        public dynamic GetTreeMenu()
        {
            var result = (dynamic)null;

            result = _context.Menus.BuildTrees();
            return Task.FromResult(result);
        }

        #region : Menu Event
        public async Task<dynamic> GetMenuEventsByMenuIdAsync(int menuId)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT menu_event_id,menu_id,event_id " +
                    "FROM [Auth].[Menu_Event] WHERE  menu_id=@menuId ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@menuId", menuId);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = dataList.ToList();

                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }
        #endregion
        public async Task<dynamic> GetTreeMenuForSidebar()
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
             var result = (dynamic)null;
       
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
         
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@param_user_info_id", currentUserInfoId);
                //var sql = "SELECT menu_id,menu_parentid,menu_name,is_active,menu_icon_path,menu_routing_path,calling_parameter_value,calling_parameter_type " +
                //    "FROM [Auth].[Menu] WHERE menu_parentid!=0 ORDER BY menu_parentid,sorting_priority ASC";
                dynamic data = await _dbConnection.QueryAsync("[Auth].[SP_Role_Wise_Menu_For_Sidebar]", parameters, commandType: CommandType.StoredProcedure);


                if (data != null)
                {
                    List<dynamic> dataList = data;
               
                    var dtos = dataList.Select(m => new DataObj
                    {
                    
                        
                            menuId = m.menu_id,
                            menuParentId = m.menu_parentid,
                            label = m.menu_name,
                            sortingPriority = m.sorting_priority,
                            icon = m.menu_icon_path,
                            routerLink =  m.menu_routing_path,
                       // routerLink = "",
                        isActive = m.is_active
                        
                        
                    }).OrderBy(x => x.menuParentId).ThenBy(x => x.sortingPriority).ToList();



                    result = new SidebarRoot
                    {
                        items = BuildTrees(1, dtos)
                    };

        

                    //  message = CommonMessage.SetSuccessMessage(CommonSaveMessage,result);

                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }
        private static IList<DataObj> BuildTrees(int? pid, IList<DataObj> candicates)
        {
            var children = candicates.Where(c => c.menuParentId == pid).ToList();
            if (children == null || children.Count() == 0)
            {
                return null;
            }
            foreach (var i in children)
            {
                i.items = BuildTrees(i.menuId, candicates);
                
            }

            return children;
        }

    }
}
