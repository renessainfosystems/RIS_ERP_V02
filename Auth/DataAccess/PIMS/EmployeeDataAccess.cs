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
    public class EmployeeDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public EmployeeDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters EmployeeParameterBinding(Employee Employee, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_pims_employee_id", Employee.employee_id, DbType.Int64);                
                parameters.Add("@param_pims_employee_code", Employee.code, DbType.String);
                parameters.Add("@param_pims_title_id_enum", Employee.title_enum_id, DbType.Int32);
                parameters.Add("@param_pims_first_name", Employee.first_name, DbType.String);
                parameters.Add("@param_pims_middle_name", Employee.middle_name, DbType.String);
                parameters.Add("@param_pims_sur_name", Employee.sur_name, DbType.String);
                parameters.Add("@param_pims_father_name", Employee.father_name, DbType.String);
                parameters.Add("@param_pims_mother_name", Employee.mother_name, DbType.String);
                parameters.Add("@param_pims_gender_id", Employee.gender_enum_id, DbType.Int32);
                parameters.Add("@param_pims_marital_status_id", Employee.marital_status_enum_id, DbType.Int32);
                parameters.Add("@param_pims_spouse_name", Employee.spouse_name, DbType.String);
                parameters.Add("@param_pims_date_of_marriage", Employee.date_of_marriage, DbType.Date);
                parameters.Add("@param_pims_personal_phone", Employee.personal_phone, DbType.String);
                parameters.Add("@param_pims_official_phone", Employee.official_phone, DbType.String);
                parameters.Add("@param_pims_personal_email", Employee.personal_email, DbType.String);
                parameters.Add("@param_pims_official_email", Employee.official_email, DbType.String);
                parameters.Add("@param_pims_date_of_birth", Employee.date_of_birth, DbType.Date);
                parameters.Add("@param_pims_identification_mark", Employee.identification_mark, DbType.String);
                parameters.Add("@param_pims_national_id", Employee.national_id, DbType.String);
                parameters.Add("@param_pims_passport_no", Employee.passport_no, DbType.String);
                parameters.Add("@param_pims_birth_id", Employee.birth_id, DbType.String);              
                parameters.Add("@param_pims_driving_license_no", Employee.driving_license_no, DbType.String);
                parameters.Add("@param_pims_nationality_id", Employee.nationality_id, DbType.Int32);
                parameters.Add("@param_pims_religion_id", Employee.religion_enum_id, DbType.Int32);
                parameters.Add("@param_pims_country_of_birth_id", Employee.country_of_birth_id, DbType.Int32);
                parameters.Add("@param_pims_blood_group_id", Employee.blood_group_enum_id, DbType.Int32);
                parameters.Add("@param_pims_ethnicity_id", Employee.ethnicity_id, DbType.Int32);
                parameters.Add("@param_pims_residentcial_status_id", Employee.residentcial_status_enum_id, DbType.Int32);
                parameters.Add("@param_pims_present_country_id", Employee.present_country_id, DbType.Int32);
                parameters.Add("@param_pims_present_division_id", Employee.present_division_id, DbType.Int32);
                parameters.Add("@param_pims_present_district_id", Employee.present_district_id, DbType.Int32);
                parameters.Add("@param_pims_present_city", Employee.present_city, DbType.String);
                parameters.Add("@param_pims_present_ps_area", Employee.present_ps_area, DbType.String);
                parameters.Add("@param_pims_present_post_code", Employee.present_post_code, DbType.String);

                parameters.Add("@param_pims_present_block", Employee.present_block, DbType.String);
                parameters.Add("@param_pims_present_road_no", Employee.present_road_no, DbType.String);
                parameters.Add("@param_pims_present_house_no", Employee.present_house_no, DbType.String);
                parameters.Add("@param_pims_present_flat_no", Employee.present_flat_no, DbType.String);
                parameters.Add("@param_pims_present_address_note", Employee.present_address_note, DbType.String);

                parameters.Add("@param_pims_permanent_country_id", Employee.permanent_country_id, DbType.Int32);
                parameters.Add("@param_pims_permanent_division_id", Employee.permanent_division_id, DbType.Int32);
                parameters.Add("@param_pims_permanent_district_id", Employee.permanent_district_id, DbType.Int32);
                parameters.Add("@param_pims_permanent_city", Employee.permanent_city, DbType.String);
                parameters.Add("@param_pims_permanent_ps_area", Employee.permanent_ps_area, DbType.String);

                parameters.Add("@param_pims_permanent_post_code", Employee.permanent_post_code, DbType.String);
                parameters.Add("@param_pims_permanent_block", Employee.permanent_block, DbType.String);
                parameters.Add("@param_pims_permanent_road_no", Employee.permanent_road_no, DbType.String);
                parameters.Add("@param_pims_permanent_house_no", Employee.permanent_house_no, DbType.String);
                parameters.Add("@param_pims_permanent_flat_no", Employee.permanent_flat_no, DbType.String);
                parameters.Add("@param_pims_permanent_address_note", Employee.permanent_address_note, DbType.String);
                //parameters.Add("@param_is_active", Employee.is_active, DbType.Byte);
                parameters.Add("@param_is_active", true, DbType.Byte);

                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_created_datetime", DateTime.Now, DbType.DateTime);

                parameters.Add("@param_employee_old_id", Employee.employee_old_id ?? 0, DbType.Int32);
                parameters.Add("@param_employee_old_code", Employee.employee_old_code ?? "", DbType.String);

                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);              
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_employee_image_path", Employee.employee_image_path, DbType.String);
                parameters.Add("@param_signature_image_path", Employee.signature_image_path, DbType.String);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_pims_employee_id", Employee.employee_id, DbType.Int64);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_pims_employee_id", Employee.employee_id, DbType.Int64);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }

        public async Task<dynamic> IUD_Employee(Employee Employee, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = EmployeeParameterBinding(Employee, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[PIMS].[SP_PIMS_Employee_IUD]", parameters, commandType: CommandType.StoredProcedure);
     


                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                {
                    return message = CommonMessage.SetSuccessMessage("Employee Approved");
                }

                if (data.Count > 0)
                {
                    //Return View Model 
                    List<dynamic> dataList = data;
                    var result = (dynamic)null;
                    result = (from dr in dataList select EmployeeViewModel.ConvertToModel(dr)).ToList();
                   // message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                    //end Return View Model
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

        public async Task<dynamic>  EmployeeActivity(long employee_id)
        {
            var message = new CommonMessage();
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];

            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@param_object_id", employee_id, DbType.Int64);
            parameters.Add("@param_shcema_name", "[PIMS]", DbType.String);
            parameters.Add("@param_table_name", "Employee", DbType.String);
            parameters.Add("@param_user_info_id", currentUserInfoId,DbType.Int32);
            parameters.Add("@param_pims_sur_name", "Employee active inactive", DbType.String);
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
        public async Task<dynamic> GetAllEmployee()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
  

            try
            {
                string sql = @"SELECT [employee_id] ,[code] ,[title_enum_id] ,[employee_name],[first_name],[middle_name],[sur_name],[father_name]
                            ,[mother_name],[gender_enum_id],[marital_status_enum_id],[spouse_name],[date_of_marriage],[personal_phone],[official_phone]
                            ,[personal_email],[official_email],[date_of_birth],[identification_mark],[national_id],[passport_no],[birth_id],[driving_license_no]
                            ,[nationality_id],[religion_enum_id],[country_of_birth_id],[blood_group_enum_id],[ethnicity_id],[residentcial_status_enum_id]
                            ,[present_country_id],[present_division_id],[present_district_id],[present_city],[present_ps_area],[present_post_code]
                            ,[present_block],[present_road_no],[present_house_no],[present_flat_no],[present_address_note],[permanent_country_id],[permanent_division_id]
                            ,[permanent_district_id],[permanent_city],[permanent_ps_area],[permanent_post_code],[permanent_block],[permanent_road_no],[permanent_house_no]
                            ,[permanent_flat_no],[permanent_address_note],[company_corporate_id],[company_group_id],[company_id],[created_user_id],[created_datetime]
                            ,[updated_user_id],[updated_datetime],[db_server_date_time],[is_active],[employee_old_id],[employee_old_code]FROM [PIMS].[Employee] O WHERE O.company_group_id =@company_group_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql,parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select EmployeeViewModel.ConvertToModel(dr)).ToList();

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

        public async Task<dynamic> GetEmployeeById(long employee_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT [employee_id] ,[code] ,[title_enum_id] ,[employee_name],[first_name],[middle_name],[sur_name],[father_name]
                        ,[mother_name],[gender_enum_id],[marital_status_enum_id],[spouse_name],[date_of_marriage],[personal_phone],[official_phone]
                        ,[personal_email],[official_email],[date_of_birth],[identification_mark],[national_id],[passport_no],[birth_id],[driving_license_no]
                        ,[nationality_id],[religion_enum_id],[country_of_birth_id],[blood_group_enum_id],[ethnicity_id],[residentcial_status_enum_id]
                        ,[present_country_id],[present_division_id],[present_district_id],[present_city],[present_ps_area],[present_post_code]
                        ,[present_block],[present_road_no],[present_house_no],[present_flat_no],[present_address_note],[permanent_country_id],[permanent_division_id]
                        ,[permanent_district_id],[permanent_city],[permanent_ps_area],[permanent_post_code],[permanent_block],[permanent_road_no],[permanent_house_no]
                        ,[permanent_flat_no],[permanent_address_note],[company_corporate_id],[company_group_id],[company_id],[created_user_id],[created_datetime]
                        ,[updated_user_id],[updated_datetime],[db_server_date_time],[is_active],[employee_old_id],[employee_old_code],[employee_image_path],[signature_image_path]FROM[PIMS].[Employee] O WHERE o.employee_id=@employee_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@employee_id", employee_id);

               // result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {

                    result = EmployeeViewModel.ConvertToModel(data);
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
        public async Task<dynamic> GetAllActiveEmployee()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            try
            {
                var sql = "SELECT * FROM PIMS.Employee O WHERE O.company_group_id =@company_group_id And is_active=1";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select EmployeeViewModel.ConvertToModel(dr)).ToList();

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

        public async Task<dynamic> GetEmployeeCboList()
        {
            var result = (dynamic)null;
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT e.employee_id,(e.code+' - '+ e.employee_name)employee_name
FROM PIMS.Employee e where e.is_active=1 and e.company_group_id=@company_group_id order by  e.employee_name";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = dataList;
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
