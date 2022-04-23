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
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                //parameters.Add("@param_created_user_id", oEmployeeOfficial.created_user_id ?? 0, DbType.Int32);
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
            //var oResultList = (dynamic)null;
            var oMessage = new CommonMessage();
            var parameters = ParameterBinding(oEmployeeOfficial,nDBOperation);
            
            try
            {
                _dbConnection.Open();
                dynamic data = await _dbConnection.QueryMultipleAsync("[PIMS].[SP_Employee_Official_IUD]", parameters, commandType: CommandType.StoredProcedure);
                //dynamic oDataList = await _dbConnection.QueryMultipleAsync("[PIMS].[SP_Employee_Official_IUD]", parameters, commandType: CommandType.StoredProcedure);

                //if (oDataList != null)
                //{
                //    oResultList = oDataList.Read<EmployeeOfficial>().Single();
                //    List<dynamic> dataList = oDataList.Read();
                //    result = (from dr in dataList select EmployeeDayoffViewModel.ConvertToModel(dr)).ToList();
                //    List<dynamic> oEmpAttPolicy=


                //    var oEmployeeAttendancePolicyView = oDataList.Read<EmployeeAttendancePolicyViewModel>().Single();
                //    var oEmployeeDayoffViews = oDataList.Read<EmployeeDayoffViewModel>().ToList();
                //    var oEmployeeBenefitPolicyViews = oDataList.Read<EmployeeBenefitPolicyViewModel>().ToList();
                //    var oEmployeeLeaveLedgerViews = oDataList.Read<EmployeeLeaveLedgerViewModel>().ToList();

                //    var abc = oEmployeeOfficial.EmployeeAttendancePolicyView

                //    oResultList.EmployeeAttendancePolicyView = oEmployeeAttendancePolicyView;
                //    oResultList.attendance_Policy_Benefits = benefitPolicy;
                //    oResultList.attendance_Policy_Leaves = leavePolicy;
                //    oResultList.attendance_Policy_Dayoffs = dayoffPolicy;
                //}

                oMessage = CommonMessage.Message(nDBOperation, data);
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
            var result = (dynamic)null;
            try
            {
                var sql = "SELECT [employee_id],[organogram_detail_id],[company_id],[location_id],[department_id],[position_id],[designation_id],[job_domicile_id]" +
                            ",[service_type_id],[confirmation_status_id],[working_action_id],[job_location_id],FORMAT([date_of_join],'dd-MMM-yyyy') AS [date_of_join],FORMAT([date_of_confirmation],'dd-MMM-yyyy') AS [date_of_confirmation],[created_user_id]" +
                            " FROM [PIMS].[Employee_Official]" +
                            " WHERE [employee_id] = @param_employee_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_employee_id", nEmployeeId);

                _dbConnection.Open();
                result = await _dbConnection.QueryFirstOrDefaultAsync<dynamic>(sql, parameters);
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
