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
    public class LeavePolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public LeavePolicyDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        public DynamicParameters leavePolicyParameterBinding(LeavePolicy leavePolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {

                parameters.Add("@param_Leave_policy_id", leavePolicy.leave_policy_id, DbType.Int32);
                parameters.Add("@param_Leave_policy_name", leavePolicy.leave_policy_name, DbType.String);
                parameters.Add("@param_code", leavePolicy.code, DbType.String);
                parameters.Add("@param_remarks", leavePolicy.remarks, DbType.String);
                parameters.Add("@param_is_proportionate", leavePolicy.is_proportionate, DbType.Boolean);
                parameters.Add("@param_leave_head_id", leavePolicy.leave_head_id, DbType.Int32);
                parameters.Add("@param_default_leave_balance_day", leavePolicy.default_leave_balance_day, DbType.Decimal);
                parameters.Add("@param_default_leave_balance_min", leavePolicy.default_leave_balance_min, DbType.Int32);
                parameters.Add("@param_max_enjoyable_limit_min", leavePolicy.max_enjoyable_limit_min, DbType.Int32);
                parameters.Add("@param_max_carry_leave_limit_min", leavePolicy.max_carry_leave_limit_min, DbType.Int32);
                parameters.Add("@param_max_carry_year", leavePolicy.max_carry_year, DbType.Int32);
                parameters.Add("@param_is_hourly", leavePolicy.is_hourly, DbType.Boolean);
                parameters.Add("@param_is_attachment_required", leavePolicy.is_attachment_required, DbType.Boolean);
                parameters.Add("@param_attachment_required_for_min", leavePolicy.attachment_required_for_min, DbType.Int32);
                parameters.Add("@param_is_allow_sandwich", leavePolicy.is_allow_sandwich, DbType.Boolean);
                parameters.Add("@param_is_sandwich_dayoff", leavePolicy.is_sandwich_dayoff, DbType.Boolean);
                parameters.Add("@param_is_sandwich_holiday", leavePolicy.is_sandwich_holiday, DbType.Boolean);
                parameters.Add("@param_is_sandwich_uneven", leavePolicy.is_sandwich_uneven, DbType.Boolean);
                parameters.Add("@param_is_prefix", leavePolicy.is_prefix, DbType.Boolean);
                parameters.Add("@param_is_prefix_dayoff", leavePolicy.is_prefix_dayoff, DbType.Boolean);
                parameters.Add("@param_is_prefix_holiday", leavePolicy.is_prefix_holiday, DbType.Boolean);
                parameters.Add("@param_is_prefix_uneven", leavePolicy.is_prefix_uneven, DbType.Boolean);
                parameters.Add("@param_is_sufix", leavePolicy.is_sufix, DbType.Boolean);
                parameters.Add("@param_is_sufix_dayoff", leavePolicy.is_sufix_dayoff, DbType.Boolean);
                parameters.Add("@param_is_sufix_holiday", leavePolicy.is_sufix_holiday, DbType.Boolean);
                parameters.Add("@param_is_sufix_uneven", leavePolicy.is_sufix_uneven, DbType.Boolean);
                parameters.Add("@param_is_required_purpose", leavePolicy.is_required_purpose, DbType.Boolean);
                parameters.Add("@param_purpose_required_for_min", leavePolicy.purpose_required_for_min, DbType.Int32);
                parameters.Add("@param_is_leave_area_required", leavePolicy.is_leave_area_required, DbType.Boolean);
                parameters.Add("@param_area_required_for_min", leavePolicy.area_required_for_min, DbType.Int32);
                parameters.Add("@param_is_responsible_person_required", leavePolicy.is_responsible_person_required, DbType.Boolean);
                parameters.Add("@param_responsible_person_required_for_min", leavePolicy.responsible_person_required_for_min, DbType.Int32);
                parameters.Add("@param_is_negetive_balance", leavePolicy.is_negetive_balance, DbType.Boolean);
                parameters.Add("@param_notice_period", leavePolicy.notice_period, DbType.Int32);
                parameters.Add("@param_notice_required_for_min", leavePolicy.notice_required_for_min, DbType.Int32);
                parameters.Add("@param_earn_day_count", leavePolicy.earn_day_count, DbType.Int32);
                parameters.Add("@param_is_earn_dayoff", leavePolicy.is_earn_dayoff, DbType.Boolean);
                parameters.Add("@param_is_earn_holiday", leavePolicy.is_earn_holiday, DbType.Boolean);
                parameters.Add("@param_is_earn_uneven", leavePolicy.is_earn_uneven, DbType.Boolean);
                parameters.Add("@param_is_earn_absent", leavePolicy.is_earn_absent, DbType.Boolean);
                parameters.Add("@param_encash_leave_balance_limit_min", leavePolicy.encash_leave_balance_limit_min, DbType.Int32);
                parameters.Add("@param_encash_fixed_amount", leavePolicy.encash_fixed_amount, DbType.Decimal);
                parameters.Add("@param_encash_amount_percent", leavePolicy.encash_amount_percent, DbType.Int32);
                parameters.Add("@param_is_gross", leavePolicy.is_gross, DbType.Boolean);
                parameters.Add("@param_salary_head_id", leavePolicy.salary_head_id, DbType.Int32);
                parameters.Add("@param_activation_days", leavePolicy.activation_days, DbType.Int32);
                parameters.Add("@param_is_activation_on_joining", leavePolicy.is_activation_on_joining, DbType.Boolean);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_Leave_policy_id", leavePolicy.leave_policy_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_Leave_policy_id", leavePolicy.leave_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Copy)
            {
                parameters.Add("@param_Leave_policy_id", leavePolicy.leave_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Copy);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_Leave_Policy(LeavePolicy leavePolicy, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = leavePolicyParameterBinding(leavePolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                result = await _dbConnection.QueryFirstOrDefaultAsync("[Leave].[SP_Leave_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Approve)
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
                else if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Copy)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonCopyMessage, result);
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
        public async Task<dynamic> GetAllLeavePolicy()
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
                var sql = " SELECT * FROM Leave.LeavePolicies s " +
                    "WHERE S.company_group_id = CASE WHEN(isShared = 1) THEN @param_company_group_id ELSE S.company_group_id END AND S.company_id = CASE WHEN(isShared = 0) THEN @param_company_id ELSE S.company_id END ORDER BY S.leave_policy_id DESC";
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

        public async Task<dynamic> GetLeavePolicyByName(string policy_or_leave_name )
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
                parameters.Add("@param_policy_or_leave_name", policy_or_leave_name + '%');
                var sql = " SELECT * FROM Leave.LeavePolicies s " +
                    "WHERE S.company_group_id = CASE WHEN(isShared = 1) " +
                    "THEN @param_company_group_id ELSE S.company_group_id END AND " +
                    "S.company_id = CASE WHEN(isShared = 0) THEN @param_company_id ELSE S.company_id END AND (leave_policy_name like @param_policy_or_leave_name Or head_name like @param_policy_or_leave_name)";
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

        public async Task<dynamic> GetLeavePolicyById(int leave_policy_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT * FROM [Leave].[Leave_Policy] WHERE leave_policy_id = @param_leave_policy_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_leave_policy_id", leave_policy_id);

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

        public async Task<dynamic> GetLeavePolicyCode()
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            try
            {
                var sql = "SELECT ((SELECT company_corporate_short_name FROM Administrative.Company_Corporate " +
                    "WHERE company_corporate_id = @company_corporate_id)+'-' + '1000' + '' + (SELECT Convert(nvarchar, ISNULL(MAX(ISNULL([leave_policy_id], 0)), 0) + 1) FROM [Leave].[Leave_Policy])) as code";
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
