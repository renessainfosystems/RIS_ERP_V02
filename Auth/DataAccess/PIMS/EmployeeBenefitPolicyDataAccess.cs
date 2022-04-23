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
    public class EmployeeBenefitPolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public EmployeeBenefitPolicyDataAccess(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        //Parameter binding
        public DynamicParameters ParameterBinding(EmployeeBenefitPolicy oEmployeeBenefitPolicy, int nOperationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (nOperationType == (int)GlobalEnumList.DBOperation.Create || nOperationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_employee_benefit_policy_id", oEmployeeBenefitPolicy.employee_benefit_policy_id ?? 0, DbType.Int32);
                parameters.Add("@param_employee_id", oEmployeeBenefitPolicy.employee_id ?? 0, DbType.Int64);
                parameters.Add("@param_abp_id", oEmployeeBenefitPolicy.abp_id ?? 0, DbType.Int32);
                parameters.Add("@param_is_active", oEmployeeBenefitPolicy.is_active, DbType.Boolean);
                parameters.Add("@param_start_date", oEmployeeBenefitPolicy.start_date, DbType.DateTime);
                parameters.Add("@param_end_date", oEmployeeBenefitPolicy.end_date, DbType.DateTime);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                //parameters.Add("@param_created_user_id", oEmployeeBenefitPolicy.created_user_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", nOperationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (nOperationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_employee_benefit_policy_id", oEmployeeBenefitPolicy.employee_benefit_policy_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        //Get all employee benifits by employee id
        public async Task<dynamic> Gets(long nEmployeeId)
        {
            var result = (dynamic)null;
            try
            {
                var sql = "SELECT EBP.* FROM PIMS.View_Employee_Benefit_Policy EBP WHERE EBP.employee_id = @param_employee_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_employee_id", nEmployeeId);

                _dbConnection.Open();
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select EmployeeBenefitPolicyViewModel.ConvertToModel(dr)).ToList();
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
