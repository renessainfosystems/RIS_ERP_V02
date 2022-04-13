using Auth.Model.PIMS.Model;
using Auth.Model.PIMS.ViewModel;
using Auth.Utility;
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
        public DynamicParameters EmployeeOfficialParameterBinding(EmployeeOfficial oEmployeeOfficial, int nOperationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (nOperationType == (int)GlobalEnumList.DBOperation.Create || nOperationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_employee_id", oEmployeeOfficial.employee_id, DbType.Int64);
                parameters.Add("@param_organogram_detail_id", oEmployeeOfficial.organogram_detail_id, DbType.Int32);
                parameters.Add("@param_company_id", oEmployeeOfficial.company_id, DbType.Int32);
                parameters.Add("@param_location_id", oEmployeeOfficial.location_id, DbType.Int32);
                parameters.Add("@param_department_id", oEmployeeOfficial.department_id, DbType.Int32);
                parameters.Add("@param_position_id", oEmployeeOfficial.position_id, DbType.Int32);
                parameters.Add("@param_designation_id", oEmployeeOfficial.designation_id, DbType.Int32);
                parameters.Add("@param_job_domicile_id", oEmployeeOfficial.job_domicile_id, DbType.Int32);
                parameters.Add("@param_service_type_id", oEmployeeOfficial.service_type_id, DbType.Int32);
                parameters.Add("@param_confirmation_status_id", oEmployeeOfficial.confirmation_status_id, DbType.Int32);
                parameters.Add("@param_working_action_id", oEmployeeOfficial.working_action_id, DbType.Int32);
                parameters.Add("@param_job_location_id", oEmployeeOfficial.job_location_id, DbType.Int32);
                parameters.Add("@param_date_of_join", oEmployeeOfficial.date_of_join, DbType.DateTime);
                parameters.Add("@param_date_of_confirmation", oEmployeeOfficial.date_of_confirmation, DbType.DateTime);
                parameters.Add("@param_created_user_id", oEmployeeOfficial.created_user_id, DbType.Int32);
                parameters.Add("@param_DBOperation", nOperationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (nOperationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_employee_id", oEmployeeOfficial.employee_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

    }
}
