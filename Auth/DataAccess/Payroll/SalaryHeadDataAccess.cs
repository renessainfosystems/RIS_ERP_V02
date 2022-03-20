using Auth.Model.Payroll;
using Auth.Utility.Payroll;
using Auth.Utility.Payroll.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.Payroll
{
    public class SalaryHeadDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public SalaryHeadDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
        public DynamicParameters SalaryHeadParameterBinding(SalaryHead salaryHead, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_salary_head_id", salaryHead.salary_head_id, DbType.Int32);
                parameters.Add("@param_salary_head_name", salaryHead.salary_head_name, DbType.String);
                parameters.Add("@param_salary_head_short_name", salaryHead.salary_head_short_name, DbType.String);
                parameters.Add("@param_name_in_local_language", salaryHead.name_in_local_language, DbType.String);
                parameters.Add("@param_salary_head_type_id", salaryHead.salary_head_type_id, DbType.Int32);
                parameters.Add("@param_sorting_priority", salaryHead.sorting_priority, DbType.Int32);
                parameters.Add("@param_remarks", salaryHead.remarks, DbType.String);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_salary_head_id", salaryHead.salary_head_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public async Task<dynamic> IUD_SalaryHead(SalaryHead salaryHead, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = SalaryHeadParameterBinding(salaryHead, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Payroll].[SP_Salary_Head_IUD]", parameters, commandType: CommandType.StoredProcedure);




                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }


                if (data!=null)
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


        public async Task<dynamic> GetAllSalaryHead()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {
                var sql = "SELECT salary_head_id,salary_head_name,h.salary_head_type_id,h.salary_head_type_name,sorting_priority FROM Payroll.Salary_Head s " +
                    " INNER JOIN[DBEnum].[Salary_Head_Type] h on s.salary_head_type_id = h.salary_head_type_id  WHERE company_group_id =@company_group_id ORDER BY salary_head_type_id,sorting_priority ASC,salary_head_id DESC";
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
        public async Task<dynamic> GetSalaryHeadById(int salary_head_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT [salary_head_id],[salary_head_name],[salary_head_short_name],[salary_head_type_id],[name_in_local_language],[remarks],[sorting_priority] " +
                    "FROM [Payroll].[Salary_Head] WHERE salary_head_id=@salary_head_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@salary_head_id", salary_head_id);

                result = await _dbConnection.QueryFirstOrDefaultAsync<dynamic>(sql, parameters);

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
        public async Task<dynamic> GetSalaryHeadForDP(int salary_head_type_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            try
            {
                var sql = "SELECT [salary_head_id],[salary_head_name]FROM [Payroll].[Salary_Head] WHERE company_group_id =@company_group_id AND salary_head_type_id=@salary_head_type_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                parameters.Add("@salary_head_type_id", salary_head_type_id);
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
