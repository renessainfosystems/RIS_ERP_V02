using Auth.Model.Auth.Model;
using Auth.Model.Auth.ViewModel;
using Auth.Utility;
using Auth.Utility.Model;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Utility.Auth.Enum;

namespace Auth.DataAccess
{
    public class AuthorizationRoleDataAccess
    {

        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public AuthorizationRoleDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
        //Parameter Binding
        public DynamicParameters AuthorizationRoleParameterBinding(AuthorizationRole authorizationRole, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
           
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_authorization_role_id", authorizationRole.authorization_role_id, DbType.Int32);
                parameters.Add("@param_authorization_role_name", authorizationRole.authorization_role_name, DbType.String);
                parameters.Add("@param_remarks", authorizationRole.remarks, DbType.String);
                parameters.Add("@param_is_active", authorizationRole.is_active, DbType.Boolean);
                parameters.Add("@param_created_datetime", authorizationRole.created_datetime, DbType.DateTime);
                parameters.Add("@param_updated_datetime", authorizationRole.updated_datetime, DbType.DateTime);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_updated_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_authorization_role_id", authorizationRole.authorization_role_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters AuthorizationMenuEventPermissionParameterBinding(AuthorizationMenuEvent authorizationMenuEvent, int operationType)
        {
        
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_authorization_role_id", authorizationMenuEvent.authorization_role_id, DbType.Int32);
                parameters.Add("@param_menu_event_id", authorizationMenuEvent.menu_event_id, DbType.Int32);
                parameters.Add("@param_menu_id", authorizationMenuEvent.menu_id, DbType.Int32);
                parameters.Add("@param_authorization_role_menu_events_id", authorizationMenuEvent.authorization_role_menu_events_id, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_authorization_role_menu_events_id", authorizationMenuEvent.authorization_role_menu_events_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }


        public async Task<dynamic> IUD_AuthorizationRole(AuthorizationRole authorizationRole, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AuthorizationRoleParameterBinding(authorizationRole, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Auth].[SP_Authorization_Role_IUD]", parameters, commandType: CommandType.StoredProcedure);
                if(dbOperation== (int)GlobalEnumList.DBOperation.Delete)
                {
                   return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
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

        public async Task<dynamic> GetAllRoles()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT r.authorization_role_id,r.authorization_role_name,is_active,remarks,ISNULL(e.TotalCount,0) TotalCount " +
                    " FROM Auth.Authorization_Role r " +
                    " LEFT JOIN" +
                    " (SELECT authorization_role_id ,COUNT(distinct menu_id) TotalCount " +
                    " FROM Auth.Authorization_Role_Menu_Event GROUP BY authorization_role_id " +
                    " )e ON e.authorization_role_id=r.authorization_role_id";

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select AuthorizationRoleViewModel.ConvertToModel(dr)).ToList();

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

        public async Task<dynamic> GetRoleById(int authorization_role_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT r.authorization_role_id,r.authorization_role_name,is_active,remarks " +
                    " FROM Auth.Authorization_Role r  WHERE authorization_role_id = @authorization_role_id ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@authorization_role_id", authorization_role_id);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {


                    result = AuthorizationRoleViewModel.ConvertToModel(data);
                  

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

       
        public async Task<dynamic> GetTreeMenuWithEvents(int authorization_role_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT  m.menu_id,m.menu_name,m.menu_parentid,m.menu_icon_path,m.menu_routing_path,m.sorting_priority,m.is_active," +
                                "ISNULL(em.TotalEvents,0)TotalEvents,ISNULL(RME.PermittedEvents,0)PermittedEvents " +
                                "FROM Auth.Menu M LEFT JOIN ( SELECT  me.menu_id,COUNT((me.menu_event_id)) TotalEvents  " +
                                "FROM Auth.Menu_Event ME GROUP BY menu_id)EM ON M.menu_id=EM.menu_id " +
                                "LEFT JOIN ( SELECT  me.menu_id,COUNT((me.menu_event_id)) PermittedEvents " +
                                "FROM Auth.Authorization_Role_Menu_Event ME WHERE authorization_role_id=@authorization_role_id GROUP BY menu_id )RME ON RME.menu_id=M.menu_id " +
                                "WHERE is_active=1";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@authorization_role_id", authorization_role_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql,parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;

                    var dtos = dataList.Select(m => new Dto
                    {
                        data = new Data
                        {
                            MenuId = m.menu_id,
                            MenuParentId = m.menu_parentid,
                            MenuName = m.menu_name,
                            SortingPriority = m.sorting_priority,
                            MenuIconPath = m.menu_icon_path,
                            MenuRoutingPath = m.menu_routing_path,
                            PermittedEvents=m.PermittedEvents,
                            TotalEvents=m.TotalEvents,
                            IsActive = m.is_active
                        }

                    }).OrderBy(x => x.data.MenuParentId).ThenBy(x => x.data.SortingPriority).ToList();

                    return BuildTrees(0, dtos);

                   
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

        public async Task<dynamic> GetMenuAndRoleWiseEvent(int menu_id, int authorization_role_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT m.menu_id,ISNULL(rme.authorization_role_menu_events_id,0)authorization_role_menu_events_id,ISNULL(me.menu_event_id,0)menu_event_id,ISNULL(event_enum_id,0)event_enum_id,ISNULL(ar.authorization_role_id,0) authorization_role_id,CASE WHEN(authorization_role_menu_events_id IS NULL) THEN 0 ELSE 1 END IsPermissionExist FROM Auth.Menu m " +
                    "LEFT JOIN Auth.Menu_Event ME  on m.menu_id = me.menu_id " +
                    "LEFT JOIN Auth.Authorization_Role_Menu_Event RME ON ME.menu_id = RME.menu_id AND RME.menu_event_id = ME.menu_event_id " +
                    "LEFT JOIN Auth.Authorization_Role AR ON AR.authorization_role_id = @authorization_role_id " +
                    "WHERE me.menu_id = @menu_id AND M.is_active = 1";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@authorization_role_id", authorization_role_id);
                parameters.Add("@menu_id", menu_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;


                    result = (from dr in dataList select AuthorizationRoleViewModel.ConvertToMenuEventModel(dr)).ToList();

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

      
        public async Task<dynamic> AuthorizationPermission(AuthorizationMenuEvent authorizationmenuevent, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AuthorizationMenuEventPermissionParameterBinding(authorizationmenuevent, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Auth].[SP_Authorization_Role_Menu_Event_Permission]", parameters, commandType: CommandType.StoredProcedure);
                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage,data);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
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

        public async Task<dynamic> AuthorizationRoleActivity(int authorization_role_id)
        {
            var message = new CommonMessage();

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "UPDATE Auth.Authorization_Role SET is_active=CASE WHEN(is_active=1) THEN 0 ELSE 1 end  Where authorization_role_id=@authorization_role_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@authorization_role_id", authorization_role_id);
       
                var data = await _dbConnection.ExecuteAsync(sql, parameters);
                if (data > 0)
                {

                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return message;
        }

        private static IList<Dto> BuildTrees(int? pid, IList<Dto> candicates)
        {
            var children = candicates.Where(c => c.data.MenuParentId == pid).ToList();
            if (children == null || children.Count() == 0)
            {
                return null;
            }
            foreach (var i in children)
            {
                i.children = BuildTrees(i.data.MenuId, candicates);
            }
            return children;
        }


    }
}
