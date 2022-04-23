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
    public class EmployeeOfficialDataAccess
    {
        private readonly IDbConnection _dbConnection;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public EmployeeOfficialDataAccess(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        //Parameter binding
        public DynamicParameters ParameterBinding(EmployeeOfficial oEmployeeOfficial, int nOperationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (nOperationType == (int)GlobalEnumList.DBOperation.Create || nOperationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_employee_id", oEmployeeOfficial.employee_id ?? 0, DbType.Int64);
                parameters.Add("@param_organogram_detail_id", oEmployeeOfficial.organogram_detail_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", oEmployeeOfficial.company_id ?? 0, DbType.Int32);
                parameters.Add("@param_location_id", oEmployeeOfficial.location_id ?? 0, DbType.Int32);
                parameters.Add("@param_department_id", oEmployeeOfficial.department_id ?? 0, DbType.Int32);
                parameters.Add("@param_position_id", oEmployeeOfficial.position_id ?? 0, DbType.Int32);
                parameters.Add("@param_designation_id", oEmployeeOfficial.designation_id ?? 0, DbType.Int32);
                parameters.Add("@param_job_domicile_id", oEmployeeOfficial.job_domicile_id ?? 0, DbType.Int32);
                parameters.Add("@param_service_type_id", oEmployeeOfficial.service_type_id ?? 0, DbType.Int32);
                parameters.Add("@param_confirmation_status_id", oEmployeeOfficial.confirmation_status_id ?? 0, DbType.Int32);
                parameters.Add("@param_working_action_id", oEmployeeOfficial.working_action_id ?? 0, DbType.Int32);
                parameters.Add("@param_job_location_id", oEmployeeOfficial.job_location_id ?? 0, DbType.Int32);
                parameters.Add("@param_date_of_join", oEmployeeOfficial.date_of_join, DbType.DateTime);
                parameters.Add("@param_date_of_confirmation", oEmployeeOfficial.date_of_confirmation, DbType.DateTime);
                //parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_created_user_id", oEmployeeOfficial.created_user_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", nOperationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (nOperationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_employee_id", oEmployeeOfficial.employee_id ?? 0, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        //Insert, Update and Delete record
        public async Task<dynamic> IUD(EmployeeOfficial oEmployeeOfficial, int nDBOperation)
        {
            var oResult = (dynamic)null;
            var oMessage = new CommonMessage();
            var parameters = ParameterBinding(oEmployeeOfficial,nDBOperation);
            
            try
            {
                _dbConnection.Open();
                var oDataList = await _dbConnection.QueryMultipleAsync("[PIMS].[SP_Employee_Official_IUD]", parameters, commandType: CommandType.StoredProcedure);
                if (oDataList != null)
                {
                    oResult = oDataList.Read<EmployeeOfficial>().Single();
                    List<dynamic> oAttPolicys = oDataList.Read().ToList();
                    List<dynamic> oDayoffs = oDataList.Read().ToList();
                    List<dynamic> oBenefitPolicys = oDataList.Read().ToList();
                    List<dynamic> oLeaveLedgers = oDataList.Read().ToList();

                    oResult.EmployeeAttendancePolicyView = (from oObj in oAttPolicys select EmployeeAttendancePolicyViewModel.ConvertToModel(oObj)).Single();

                    List<EmployeeDayoffViewModel> oEmpDayoffs = new List<EmployeeDayoffViewModel>();
                    List<EmployeeBenefitPolicyViewModel> oEmpBenefitPolicys = new List<EmployeeBenefitPolicyViewModel>();
                    List<EmployeeLeaveLedgerViewModel> oEmpLeaveLedgers = new List<EmployeeLeaveLedgerViewModel>();

                    if (oDayoffs != null)
                    {
                        foreach (EmployeeDayoffViewModel oItem in (from oObj in oDayoffs select EmployeeDayoffViewModel.ConvertToModel(oObj)))
                        {
                            oEmpDayoffs.Add(oItem);
                        }
                        oResult.EmployeeAttendancePolicyView.EmployeeDayoffViews = oEmpDayoffs;
                    }
                    if (oBenefitPolicys != null)
                    {
                        foreach (EmployeeBenefitPolicyViewModel oItem in (from oObj in oBenefitPolicys select EmployeeBenefitPolicyViewModel.ConvertToModel(oObj)))
                        {
                            oEmpBenefitPolicys.Add(oItem);
                        }
                        oResult.EmployeeAttendancePolicyView.EmployeeBenefitPolicyViews = oEmpBenefitPolicys;
                    }
                    if (oLeaveLedgers != null)
                    {
                        foreach (EmployeeLeaveLedgerViewModel oItem in (from oObj in oLeaveLedgers select EmployeeLeaveLedgerViewModel.ConvertToModel(oObj)))
                        {
                            oEmpLeaveLedgers.Add(oItem);
                        }
                        oResult.EmployeeAttendancePolicyView.EmployeeLeaveLedgerViews = oEmpLeaveLedgers;
                    }
                }

                oMessage = CommonMessage.Message(nDBOperation, oResult);
            }
            catch(Exception ex)
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

        //Get employee official by employee id
        public async Task<dynamic> Get(long nEmployeeId)
        {
            var oResult = (dynamic)null;
            try
            {
                var sql = "SELECT [employee_id],[organogram_detail_id],[company_id],[location_id],[department_id],[position_id],[designation_id],[job_domicile_id]" +
                            ",[service_type_id],[confirmation_status_id],[working_action_id],[job_location_id],FORMAT([date_of_join],'dd-MMM-yyyy') AS [date_of_join],FORMAT([date_of_confirmation],'dd-MMM-yyyy') AS [date_of_confirmation],[created_user_id]" +
                            " FROM [PIMS].[Employee_Official]" +
                            " WHERE [employee_id] = @param_employee_id;" +

                            " SELECT * FROM PIMS.View_Employee_Attendance_Policy WHERE employee_id=@param_employee_id;"+
                            
                            " SELECT * FROM PIMS.View_Employee_Dayoff WHERE employee_id=@param_employee_id;" +

                            " SELECT * FROM PIMS.View_Employee_Benefit_Policy WHERE employee_id=@param_employee_id;" +

                            " SELECT * FROM PIMS.View_Employee_Leave_Ledger WHERE employee_id=@param_employee_id;";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_employee_id", nEmployeeId);

                _dbConnection.Open();
                var oDataList = await _dbConnection.QueryMultipleAsync(sql, parameters);
                if (oDataList != null)
                {
                    oResult = oDataList.Read<EmployeeOfficial>().Single();
                    List<dynamic> oAttPolicys = oDataList.Read().ToList();
                    List<dynamic> oDayoffs = oDataList.Read().ToList();
                    List<dynamic> oBenefitPolicys = oDataList.Read().ToList();
                    List<dynamic> oLeaveLedgers = oDataList.Read().ToList();

                    if (oAttPolicys.Count > 0)
                    {
                        oResult.EmployeeAttendancePolicyView = (from oObj in oAttPolicys select EmployeeAttendancePolicyViewModel.ConvertToModel(oObj)).Single();

                        List<EmployeeDayoffViewModel> oEmpDayoffs = new List<EmployeeDayoffViewModel>();
                        List<EmployeeBenefitPolicyViewModel> oEmpBenefitPolicys = new List<EmployeeBenefitPolicyViewModel>();
                        List<EmployeeLeaveLedgerViewModel> oEmpLeaveLedgers = new List<EmployeeLeaveLedgerViewModel>();

                        if (oDayoffs.Count > 0)
                        {
                            foreach (EmployeeDayoffViewModel oItem in (from oObj in oDayoffs select EmployeeDayoffViewModel.ConvertToModel(oObj)))
                            {
                                oEmpDayoffs.Add(oItem);
                            }
                            oResult.EmployeeAttendancePolicyView.EmployeeDayoffViews = oEmpDayoffs;
                        }
                        if (oBenefitPolicys.Count > 0)
                        {
                            foreach (EmployeeBenefitPolicyViewModel oItem in (from oObj in oBenefitPolicys select EmployeeBenefitPolicyViewModel.ConvertToModel(oObj)))
                            {
                                oEmpBenefitPolicys.Add(oItem);
                            }
                            oResult.EmployeeAttendancePolicyView.EmployeeBenefitPolicyViews = oEmpBenefitPolicys;
                        }
                        if (oLeaveLedgers.Count > 0)
                        {
                            foreach (EmployeeLeaveLedgerViewModel oItem in (from oObj in oLeaveLedgers select EmployeeLeaveLedgerViewModel.ConvertToModel(oObj)))
                            {
                                oEmpLeaveLedgers.Add(oItem);
                            }
                            oResult.EmployeeAttendancePolicyView.EmployeeLeaveLedgerViews = oEmpLeaveLedgers;
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
