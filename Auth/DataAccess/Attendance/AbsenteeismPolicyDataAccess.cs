using Auth.Model.Attendance.Model;
using Auth.Utility.Attendance;
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
    public class AbsenteeismPolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;


        public AbsenteeismPolicyDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        public DynamicParameters AbsenteeismPolicyParameterBinding(AbsenteeismPolicy absenteeismPolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {

                parameters.Add("@param_absenteeism_policy_id", absenteeismPolicy.absenteeism_policy_id, DbType.Int32);
                parameters.Add("@param_absenteeism_policy_name", absenteeismPolicy.absenteeism_policy_name, DbType.String);
                parameters.Add("@param_remarks", absenteeismPolicy.remarks, DbType.String);
                parameters.Add("@param_is_leave_adjustment", absenteeismPolicy.is_leave_adjustment, DbType.Boolean);
                parameters.Add("@param_salary_head_id", absenteeismPolicy.salary_head_id, DbType.Int32);
                parameters.Add("@param_percent_value", absenteeismPolicy.percent_value, DbType.Int32);
                parameters.Add("@param_is_gross", absenteeismPolicy.is_gross, DbType.Boolean);
                parameters.Add("@param_basic_salary_head_id", absenteeismPolicy.basic_salary_head_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_absenteeism_policy_id", absenteeismPolicy.absenteeism_policy_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_absenteeism_policy_id", absenteeismPolicy.absenteeism_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }
        public async Task<dynamic> IUD_Absenteeism_Policy(AbsenteeismPolicy absenteeismPolicy, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = AbsenteeismPolicyParameterBinding(absenteeismPolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                 result = await _dbConnection.QueryFirstOrDefaultAsync("[Attendance].[SP_Absenteeism_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);
              
                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (result != null &&  dbOperation == (int)GlobalEnumList.DBOperation.Approve )
                {
                    return message = CommonMessage.SetSuccessMessage("Policy Approved", result);
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
        public async Task<dynamic> GetAllAbsenteeismPolicy()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_company_group_id", company_group_id);
                parameters.Add("@param_company_id", company_id);
                result = await _dbConnection.QueryAsync<dynamic>("[Attendance].[SP_All_Absenteeism_Policy_Get]", parameters, commandType: CommandType.StoredProcedure);
             
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

        public async Task<dynamic> GetAbsenteeismPolicyById(int absenteeism_policy_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT [absenteeism_policy_id],[absenteeism_policy_name],[code],[remarks]," +
                    "[is_leave_adjustment],[salary_head_id],[percent_value],[is_gross],[basic_salary_head_id],[is_active] " +
                    "FROM [Attendance].[Absenteeism_Policy] WHERE absenteeism_policy_id = @param_absenteeism_policy_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_absenteeism_policy_id", absenteeism_policy_id);

                result = await _dbConnection.QueryFirstOrDefaultAsync<dynamic>(sql, parameters);

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

        public async Task<dynamic> GetAbsenteeismPolicyCode()
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            try
            {
                var sql = "SELECT ((SELECT company_corporate_short_name FROM Administrative.Company_Corporate " +
                    "WHERE company_corporate_id = @company_corporate_id)+'-' + '1000' + '' + (SELECT Convert(nvarchar, ISNULL(MAX(ISNULL([absenteeism_policy_id], 0)), 0) + 1) FROM [Attendance].[Absenteeism_Policy])) as code";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_corporate_id", company_corporate_id);

                result = await _dbConnection.QueryFirstOrDefaultAsync<dynamic>(sql, parameters);

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
    }
}
