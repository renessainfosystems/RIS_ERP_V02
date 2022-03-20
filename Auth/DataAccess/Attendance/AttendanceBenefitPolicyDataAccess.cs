using Auth.Model.Attendance.Model;
using Auth.Model.Attendance.ViewModel;
using Auth.Utility.Attendance;
using Auth.Utility.Attendance.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.Attendance
{
    public class AttendanceBenefitPolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;


        public AttendanceBenefitPolicyDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        public DynamicParameters BenefitPolicyParameterBinding(AttendanceBenefitPolicy attendanceBenefitPolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {

                parameters.Add("@param_abp_id", attendanceBenefitPolicy.abp_id, DbType.Int32);
                parameters.Add("@param_abp_name", attendanceBenefitPolicy.abp_name, DbType.String);
                parameters.Add("@param_remarks", attendanceBenefitPolicy.remarks, DbType.String);
                parameters.Add("@param_benefit_work_on_id_enum", attendanceBenefitPolicy.benefit_work_on_id_enum, DbType.Int32);
                parameters.Add("@param_minimum_working_hour_min", attendanceBenefitPolicy.minimum_working_hour_min, DbType.Int32);
                parameters.Add("@param_holiday_id", attendanceBenefitPolicy.holiday_id, DbType.Int32);
                parameters.Add("@param_OT_policy_id", attendanceBenefitPolicy.OT_policy_id, DbType.Int32);
                parameters.Add("@param_time_start", string.IsNullOrEmpty(attendanceBenefitPolicy.time_start) ? null : DateTime.ParseExact(attendanceBenefitPolicy.time_start, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_time_end", string.IsNullOrEmpty(attendanceBenefitPolicy.time_end) ? null : DateTime.ParseExact(attendanceBenefitPolicy.time_end, "HH:mm", CultureInfo.InvariantCulture), DbType.Time);
                parameters.Add("@param_leave_head_id", attendanceBenefitPolicy.leave_head_id, DbType.Int32);
                parameters.Add("@param_leave_amount", attendanceBenefitPolicy.leave_amount, DbType.Int32);
                parameters.Add("@param_leave_expire_day", attendanceBenefitPolicy.leave_expire_day, DbType.Int32);
                parameters.Add("@param_salary_head_id", attendanceBenefitPolicy.salary_head_id, DbType.Int32);
                parameters.Add("@param_fixed_value", attendanceBenefitPolicy.fixed_value, DbType.Decimal);
                parameters.Add("@param_percent_value", attendanceBenefitPolicy.percent_value, DbType.Int32);
                parameters.Add("@param_is_gross", attendanceBenefitPolicy.is_gross, DbType.Boolean);
                parameters.Add("@param_is_calculate_per_working_hour", attendanceBenefitPolicy.is_calculate_per_working_hour, DbType.Boolean);
                parameters.Add("@param_basic_salary_head_id", attendanceBenefitPolicy.basic_salary_head_id, DbType.Int32);
                parameters.Add("@param_is_effect_on_payroll", attendanceBenefitPolicy.is_effect_on_payroll, DbType.Boolean);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_abp_id", attendanceBenefitPolicy.abp_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_abp_id", attendanceBenefitPolicy.abp_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }
        public async Task<dynamic> IUD_Attendance_Benefit_Policy(AttendanceBenefitPolicy attendanceBenefitPolicy, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = BenefitPolicyParameterBinding(attendanceBenefitPolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Attendance].[SP_Attendance_Benefit_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);
                if (data != null)
                {
                    result = AttBenefitPolicyViewModel.ConvertToModel(data);

                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve && result != null)
                {
                    return message = CommonMessage.SetSuccessMessage("Policy Approved", result);
                }
                else if(dbOperation == (int)GlobalEnumList.DBOperation.Update && result != null)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
                }

                else if(dbOperation == (int)GlobalEnumList.DBOperation.Create &&  result != null)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
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
        public async Task<dynamic> GetAllAttendanceBenefitPolicy()
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
                dynamic data = await _dbConnection.QueryAsync<dynamic>("[Attendance].[SP_All_Attendance_Benefit_Policy_Get]", parameters, commandType: CommandType.StoredProcedure);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select AttBenefitPolicyViewModel.ConvertToModel(dr)).ToList();

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

        public async Task<dynamic> GetAttendanceBenefitPolicyById(int abpid)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT [abp_id],[abp_name],[code],[remarks],[benefit_work_on_id_enum],[minimum_working_hour_min],CONVERT(varchar(5), time_start)[time_start],CONVERT(varchar(5), time_end)[time_end]," +
                    "[holiday_id],[OT_policy_id],[leave_head_id],[leave_amount],[leave_expire_day],[salary_head_id],[fixed_value],[percent_value]," +
                    "[is_gross],[basic_salary_head_id],[is_calculate_per_working_hour],[is_effect_on_payroll] FROM [Attendance].[Attendance_Benefit_Policy] WHERE abp_id = @param_abp_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_abp_id", abpid);

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
        public async Task<dynamic> GetBenefitPolicyCode()
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            try
            {
                var sql = "SELECT ((SELECT company_corporate_short_name FROM Administrative.Company_Corporate " +
                    "WHERE company_corporate_id = @company_corporate_id)+'-' + '1000' + '' + (SELECT Convert(nvarchar, ISNULL(MAX(ISNULL(abp_id, 0)), 0) + 1) from Attendance.Attendance_Benefit_Policy)) as code";
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
