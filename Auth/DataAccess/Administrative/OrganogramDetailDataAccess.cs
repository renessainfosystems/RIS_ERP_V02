using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using Auth.Utility;
using Auth.Utility.Administrative.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.Administrative
{ 
    public class OrganogramDetailDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public OrganogramDetailDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }
         
        //Parameter Binding
        public DynamicParameters OrganogramDetailParameterBinding(OrganogramDetail organogram, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_organogram_detail_id", organogram.organogram_detail_id, DbType.Int32);
                parameters.Add("@param_organogram_id", organogram.organogram_id, DbType.Int32);
                parameters.Add("@param_code", organogram.code, DbType.String);
                parameters.Add("@param_position_id", organogram.position_id, DbType.Int32);
                parameters.Add("@param_min_no_of_manpower", organogram.min_no_of_manpower ?? 0, DbType.Int32);
                parameters.Add("@param_max_no_of_manpower", organogram.max_no_of_manpower ?? 0, DbType.Int32);
                parameters.Add("@param_min_budget", organogram.min_budget ?? 0, DbType.Decimal);
                parameters.Add("@param_max_budget", organogram.max_budget ?? 0, DbType.Decimal);
                parameters.Add("@param_min_year_of_experience", organogram.min_year_of_experience ?? 0, DbType.Int32);
                parameters.Add("@param_max_year_of_experience", organogram.max_year_of_experience ?? 0, DbType.Int32);               
                parameters.Add("@param_is_open", organogram.is_open, DbType.Byte);
                parameters.Add("@param_increment_percentage_yearly", organogram.increment_percentage_yearly, DbType.Decimal);
                parameters.Add("@param_is_gross", organogram.is_gross, DbType.Byte);                 
                parameters.Add("@param_salary_head_id", organogram.salary_head_id ?? 0, DbType.Int32);
                parameters.Add("@param_is_active", organogram.is_active, DbType.Byte);
                parameters.Add("@param_days_of_confirmation", organogram.days_of_confirmation, DbType.Int32);              
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_organogram_detail_id", organogram.organogram_detail_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_organogram_detail_id", organogram.organogram_detail_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }
            return parameters;
        }
        public async Task<dynamic> IUD_OrganogramDetail(OrganogramDetail Organogram, int dbOperation)
        {
            var message = new CommonMessage();
            var parameters = OrganogramDetailParameterBinding(Organogram, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {
                dynamic data = await _dbConnection.QueryAsync("[Administrative].[SP_Organogram_Detail_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                {
                    return message = CommonMessage.SetSuccessMessage("Organogram Detail Approved");
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

        public async Task<dynamic> OrganogramDetailActivity(long Organogram_id)
        {
            var message = new CommonMessage();
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@param_shcema_name", "[Administrative]", DbType.String);
            parameters.Add("@param_table_name", "Organogram", DbType.String);
            parameters.Add("@param_object_id", Organogram_id, DbType.Int32);
            parameters.Add("@param_user_info_id", currentUserInfoId, DbType.Int32);
            parameters.Add("@param_remarks", "Organogram active inactive", DbType.String);
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
        public async Task<dynamic> GetAllOrganogramDetail(int organogramid)
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {               
                string sql = @"select od.code,p.position_name,convert(varchar,od.min_no_of_manpower)+' - ' +convert(varchar,od.max_no_of_manpower) manpower,
convert(varchar,od.min_budget)+' - ' +convert(varchar,od.max_budget) budget,
convert(varchar,od.increment_percentage_yearly)+' % of '+ case when od.is_gross=1 then ' Gross' else 'need Sal head' end as  Increment,
case when od.is_open=1 then 'Open' else 'Deferred' end as Position,case when od.is_active=1 then 'Active' else 'Inactive' end Activity,
convert(varchar,od.min_year_of_experience)+' - ' +convert(varchar,od.max_year_of_experience) Experience,od.organogram_id,od.position_id,od.organogram_detail_id
from Administrative.Organogram_Detail od 
left join Administrative.Position p on od.position_id=p.position_id 
where od.organogram_id=@organogramid order by od.organogram_detail_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@organogramid", organogramid);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select OrganogramDetailViewModel.ConvertToModel(dr)).ToList();                    
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

        public async Task<dynamic> GetOrganogramDetailById(int Organogram_Detail_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"select od.code,p.position_name,convert(varchar,od.min_no_of_manpower)+' - ' +convert(varchar,od.max_no_of_manpower) manpower,
convert(varchar,od.min_budget)+' - ' +convert(varchar,od.max_budget) budget,
convert(varchar,od.increment_percentage_yearly)+' % of '+ case when od.is_gross=1 then ' Gross' else 'need Sal head' end as  Increment,
case when od.is_open=1 then 'Open' else 'Deferred' end as Position,case when od.is_active=1 then 'Active' else 'Inactive' end Activity,
convert(varchar,od.min_year_of_experience)+' - ' +convert(varchar,od.max_year_of_experience) Experience,od.organogram_id,od.position_id,od.organogram_detail_id
from Administrative.Organogram_Detail od 
left join Administrative.Position p on od.position_id=p.position_id 
where od.organogram_detail_id=@Organogram_Detail_id order by od.organogram_detail_id";
              
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Organogram_Detail_id", Organogram_Detail_id);

                // result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {

                    result = OrganogramDetailViewModel.ConvertToModel(data);
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

            return result;
        }
        public async Task<dynamic> GetAllActiveOrganogram(int Organogram_id)
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            //var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            try
            {
                var sql = @"select od.code,p.position_name,convert(varchar,od.min_no_of_manpower)+' - ' +convert(varchar,od.max_no_of_manpower) manpower,
convert(varchar,od.min_budget)+' - ' +convert(varchar,od.max_budget) budget,
convert(varchar,od.increment_percentage_yearly)+' % of '+ case when od.is_gross=1 then ' Gross' else 'need Sal head' end as  Increment,
case when od.is_open=1 then 'Open' else 'Deferred' end as Position,case when od.is_active=1 then 'Active' else 'Inactive' end Activity,
convert(varchar,od.min_year_of_experience)+' - ' +convert(varchar,od.max_year_of_experience) Experience,od.organogram_id,od.position_id,od.organogram_detail_id
from Administrative.Organogram_Detail od 
left join Administrative.Position p on od.position_id=p.position_id 
where od.organogram_id=@organogramid and od.is_active=1 order by od.organogram_detail_id";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@organogramid", Organogram_id);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select OrganogramDetailViewModel.ConvertToModel(dr)).ToList();

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
        
    }
}
