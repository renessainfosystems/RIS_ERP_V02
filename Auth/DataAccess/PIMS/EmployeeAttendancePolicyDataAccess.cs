using Auth.Model.PIMS.Model;
using Auth.Model.PIMS.ViewModel;
using Auth.Utility.PIMS;
using Auth.Utility.PIMS.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.PIMS
{
    public class EmployeeAttendancePolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public EmployeeAttendancePolicyDataAccess(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        //Parameter binding
        public DynamicParameters ParameterBinding(EmployeeAttendancePolicy oEmployeeAttendancePolicy)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            parameters.Add("@param_employee_id", oEmployeeAttendancePolicy.employee_id ?? 0, DbType.Int64);
            parameters.Add("@param_attendance_policy_id", oEmployeeAttendancePolicy.attendance_policy_id ?? 0, DbType.Int32);
            parameters.Add("@param_roster_policy_id", oEmployeeAttendancePolicy.roster_policy_id ?? 0, DbType.Int32);
            parameters.Add("@param_shift_id", oEmployeeAttendancePolicy.shift_id ?? 0, DbType.Int32);
            parameters.Add("@param_is_random_dayoff", oEmployeeAttendancePolicy.is_random_dayoff ?? false, DbType.Boolean);
            parameters.Add("@param_no_of_random_dayoff", oEmployeeAttendancePolicy.no_of_random_dayoff ?? 0, DbType.Int32);
            parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
            //parameters.Add("@param_created_user_id", oEmployeeAttendancePolicy.created_user_id ?? 0, DbType.Int32);
            //parameters.Add("@param_DBOperation", nOperationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            return parameters;
        }

        //Insert and Update Record
        public async Task<dynamic> IUD(EmployeeAttendancePolicy oEmployeeAttendancePolicy)
        {
            var oMessage = new CommonMessage();
            var parameters = ParameterBinding(oEmployeeAttendancePolicy);

            try
            {
                _dbConnection.Open();
                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[PIMS].[SP_Employee_Attendance_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);                
                oMessage = CommonMessage.Message(data);

            }
            catch (Exception ex)
            {
                _dbConnection.Dispose();
                oMessage = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();
            }
            return oMessage;
        }

        //Get employee day off by employee id
        public async Task<dynamic> Get(long nEmployeeId)
        {
            var result = (dynamic)null;
            try
            {
                var sql = "SELECT * FROM PIMS.View_Employee_Attendance_Policy WHERE employee_id= @param_employee_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_employee_id", nEmployeeId);

                _dbConnection.Open();
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select EmployeeAttendancePolicyViewModel.ConvertToModel(dr)).ToList();
                }
            }
            catch (Exception ex)
            {
                _dbConnection.Dispose();
                throw ex.InnerException;                
            }
            finally
            {
                _dbConnection.Dispose();
            }
            return result;
        }
    }
}
