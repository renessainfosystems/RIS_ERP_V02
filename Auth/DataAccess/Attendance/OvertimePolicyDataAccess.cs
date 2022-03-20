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
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.DataAccess.Attendance
{
    public class OvertimePolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public OvertimePolicyDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters OTPolicyParameterBinding(OTPolicy oTPolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_OT_policy_id", oTPolicy.OT_policy_id, DbType.Int32);
                parameters.Add("@param_policy_name", oTPolicy.policy_name, DbType.String);
                parameters.Add("@param_code", oTPolicy.code, DbType.String);
                parameters.Add("@param_minimum_OT_min", oTPolicy.minimum_OT_min, DbType.Int32);
                parameters.Add("@param_maximum_OT_min", oTPolicy.maximum_OT_min, DbType.Int32);
                parameters.Add("@param_OT_reduce_time_min", oTPolicy.OT_reduce_time_min, DbType.Int32);
                parameters.Add("@param_remarks", oTPolicy.remarks, DbType.String);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_OT_policy_id", oTPolicy.OT_policy_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_OT_policy_id", oTPolicy.OT_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }

        public DynamicParameters OTPolicySlabParameterBinding(OTPolicySlab oTPolicySlab, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_OT_policy_slab_id", oTPolicySlab.OT_policy_slab_id, DbType.Int32);
                parameters.Add("@param_OT_policy_id", oTPolicySlab.OT_policy_id, DbType.Int32);
                parameters.Add("@param_minimum_OT_min", oTPolicySlab.minimum_OT_min, DbType.Int32);
                parameters.Add("@param_maximum_OT_min", oTPolicySlab.maximum_OT_min, DbType.Int32);
                parameters.Add("@param_acheive_OT_min", oTPolicySlab.acheive_OT_min, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_OT_policy_slab_id", oTPolicySlab.OT_policy_slab_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_OTPolicy(OTPolicy oTPolicy, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = OTPolicyParameterBinding(oTPolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Overtime_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);
     

                if (dbOperation == (int)DBOperation.Create && oTPolicy.otPolicySlab!=null)
                {
                    if (oTPolicy.otPolicySlab.Count > 0 && data[0].OT_policy_id > 0)
                    {
                        foreach (OTPolicySlab item in oTPolicy.otPolicySlab)
                        {
                            item.OT_policy_id = data[0].OT_policy_id;
                            var slabParameters = OTPolicySlabParameterBinding(item, dbOperation);
                            dynamic slabData = _dbConnection.QueryAsync<dynamic>("[Attendance].[SP_Overtime_Policy_Slab_IUD]", slabParameters, commandType: CommandType.StoredProcedure);
                     
                        }
                    }
                }

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

        public async Task<dynamic>  OTPolicyActivity(int OT_policy_id)
        {
            var message = new CommonMessage();
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@param_object_id", OT_policy_id, DbType.Int32);
            parameters.Add("@param_shcema_name", "[Attendance]", DbType.String);
            parameters.Add("@param_table_name", "Overtime_Policy", DbType.String);
            parameters.Add("@param_user_info_id", currentUserInfoId,DbType.Int32);
            parameters.Add("@param_remarks", "OT Policy active inactive", DbType.String);
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
        public async Task<dynamic> GetAllOTPolicy()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
  

            try
            {
                var sql = "SELECT OT_policy_id,policy_name,code,minimum_OT_min,maximum_OT_min,OT_reduce_time_min,O.is_active,O.remarks," +
                    "CASE WHEN(approve_user_id IS NOT NULL) THEN user_name+'[' + FORMAT(O.approve_date_time, 'dd-MMM-yyyy') + ']' ELSE '' END approvedBy " +
                    "FROM Attendance.Overtime_Policy O LEFT JOIN Auth.User_Info U ON O.approve_user_id = U.user_info_id " +
                    "WHERE O.company_group_id =@company_group_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql,parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select OTPolicyViewModel.ConvertToModel(dr)).ToList();

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
        public async Task<dynamic> GetAllActiveOTPolicyForDP()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                var sql = "SELECT OT_policy_id,policy_name " +
                    "FROM Attendance.Overtime_Policy o" +
                    " WHERE company_group_id =@company_group_id And is_active=1";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
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

        public async Task<dynamic> GetActiveOTPolicyById(int OT_policy_id)
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                var sql = "SELECT OT_policy_id,policy_name,code,minimum_OT_min,maximum_OT_min,OT_reduce_time_min,O.is_active,O.remarks," +
                        "CASE WHEN(approve_user_id IS NOT NULL) THEN user_name+'[' + FORMAT(O.approve_date_time, 'dd-MMM-yyyy') + ']' ELSE '' END approvedBy " +
                        "FROM Attendance.Overtime_Policy O LEFT JOIN Auth.User_Info U ON O.approve_user_id = U.user_info_id " +
                        " WHERE O.company_group_id = @company_group_id And o.OT_policy_id = @OT_policy_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                parameters.Add("@OT_policy_id", OT_policy_id);
          
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                   result = OTPolicyViewModel.ConvertToModel(data);
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

        public async Task<dynamic> GetOTPolicySlabById(int OT_policy_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT OT_policy_slab_id,OT_policy_id,minimum_OT_min,maximum_OT_min,acheive_OT_min " +
                    "FROM Attendance.Overtime_Policy_Slab WHERE OT_policy_id=@OT_policy_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@OT_policy_id", OT_policy_id);

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



        public async Task<dynamic> IUD_OTPolicySlab(OTPolicySlab oTPolicySlab, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = OTPolicySlabParameterBinding(oTPolicySlab, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Overtime_Policy_Slab_IUD]", parameters, commandType: CommandType.StoredProcedure);
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
    }
}
