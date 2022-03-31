using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using Auth.Utility;
using Auth.Utility.Administrative.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.Administrative
{ 
    public class OrganogramDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public OrganogramDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
         
        //Parameter Binding
        public DynamicParameters OrganogramParameterBinding(Organogram organogram, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_administrative_organogram_id", organogram.organogram_id, DbType.Int32);
                parameters.Add("@param_administrative_organogram_code", organogram.organogram_code, DbType.String);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_organogram_location_id", organogram.location_id, DbType.Int32);
                parameters.Add("@param_organogram_department_id", organogram.department_id, DbType.Int32);
                parameters.Add("@param_organogram_parrent_id", organogram.parent_id, DbType.Int32);
                parameters.Add("@param_organogram_sorting_priority", organogram.sorting_priority, DbType.Int32);
                parameters.Add("@param_organogram_is_active", organogram.is_active, DbType.Byte);
                parameters.Add("@param_organogram_approve_user_id", organogram.approve_user_id, DbType.Byte);  
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_administrative_organogram_id", organogram.organogram_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_administrative_organogram_id", organogram.organogram_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }
            return parameters;
        }
        public async Task<dynamic> IUD_Organogram(Organogram Organogram, int dbOperation)
        {
            var message = new CommonMessage();
            var parameters = OrganogramParameterBinding(Organogram, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                dynamic data = await _dbConnection.QueryAsync("[Administrative].[SP_Organogram_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                {
                    return message = CommonMessage.SetSuccessMessage("Organogram Approved");
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

        public async Task<dynamic> OrganogramActivity(long Organogram_id)
        {
            var message = new CommonMessage();
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@param_shcema_name", "[Administrative]", DbType.String);
            parameters.Add("@param_table_name", "Organogram", DbType.String);
            parameters.Add("@param_object_id", Organogram_id, DbType.Int32);
            parameters.Add("@param_user_info_id", currentUserInfoId, DbType.Int32);
            parameters.Add("@param_remarks", "Organogram active inactive", DbType.String);
            parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);
            try
            {
                result = await _dbConnection.QueryAsync("[Administrative].[SP_Activity]", parameters, commandType: CommandType.StoredProcedure);

                if (result.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
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

            return message;
        }
        public async Task<dynamic> GetAllOrganogram()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {               
                string sql = @"SELECT [organogram_id]
                              ,[organogram_code]
                              ,[company_corporate_id]
                              ,[company_group_id]
                              ,[company_id]
                              ,[location_id]
                              ,[department_id]
                              ,[parent_id]
                              ,[sorting_priority]
                              ,[is_active]
                              ,[approve_user_id]
                              ,[approve_date_time]
                              ,[created_user_id]
                              ,[db_server_date_time]
                          FROM [Administrative].[Organogram] O WHERE O.company_group_id =@company_group_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                   // result = (from dr in dataList select OrganogramViewModel.ConvertToModel(dr)).ToList();
                   // result = (from dr in dataList select Organogram.ConvertToModel(dr)).ToList();

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

        public async Task<dynamic> GetOrganogramById(long Organogram_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT [organogram_id]
                              ,[organogram_code]
                              ,[company_corporate_id]
                              ,[company_group_id]
                              ,[company_id]
                              ,[location_id]
                              ,[department_id]
                              ,[parent_id]
                              ,[sorting_priority]
                              ,[is_active]
                              ,[approve_user_id]
                              ,[approve_date_time]
                              ,[created_user_id]
                              ,[db_server_date_time]
                          FROM [Administrative].[Organogram] O WHERE o.organogram_id=@Organogram_id";
              
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Organogram_id", Organogram_id);

                // result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {

                    //result = OrganogramViewModel.ConvertToModel(data);
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
        public async Task<dynamic> GetAllActiveOrganogram()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            try
            {
                var sql = "SELECT * FROM Administrative.Organogram O WHERE O.company_group_id =@company_group_id And is_active=1";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                   // result = (from dr in dataList select OrganogramViewModel.ConvertToModel(dr)).ToList();

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
        
    }
}
