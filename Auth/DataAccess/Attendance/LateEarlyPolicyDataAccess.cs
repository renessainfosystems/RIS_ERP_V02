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
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.DataAccess.Attendance
{
    public class LateEarlyPolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public LateEarlyPolicyDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
        //Parameter Binding
        public DynamicParameters LateEarlyParameterBinding(LateEarlyPolicy lateEarlyPolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_late_early_policy_id", lateEarlyPolicy.late_early_policy_id, DbType.Int32);
                parameters.Add("@param_late_early_policy_name", lateEarlyPolicy.late_early_policy_name, DbType.String);
                parameters.Add("@param_code", lateEarlyPolicy.code, DbType.String);
                parameters.Add("@param_remarks", lateEarlyPolicy.remarks, DbType.String);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_late_early_policy_id", lateEarlyPolicy.late_early_policy_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_late_early_policy_id", lateEarlyPolicy.late_early_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }

        public DynamicParameters LateEarlyDetailsParameterBinding(LateEarlyPolicyDetail lateEarlyPolicyDetail, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];


            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_lep_detail_id", lateEarlyPolicyDetail.lep_detail_id, DbType.Int32);
                parameters.Add("@param_late_early_policy_id", lateEarlyPolicyDetail.late_early_policy_id, DbType.Int32);
                parameters.Add("@param_late_early_type_id_enum", lateEarlyPolicyDetail.late_early_type_id_enum, DbType.Int32);
                parameters.Add("@param_is_allow_late_early_slab", lateEarlyPolicyDetail.is_allow_late_early_slab, DbType.Int32);
                parameters.Add("@param_min_late_early_min", lateEarlyPolicyDetail.min_late_early_min, DbType.Int32);
                parameters.Add("@param_max_late_early_min", lateEarlyPolicyDetail.max_late_early_min, DbType.Int32);
                parameters.Add("@param_late_early_days_for", lateEarlyPolicyDetail.late_early_days_for, DbType.Int32);
                parameters.Add("@param_is_consecutive", lateEarlyPolicyDetail.is_consecutive, DbType.Int32);
                parameters.Add("@param_is_leave_adjustment", lateEarlyPolicyDetail.is_leave_adjustment, DbType.Int32);
                parameters.Add("@param_salary_head_id", lateEarlyPolicyDetail.salary_head_id, DbType.Int32);
                parameters.Add("@param_percent_value", lateEarlyPolicyDetail.percent_value, DbType.Int32);
                parameters.Add("@param_is_gross", lateEarlyPolicyDetail.is_gross, DbType.Int32);
                parameters.Add("@param_primary_salary_head_id", lateEarlyPolicyDetail.primary_salary_head_id, DbType.Int32);
                parameters.Add("@param_deduction_days", lateEarlyPolicyDetail.deduction_days, DbType.Int32);
                parameters.Add("@param_leave_in_min", lateEarlyPolicyDetail.leave_in_min, DbType.Int32);
                parameters.Add("@param_is_deduction_monthly_min", lateEarlyPolicyDetail.is_deduction_monthly_min, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_lep_detail_id", lateEarlyPolicyDetail.lep_detail_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_LateEarlyPolicy(LateEarlyPolicy lateEarlyPolicy, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = LateEarlyParameterBinding(lateEarlyPolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Late_Early_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);


                if (dbOperation == (int)DBOperation.Create && lateEarlyPolicy.lateEarlyPolicyDetails != null)
                {
                    if (lateEarlyPolicy.lateEarlyPolicyDetails.Count > 0 && data.Count > 0)
                    {
                        foreach (LateEarlyPolicyDetail item in lateEarlyPolicy.lateEarlyPolicyDetails)
                        {
                            item.late_early_policy_id = data[0].late_early_policy_id;
                            var slabParameters = LateEarlyDetailsParameterBinding(item, dbOperation);
                            dynamic slabData = _dbConnection.QueryFirstOrDefault<dynamic>("[Attendance].[SP_Late_Early_Policy_Detail_IUD]", slabParameters, commandType: CommandType.StoredProcedure);

                        }
                    }
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve && data.Count > 0)
                {
                    return message = CommonMessage.SetSuccessMessage("Policy Approved", data);
                }
                else  if (dbOperation == (int)GlobalEnumList.DBOperation.Update && data.Count > 0)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, data);
                }

                else if(dbOperation == (int)GlobalEnumList.DBOperation.Create &&  data.Count > 0)
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


        public async Task<dynamic> IUD_LateEarlyPolicyDetail(LateEarlyPolicyDetail lateEarlyPolicyDetail, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = LateEarlyDetailsParameterBinding(lateEarlyPolicyDetail, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Late_Early_Policy_Detail_IUD]", parameters, commandType: CommandType.StoredProcedure);
                // Insert Menu events



                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
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

        public async Task<dynamic> GetAllLateEarlyPolicy()
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
                var sql = " SELECT * FROM [Attendance].[view_LateEarlyPolicies] s " +
             "WHERE S.company_group_id = CASE WHEN(isShared = 1) THEN @param_company_group_id ELSE S.company_group_id END AND S.company_id = CASE WHEN(isShared = 0) THEN @param_company_id ELSE S.company_id END ORDER BY S.late_early_policy_id DESC";
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
        public async Task<dynamic> GetAllLateEarlyPolicyForDP()
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
                var sql = " SELECT S.late_early_policy_id,S.late_early_policy_name FROM [Attendance].[view_LateEarlyPolicies] s " +
             "WHERE S.company_group_id = CASE WHEN(isShared = 1) THEN @param_company_group_id ELSE S.company_group_id END AND S.company_id = CASE WHEN(isShared = 0) THEN @param_company_id ELSE S.company_id END AND S.is_active=1";
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
        public async Task<dynamic> GetLateEarlyPolicyById(int late_early_policy_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT [late_early_policy_id],[late_early_policy_name],[code],[remarks],[is_active] FROM [Attendance].[Late_Early_Policy] WHERE late_early_policy_id = @param_late_early_policy_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_late_early_policy_id", late_early_policy_id);

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
        public async Task<dynamic> GetLateEarlyPolicyDetailsById(int late_early_policy_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT [lep_detail_id],[late_early_policy_id],[late_early_type_id_enum],[is_allow_late_early_slab],[min_late_early_min],[max_late_early_min],[late_early_days_for],[is_consecutive],[is_leave_adjustment],[leave_in_min],[is_leave_as_late_early_min]," +
                    "[salary_head_id],[percent_value],[is_gross],[primary_salary_head_id],[deduction_days],[is_deduction_monthly_min] FROM [Attendance].[Late_Early_Policy_Detail] WHERE late_early_policy_id = @param_late_early_policy_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_late_early_policy_id", late_early_policy_id);

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

            return result;
        }
        public async Task<dynamic> GetLateEarlyPolicyCode()
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            try
            {
                var sql = "SELECT ((SELECT company_corporate_short_name FROM Administrative.Company_Corporate " +
                    "WHERE company_corporate_id = @company_corporate_id)+'-' + '1000' + '' + (SELECT Convert(nvarchar, ISNULL(MAX(ISNULL(late_early_policy_id, 0)), 0) + 1) from Attendance.Late_Early_Policy)) as code";
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
