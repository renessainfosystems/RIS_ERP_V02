using Auth.Model.Attendance.Model;
using Auth.Utility.Attendance;
using Auth.Utility.Attendance.Enum;
using Dapper;
using DataAccess;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.DataAccess.Attendance
{
    public class AttendancePolicyAssignmentDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public AttendancePolicyAssignmentDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        public DynamicParameters attPolicyAssignmentParameterBinding(AttPolicyAssignment attPolicyAssignment, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
          

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_attendance_policy_organogram_id", attPolicyAssignment.attendance_policy_organogram_id, DbType.Int32);
                parameters.Add("@param_organogram_detail_id", attPolicyAssignment.organogram_detail_id, DbType.Int32);
                parameters.Add("@param_attendance_policy_id", attPolicyAssignment.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_attendance_policy_organogram_id", attPolicyAssignment.attendance_policy_organogram_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_attendance_policy_organogram_id", attPolicyAssignment.attendance_policy_organogram_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }


            return parameters;
        }

        public async Task<dynamic> IUD_Attendance_Policy_Assignment(AttPolicyAssignment attPolicyAssignment, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = attPolicyAssignmentParameterBinding(attPolicyAssignment, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                result = await _dbConnection.QueryFirstOrDefaultAsync("[Attendance].[Attendance_Policy_Organogram_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Approve)
                {
                    return message = CommonMessage.SetSuccessMessage("Policy Approved", result);
                }

                if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
                }
                else if (result != null && dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, result);
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
        public async Task<dynamic> GetAllAttendancePolicyOrganogram()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
           try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_company_group_id", company_group_id);
                parameters.Add("@param_company_id", company_id);
                var sql = " Select * from [Attendance].[View_Attendance_Policy_Organogram] s ORDER BY s.Attendance_Policy_Organogram_id DESC";
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
        public async Task<dynamic> GetAttendancePolicyOrganogramById(int attendance_policy_organogram_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = @"SELECT apo.*,o.location_id,o.department_id,o.company_id,o.company_group_id,od.position_id,cg.group_name from Attendance.Attendance_Policy_Organogram apo
                            INNER JOIN Administrative.Organogram_Detail od  on od.organogram_detail_id = apo.organogram_detail_id
                            INNER JOIN Administrative.Organogram o on o.organogram_id = od.organogram_id
                            INNER JOIN Administrative.Company_Group cg on cg.company_group_id = o.company_group_id
                            WHERE apo.attendance_policy_organogram_id = @param_attendance_policy_organogram_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_attendance_policy_organogram_id", attendance_policy_organogram_id);

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
        public async Task<dynamic> GetGroupNameById()
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            try
            {
                var sql = "Select company_group_id,group_name from Administrative.Company_Group WHERE company_group_id=@company_group_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);

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
        public async Task<dynamic> GetCompanyByOrganogram(OrganogramFilter organogramFilter)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
         
            try
            {
                var sql = @"SELECT company_id,company_name FROm Administrative.Company C WHERE C.company_id IN (
                            SELECT O.location_id FROM Administrative.Organogram O WHERE O.company_group_id = @company_group_id)";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", organogramFilter.company_group_id);

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
        public async Task<dynamic> GetLocationByOrganogram(OrganogramFilter organogramFilter)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
           
            try
            {
                var sql = @"SELECT location_id,location_name FROM 
                            Administrative.Location L WHERE L.location_id 
                            IN (SELECT O.location_id FROM Administrative.Organogram O 
                            WHERE O.company_id = @company_id AND O.company_group_id = @company_group_id)";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", organogramFilter.company_group_id);
                parameters.Add("@company_id", organogramFilter.company_id);

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
        public async Task<dynamic> GetDepartmentByOrganogram(OrganogramFilter organogramFilter)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            
            try
            {
                var sql = @"SELECT d.department_id,department_name FROM Administrative.Department D 
                            WHERE D.department_id IN(SELECT O.department_id
                            FROM Administrative.Organogram O
                            WHERE O.location_id= @location_id AND O.company_id= @company_id AND O.company_group_id= @company_group_id)";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", organogramFilter.company_group_id);
                parameters.Add("@company_id", organogramFilter.company_id);
                parameters.Add("@location_id", organogramFilter.location_id);
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
        public async Task<dynamic> GetPositionByOrganogram(OrganogramFilter organogramFilter)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
           
            try
            {
                var sql = @"SELECT OD.organogram_detail_id,OD.organogram_id,P.position_name,O.company_group_id,O.company_id,O.location_id,O.department_id,p.position_id 
                            FROM Administrative.Organogram_Detail OD
                            INNER JOIN Administrative.Organogram O ON OD.organogram_id = O.organogram_id
                            INNER JOIN Administrative.Position P ON OD.position_id = P.position_id
                            WHERE O.company_group_id = @company_group_id AND O.company_id = @company_id AND O.location_id = @location_id AND O.department_id = @department_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", organogramFilter.company_group_id);
                parameters.Add("@company_id", organogramFilter.company_id);
                parameters.Add("@location_id", organogramFilter.location_id);
                parameters.Add("@department_id", organogramFilter.department_id);
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
