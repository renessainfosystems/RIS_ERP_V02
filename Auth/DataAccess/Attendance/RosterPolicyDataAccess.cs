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
    public class RosterPolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public RosterPolicyDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters RosterPolicyParameterBinding(RosterPolicy rosterPolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_roster_policy_id", rosterPolicy.roster_policy_id, DbType.Int32);
                parameters.Add("@param_roster_policy_name", rosterPolicy.roster_policy_name, DbType.String);
                parameters.Add("@param_code", rosterPolicy.code, DbType.String);
                parameters.Add("@param_roster_cycle", rosterPolicy.roster_cycle, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_roster_policy_id", rosterPolicy.roster_policy_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_roster_policy_id", rosterPolicy.roster_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }

        public DynamicParameters RosterDetailsParameterBinding(RosterPolicy rosterPolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_roster_policy_detail_id", rosterPolicy.roster_policy_detail_id, DbType.Int32);
                parameters.Add("@param_roster_policy_id", rosterPolicy.roster_policy_id, DbType.Int32);
                parameters.Add("@param_roster_policy_name", rosterPolicy.roster_policy_name, DbType.String);
                parameters.Add("@param_roster_cycle", rosterPolicy.roster_cycle, DbType.Int32);
                parameters.Add("@param_shift_id", rosterPolicy.shift_id, DbType.Int32);
                parameters.Add("@param_next_shift_id", rosterPolicy.next_shift_id, DbType.Int32);
                parameters.Add("@param_roster_cycle", rosterPolicy.roster_cycle, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_roster_policy_detail_id", rosterPolicy.roster_policy_detail_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_RosterPolicy(RosterPolicy rosterPolicy, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = RosterPolicyParameterBinding(rosterPolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[Roster_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);


                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                {
                    return message = CommonMessage.SetSuccessMessage("Policy Approved");
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

        public async Task<dynamic> IUD_RosterPolicyDetails(RosterPolicy rosterPolicy, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = RosterDetailsParameterBinding(rosterPolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Roster_Policy_Details_IUD]", parameters, commandType: CommandType.StoredProcedure);


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

        public async Task<dynamic> GetAllRosterPolicy()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                var sql = "DECLARE @pv_is_shared BIT SELECT @pv_is_shared = is_shared from Auth.Software_Sharing_Policy " +
                    "SELECT S.roster_policy_id,S.roster_policy_name,CAST(s.roster_cycle as varchar) + ' ' + 'Days'roster_cycle, CASE WHEN(approve_user_id IS NOT NULL) THEN user_name+'[' + FORMAT(approve_date_time, 'dd-MMM-yyyy') + ']' ELSE '' END approvedBy, s.is_active " +
                  "FROM Attendance.Roster_Policy s LEFT JOIN Auth.User_Info U ON s.approve_user_id = U.user_info_id  WHERE   S.company_group_id = CASE WHEN(@pv_is_shared = 1) THEN @param_company_group_id ELSE S.company_group_id END AND " +
                  "S.company_id = CASE WHEN(@pv_is_shared = 0) THEN @param_company_id ELSE S.company_id END";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_company_group_id", company_group_id);
                parameters.Add("@param_company_id", company_id);
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
        public async Task<dynamic> GetAllRosterPolicyForDP()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {

                var sql = "DECLARE @pv_is_shared BIT SELECT @pv_is_shared = is_shared FROM Auth.Software_Sharing_Policy " +
                    "SELECT S.roster_policy_id,S.roster_policy_names FROM Attendance.Roster_Policy s  " +
                    "WHERE S.company_group_id = CASE WHEN(@pv_is_shared = 1) THEN @param_company_group_id ELSE S.company_group_id END AND S.company_id = CASE WHEN(@pv_is_shared = 0) THEN @param_company_id ELSE S.company_id END AND is_active = 1";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_company_group_id", company_group_id);
                parameters.Add("@param_company_id", company_id);
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

        public async Task<dynamic> GetRosterPolicyById(int roster_policy_id)
        {
            var message = new CommonMessage();
       
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                var sql = "SELECT [roster_policy_id],[roster_policy_name],[code],[roster_cycle],[is_active] FROM [Attendance].[Roster_Policy] WHERE roster_policy_id=@roster_policy_id";
                DynamicParameters parameters = new DynamicParameters();
          
                parameters.Add("@roster_policy_id", roster_policy_id);

                result = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
              

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

        public async Task<dynamic> GetRosterDetailsById(int roster_policy_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT r.roster_policy_id,r.roster_policy_detail_id,r.shift_id,r.next_shift_id,s.shift_name shift,s1.shift_name next_shift FROM Attendance.Roster_Policy_Detail r Inner join Attendance.Shift_Info s on r.shift_id = r.shift_id " +
                    "Inner join Attendance.Shift_Info s1 on s1.shift_id = r.next_shift_id  " +
                    "WHERE roster_policy_id = @roster_policy_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@roster_policy_id", roster_policy_id);

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
    }
}
