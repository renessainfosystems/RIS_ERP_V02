using Auth.Model.Attendance.Model;
using Auth.Model.Attendance.ViewModel;
using Auth.Utility;
using Auth.Utility.Attendance.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.Attendance
{
    public class LeaveHeadDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public LeaveHeadDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
        public DynamicParameters LeaveHeadParameterBinding(LeaveHead leaveHead, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_leave_head_id", leaveHead.leave_head_id, DbType.Int32);
                parameters.Add("@param_head_name", leaveHead.head_name, DbType.String);
                parameters.Add("@param_leave_head_short_name", leaveHead.leave_head_short_name, DbType.String);
                parameters.Add("@param_name_in_local_language", leaveHead.name_in_local_language, DbType.String);
                parameters.Add("@param_leave_type_id_enum", leaveHead.leave_type_id_enum, DbType.Int32);
                parameters.Add("@param_required_for_id_enum", leaveHead.required_for_id_enum, DbType.Int32);
                parameters.Add("@param_remarks", leaveHead.remarks, DbType.String);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_leave_head_id", leaveHead.leave_head_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_LeaveHead(LeaveHead leaveHead, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = LeaveHeadParameterBinding(leaveHead, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync("[Leave].[SP_LeaveHead_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (data != null)
                {

                    result = LeaveHeadViewModel.ConvertToModel(data);

                   

                }


                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }


                if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                }
                else if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
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


        public async Task<dynamic> GetAllLeaveHead()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                var sql = "SELECT leave_head_id,head_name,leave_head_short_name,leave_type_id_enum,required_for_id_enum,name_in_local_language,remarks " +
                    "FROM Leave.Leave_Head WHERE company_group_id =@company_group_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                parameters.Add("@company_id", company_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select LeaveHeadViewModel.ConvertToModel(dr)).ToList();

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

        public async Task<dynamic> GetAllLeaveHeadForDP()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                var sql = "SELECT leave_head_id,head_name " +
                               "FROM Leave.Leave_Head WHERE company_group_id =@company_group_id";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                parameters.Add("@company_id", company_id);
                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                

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
