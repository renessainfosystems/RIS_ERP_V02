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
    public class EmployeeLeaveLedgerDataAccess
    {
        private readonly IDbConnection _dbConnection;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public EmployeeLeaveLedgerDataAccess(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        //Parameter binding
        public DynamicParameters ParameterBinding(EmployeeLeaveLedger oEmployeeLeaveLedger, int nOperationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (nOperationType == (int)GlobalEnumList.DBOperation.Create || nOperationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_employee_leave_ledger_id", oEmployeeLeaveLedger.employee_leave_ledger_id ?? 0, DbType.Int64);
                parameters.Add("@param_employee_id", oEmployeeLeaveLedger.employee_id ?? 0, DbType.Int64);
                parameters.Add("@param_leave_policy_id", oEmployeeLeaveLedger.leave_policy_id ?? 0, DbType.Int32);
                parameters.Add("@param_acs_id", oEmployeeLeaveLedger.acs_id ?? 0, DbType.Int32);
                parameters.Add("@param_leave_head_id", oEmployeeLeaveLedger.leave_head_id ?? 0, DbType.Int32);
                parameters.Add("@param_total_leave_days", oEmployeeLeaveLedger.total_leave_days ?? 0, DbType.Decimal);
                parameters.Add("@param_total_leave_min", oEmployeeLeaveLedger.total_leave_min ?? 0, DbType.Int32);
                parameters.Add("@param_applied_days", oEmployeeLeaveLedger.applied_days ?? 0, DbType.Decimal);
                parameters.Add("@param_applied_min", oEmployeeLeaveLedger.applied_min ?? 0, DbType.Int32);
                parameters.Add("@param_cancel_days", oEmployeeLeaveLedger.cancel_days ?? 0, DbType.Decimal);
                parameters.Add("@param_cancel_min", oEmployeeLeaveLedger.cancel_min ?? 0, DbType.Int32);
                parameters.Add("@param_enjoy_days", oEmployeeLeaveLedger.enjoy_days ?? 0, DbType.Decimal);
                parameters.Add("@param_enjoy_min", oEmployeeLeaveLedger.enjoy_min ?? 0, DbType.Int32);
                parameters.Add("@param_leave_balance_days", oEmployeeLeaveLedger.leave_balance_days ?? 0, DbType.Decimal);
                parameters.Add("@param_leave_balance_min", oEmployeeLeaveLedger.leave_balance_min ?? 0, DbType.Int32);
                parameters.Add("@param_eligible_leave_days", oEmployeeLeaveLedger.eligible_leave_days ?? 0, DbType.Decimal);
                parameters.Add("@param_eligible_leave_min", oEmployeeLeaveLedger.eligible_leave_min ?? 0, DbType.Int32);
                parameters.Add("@param_no_of_carry_year", oEmployeeLeaveLedger.no_of_carry_year ?? 0, DbType.Int32);
                parameters.Add("@param_is_active", oEmployeeLeaveLedger.is_active ?? true, DbType.Boolean);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                //parameters.Add("@param_created_user_id", oEmployeeLeaveLedger.created_user_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", nOperationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (nOperationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_employee_leave_ledger_id", oEmployeeLeaveLedger.employee_leave_ledger_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        //Get all employee leave ledger by employee id
        public async Task<dynamic> Gets(long nEmployeeId)
        {
            var result = (dynamic)null;
            try
            {
                var sql = "SELECT ELL.* FROM PIMS.View_Employee_Leave_Ledger ELL WHERE ELL.employee_id= @param_employee_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_employee_id", nEmployeeId);

                _dbConnection.Open();
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select EmployeeLeaveLedgerViewModel.ConvertToModel(dr)).ToList();
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
