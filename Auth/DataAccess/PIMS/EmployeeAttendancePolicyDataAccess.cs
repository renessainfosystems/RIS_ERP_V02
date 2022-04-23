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
            var oResult = (dynamic)null;
            var parameters = ParameterBinding(oEmployeeAttendancePolicy);

            try
            {
                _dbConnection.Open();
                var oDataList = await _dbConnection.QueryMultipleAsync("[PIMS].[SP_Employee_Attendance_Policy_IUD]", parameters, commandType: CommandType.StoredProcedure);
                {
                    List<dynamic> oAttPolicys = oDataList.Read().ToList();
                    List<dynamic> oDayoffs = oDataList.Read().ToList();
                    List<dynamic> oBenefitPolicys = oDataList.Read().ToList();
                    List<dynamic> oLeaveLedgers = oDataList.Read().ToList();

                    if (oAttPolicys.Count > 0)
                    {
                        oResult = (from oObj in oAttPolicys select EmployeeAttendancePolicyViewModel.ConvertToModel(oObj)).Single();

                        List<EmployeeDayoffViewModel> oEmpDayoffs = new List<EmployeeDayoffViewModel>();
                        List<EmployeeBenefitPolicyViewModel> oEmpBenefitPolicys = new List<EmployeeBenefitPolicyViewModel>();
                        List<EmployeeLeaveLedgerViewModel> oEmpLeaveLedgers = new List<EmployeeLeaveLedgerViewModel>();

                        if (oDayoffs.Count > 0)
                        {
                            foreach (EmployeeDayoffViewModel oItem in (from oObj in oDayoffs select EmployeeDayoffViewModel.ConvertToModel(oObj)))
                            {
                                oEmpDayoffs.Add(oItem);
                            }
                            oResult.EmployeeDayoffViews = oEmpDayoffs;
                        }
                        if (oBenefitPolicys.Count > 0)
                        {
                            foreach (EmployeeBenefitPolicyViewModel oItem in (from oObj in oBenefitPolicys select EmployeeBenefitPolicyViewModel.ConvertToModel(oObj)))
                            {
                                oEmpBenefitPolicys.Add(oItem);
                            }
                            oResult.EmployeeBenefitPolicyViews = oEmpBenefitPolicys;
                        }
                        if (oLeaveLedgers.Count > 0)
                        {
                            foreach (EmployeeLeaveLedgerViewModel oItem in (from oObj in oLeaveLedgers select EmployeeLeaveLedgerViewModel.ConvertToModel(oObj)))
                            {
                                oEmpLeaveLedgers.Add(oItem);
                            }
                            oResult.EmployeeLeaveLedgerViews = oEmpLeaveLedgers;
                        }
                    }
                }
                oMessage = CommonMessage.Message(oDataList);
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
            var oResult = (dynamic)null;
            try
            {
                var sql = "SELECT * FROM PIMS.View_Employee_Attendance_Policy WHERE employee_id= @param_employee_id" +// Single Employee Attendance Policy 
                " SELECT * FROM PIMS.View_Employee_Dayoff WHERE employee_id=@param_employee_id;" +// Multiple Employee Day offs
                " SELECT * FROM PIMS.View_Employee_Benefit_Policy WHERE employee_id=@param_employee_id;" + // Multiple Employee benefits
                " SELECT * FROM PIMS.View_Employee_Leave_Ledger WHERE employee_id=@param_employee_id;"; //Multipla Employee Leave ledger
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_employee_id", nEmployeeId);

                _dbConnection.Open();
                var oDataList = await _dbConnection.QueryMultipleAsync(sql, parameters);
                if (oDataList != null)
                {
                    List<dynamic> oAttPolicys = oDataList.Read().ToList();
                    List<dynamic> oDayoffs = oDataList.Read().ToList();
                    List<dynamic> oBenefitPolicys = oDataList.Read().ToList();
                    List<dynamic> oLeaveLedgers = oDataList.Read().ToList();

                    if (oAttPolicys.Count > 0)
                    {
                        oResult = (from oObj in oAttPolicys select EmployeeAttendancePolicyViewModel.ConvertToModel(oObj)).Single();

                        List<EmployeeDayoffViewModel> oEmpDayoffs = new List<EmployeeDayoffViewModel>();
                        List<EmployeeBenefitPolicyViewModel> oEmpBenefitPolicys = new List<EmployeeBenefitPolicyViewModel>();
                        List<EmployeeLeaveLedgerViewModel> oEmpLeaveLedgers = new List<EmployeeLeaveLedgerViewModel>();

                        if (oDayoffs.Count > 0)
                        {
                            foreach (EmployeeDayoffViewModel oItem in (from oObj in oDayoffs select EmployeeDayoffViewModel.ConvertToModel(oObj)))
                            {
                                oEmpDayoffs.Add(oItem);
                            }
                            oResult.EmployeeDayoffViews = oEmpDayoffs;
                        }
                        if (oBenefitPolicys.Count > 0)
                        {
                            foreach (EmployeeBenefitPolicyViewModel oItem in (from oObj in oBenefitPolicys select EmployeeBenefitPolicyViewModel.ConvertToModel(oObj)))
                            {
                                oEmpBenefitPolicys.Add(oItem);
                            }
                            oResult.EmployeeBenefitPolicyViews = oEmpBenefitPolicys;
                        }
                        if (oLeaveLedgers.Count > 0)
                        {
                            foreach (EmployeeLeaveLedgerViewModel oItem in (from oObj in oLeaveLedgers select EmployeeLeaveLedgerViewModel.ConvertToModel(oObj)))
                            {
                                oEmpLeaveLedgers.Add(oItem);
                            }
                            oResult.EmployeeLeaveLedgerViews = oEmpLeaveLedgers;
                        }
                    }
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
            return oResult;
        }
    }
}
