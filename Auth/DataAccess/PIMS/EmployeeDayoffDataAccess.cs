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
    public class EmployeeDayoffDataAccess
    {
        private readonly IDbConnection _dbConnection;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public EmployeeDayoffDataAccess(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        //Parameter binding
        public DynamicParameters ParameterBinding(EmployeeDayoff oEmployeeDayoff, int nOperationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (nOperationType == (int)GlobalEnumList.DBOperation.Create || nOperationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_employee_dayoff_id", oEmployeeDayoff.employee_dayoff_id ?? 0, DbType.Int32);
                parameters.Add("@param_employee_id", oEmployeeDayoff.employee_id ?? 0, DbType.Int64);
                parameters.Add("@param_week_day", oEmployeeDayoff.week_day, DbType.String);
                parameters.Add("@param_dayoff_type_id", oEmployeeDayoff.dayoff_type_id ?? 0, DbType.Int32);
                parameters.Add("@param_dayoff_alternative_id", oEmployeeDayoff.dayoff_alternative_id ?? 0, DbType.Int32);
                parameters.Add("@param_is_active", oEmployeeDayoff.is_active, DbType.Boolean);   
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                //parameters.Add("@param_created_user_id", oEmployeeDayoff.created_user_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", nOperationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (nOperationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_employee_dayoff_id", oEmployeeDayoff.employee_dayoff_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        //Get employee day off by employee id
        public async Task<dynamic> Gets(long nEmployeeId)
        {
            var result = (dynamic)null;
            try
            {
                var sql = "SELECT ED.employee_dayoff_id,ED.employee_id,ED.week_day,ED.dayoff_type_id,ED.dayoff_alternative_id,ED.is_active" +
                    ",ED.employee_code,ED.employee_name,ED.dayoff_type_name,ED.dayoff_alternative_name FROM PIMS.VIEW_Employee_Dayoff ED " +
                    " WHERE ED.[employee_id] = @param_employee_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_employee_id", nEmployeeId);

                _dbConnection.Open();
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select EmployeeDayoffViewModel.ConvertToModel(dr)).ToList();
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
