using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Auth.Utility.Attendance;
using DataAccess;
using Dapper;
using Auth.Model.Attendance.Model;
using Auth.Utility.Attendance.Enum;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.DataAccess.Attendance
{
    public class AttendancePolicyDataAccess
    {
        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;
        public AttendancePolicyDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters AttendancePolicyParameterBinding(AttendancePolicy attendancePolicy, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_attendance_policy_id", attendancePolicy.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_policy_name", attendancePolicy.policy_name, DbType.String);
                parameters.Add("@param_code", attendancePolicy.code, DbType.String);
                parameters.Add("@param_remarks", attendancePolicy.remarks, DbType.String);
                parameters.Add("@param_attendance_calendar_id", attendancePolicy.attendance_calendar_id, DbType.Int32);
                parameters.Add("@param_late_early_policy_id", attendancePolicy.late_early_policy_id, DbType.Int32);
                parameters.Add("@param_absenteeism_policy_id", attendancePolicy.absenteeism_policy_id, DbType.Int32);
                parameters.Add("@param_roster_policy_id", attendancePolicy.roster_policy_id, DbType.Int32);
                parameters.Add("@param_is_random_dayoff", attendancePolicy.is_random_dayoff, DbType.Boolean);
                parameters.Add("@param_no_of_random_dayoff", attendancePolicy.no_of_random_dayoff, DbType.Int32);
                parameters.Add("@param_is_allow_benefit_policy", attendancePolicy.is_allow_benefit_policy, DbType.Boolean);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_attendance_policy_id", attendancePolicy.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Approve)
            {
                parameters.Add("@param_attendance_policy_id", attendancePolicy.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Approve);
            }

            else if (operationType == (int)GlobalEnumList.DBOperation.Copy)
            {
                parameters.Add("@param_attendance_policy_id", attendancePolicy.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Copy);
            }
            return parameters;
        }

        public DynamicParameters AttendancePolicyBenefitParameterBinding(AttendancePolicyBenefit attendance_Policy_Benefit, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];


            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_attendance_policy_benefit_id", attendance_Policy_Benefit.attendance_policy_benefit_id, DbType.Int32);
                parameters.Add("@param_attendance_policy_id", attendance_Policy_Benefit.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_abp_id", attendance_Policy_Benefit.abp_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_attendance_policy_benefit_id", attendance_Policy_Benefit.attendance_policy_benefit_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }
        public DynamicParameters AttendancePolicyLeaveParameterBinding(AttendancePolicyLeave attendance_Policy_Leave, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];


            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_attendance_policy_leave_id", attendance_Policy_Leave.attendance_policy_leave_id, DbType.Int32);
                parameters.Add("@param_attendance_policy_id", attendance_Policy_Leave.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_leave_policy_id", attendance_Policy_Leave.leave_policy_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_attendance_policy_leave_id", attendance_Policy_Leave.attendance_policy_leave_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }
        public DynamicParameters AttendancePolicyShiftParameterBinding(AttendancePolicyShift attendance_Policy_Shift, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];


            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_attendance_policy_shift_id", attendance_Policy_Shift.attendance_policy_shift_id, DbType.Int32);
                parameters.Add("@param_attendance_policy_id", attendance_Policy_Shift.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_shift_id", attendance_Policy_Shift.shift_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_attendance_policy_shift_id", attendance_Policy_Shift.attendance_policy_shift_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }
        public DynamicParameters AttendancePolicyDayoffParameterBinding(AttendancePolicyDayoff attendance_Policy_Dayoff, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];


            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_attendance_policy_dayoff_id", attendance_Policy_Dayoff.attendance_policy_dayoff_id, DbType.Int32);
                parameters.Add("@param_attendance_policy_id", attendance_Policy_Dayoff.attendance_policy_id, DbType.Int32);
                parameters.Add("@param_week_day", attendance_Policy_Dayoff.week_day, DbType.String);
                parameters.Add("@param_dayoff_type_id", attendance_Policy_Dayoff.dayoff_type_id, DbType.Byte);
                parameters.Add("@param_dayoff_alternative_id", attendance_Policy_Dayoff.dayoff_alternative_id, DbType.Byte);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_attendance_policy_dayoff_id", attendance_Policy_Dayoff.attendance_policy_dayoff_id, DbType.Int32);
                parameters.Add("@param_created_user_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }
        public async Task<dynamic> IUD_AttendancePolicy(AttendancePolicy attendancePolicy, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AttendancePolicyParameterBinding(attendancePolicy, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_AttendancePolicy_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)DBOperation.Create && attendancePolicy.attendance_Policy_Benefits != null)
                {
                    if (attendancePolicy.attendance_Policy_Benefits.Count > 0 && data.Count > 0)
                    {
                        foreach (AttendancePolicyBenefit item in attendancePolicy.attendance_Policy_Benefits)
                        {
                            item.attendance_policy_id = data[0].attendance_policy_id;
                            var slabParameters = AttendancePolicyBenefitParameterBinding(item, dbOperation);
                            dynamic slabData = _dbConnection.QueryFirstOrDefault<dynamic>("[Attendance].[SP_Attendance_Policy_Benefit_IUD]", slabParameters, commandType: CommandType.StoredProcedure);

                        }
                    }
                }
                if (dbOperation == (int)DBOperation.Create && attendancePolicy.attendance_Policy_Dayoffs != null)
                {
                    if (attendancePolicy.attendance_Policy_Dayoffs.Count > 0 && data.Count > 0)
                    {
                        foreach (AttendancePolicyDayoff item in attendancePolicy.attendance_Policy_Dayoffs)
                        {
                            item.attendance_policy_id = data[0].attendance_policy_id;
                            var slabParameters = AttendancePolicyDayoffParameterBinding(item, dbOperation);
                            dynamic slabData = _dbConnection.QueryFirstOrDefault<dynamic>("[Attendance].[SP_Attendance_Policy_Dayoff_IUD]", slabParameters, commandType: CommandType.StoredProcedure);

                        }
                    }
                }
                if (dbOperation == (int)DBOperation.Create && attendancePolicy.attendance_Policy_Shifts != null)
                {
                    if (attendancePolicy.attendance_Policy_Shifts.Count > 0 && data.Count > 0)
                    {
                        foreach (AttendancePolicyShift item in attendancePolicy.attendance_Policy_Shifts)
                        {
                            item.attendance_policy_id = data[0].attendance_policy_id;
                            var slabParameters = AttendancePolicyShiftParameterBinding(item, dbOperation);
                            dynamic slabData = _dbConnection.QueryFirstOrDefault<dynamic>("[Attendance].[SP_Attendance_Policy_Shift_IUD]", slabParameters, commandType: CommandType.StoredProcedure);

                        }
                    }
                }
                if (dbOperation == (int)DBOperation.Create && attendancePolicy.attendance_Policy_Leaves != null)
                {
                    if (attendancePolicy.attendance_Policy_Leaves.Count > 0 && data.Count > 0)
                    {
                        foreach (AttendancePolicyLeave item in attendancePolicy.attendance_Policy_Leaves)
                        {
                            item.attendance_policy_id = data[0].attendance_policy_id;
                            var slabParameters = AttendancePolicyLeaveParameterBinding(item, dbOperation);
                            dynamic slabData = _dbConnection.QueryFirstOrDefault<dynamic>("[Attendance].[SP_Attendance_Policy_Leave_IUD]", slabParameters, commandType: CommandType.StoredProcedure);

                        }
                    }
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                else if (dbOperation == (int)GlobalEnumList.DBOperation.Approve && data.Count > 0)
                {
                    return message = CommonMessage.SetSuccessMessage("Policy Approved", data);
                }

                else if (dbOperation == (int)GlobalEnumList.DBOperation.Create && data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else if (dbOperation == (int)GlobalEnumList.DBOperation.Update && data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, data);
                }
                else if (data != null && dbOperation == (int)GlobalEnumList.DBOperation.Copy)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonCopyMessage, data);
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

        public async Task<dynamic> IUD_AttendancePolicyBenefit(AttendancePolicyBenefit attendancePolicyBenefit, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AttendancePolicyBenefitParameterBinding(attendancePolicyBenefit, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Attendance_Policy_Benefit_IUD]", parameters, commandType: CommandType.StoredProcedure);


                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
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

        public async Task<dynamic> IUD_AttendancePolicyShift(AttendancePolicyShift attendancePolicyShift, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AttendancePolicyShiftParameterBinding(attendancePolicyShift, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Attendance_Policy_Shift_IUD]", parameters, commandType: CommandType.StoredProcedure);


                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
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
        public async Task<dynamic> IUD_AttendancePolicyLeave(AttendancePolicyLeave attendancePolicyLeave, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AttendancePolicyLeaveParameterBinding(attendancePolicyLeave, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Attendance_Policy_Leave_IUD]", parameters, commandType: CommandType.StoredProcedure);


                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
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

        public async Task<dynamic> IUD_AttendancePolicyDayoff(AttendancePolicyDayoff attendancePolicyDayoff, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = AttendancePolicyDayoffParameterBinding(attendancePolicyDayoff, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Attendance].[SP_Attendance_Policy_Dayoff_IUD]", parameters, commandType: CommandType.StoredProcedure);


                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
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

        public async Task<dynamic> GetAllAttendancePolicy()
        {
            var message = new CommonMessage();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = " SELECT * FROM [Attendance].[View_AttendancePolicies] s " +
                "WHERE S.company_group_id = CASE WHEN(isShared = 1) THEN @param_company_group_id ELSE S.company_group_id END AND S.company_id = CASE WHEN(isShared = 0) THEN @param_company_id ELSE S.company_id END ORDER BY S.attendance_policy_id DESC";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@param_company_group_id", company_group_id);
                parameters.Add("@param_company_id", company_id);
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


        public async Task<dynamic> GetAttendancePolicyById(int attendance_policy_id)
        {
            var message = new CommonMessage();

            var result = (dynamic)null;
            
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {


                var sql = "SELECT * FROM Attendance.Attendance_Policy WHERE attendance_policy_id= @attendance_policy_id " +
      "SELECT r.attendance_policy_benefit_id,r.attendance_policy_id,r.abp_id,s.abp_name FROM Attendance.Attendance_Policy_Benefit r " +
      "Inner join Attendance.Attendance_Benefit_Policy s on s.abp_id = r.abp_id " +
      "WHERE attendance_policy_id =@attendance_policy_id " +


      "SELECT r.attendance_policy_dayoff_id,r.attendance_policy_id,r.dayoff_type_id,r.week_day+'['+d.dayoff_type_name+']'+case when (da.dayoff_alternative_name is not null) then '['+da.dayoff_alternative_name+']' else '' end week_day FROM Attendance.Attendance_Policy_Dayoff r " +
      "Inner join DBEnum.Dayoff_Type d on d.dayoff_type_id = r.dayoff_type_id " +
      "left join DBEnum.Dayoff_Alternative da on da.dayoff_alternative_id=r.dayoff_alternative_id" +
      " WHERE attendance_policy_id = @attendance_policy_id " +

     " SELECT r.attendance_policy_leave_id,r.attendance_policy_id,r.leave_policy_id,l.leave_policy_name,lh.leave_head_short_name,l.default_leave_balance_day,CASE WHEN (is_activation_on_joining=1) then  'After'+' '+cast(activation_days as varchar)+' '+'days of joining' else 'After'+' '+cast(activation_days as varchar) +' '+'days of confirmation' end activationdays FROM Attendance.Attendance_Policy_Leave r " +
     " Inner join leave.Leave_Policy l on l.leave_policy_id = r.leave_policy_id " +
     "  inner join Leave.Leave_Head lh on l.leave_head_id=lh.leave_head_id" +
     " WHERE attendance_policy_id = @attendance_policy_id " +


     " SELECT r.attendance_policy_id,r.attendance_policy_shift_id,r.shift_id,s.shift_name FROM Attendance.Attendance_Policy_Shift r " +
     " INNER JOIN Attendance.Shift_Info s on s.shift_id = r.shift_id WHERE attendance_policy_id = @attendance_policy_id ";
           
             DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@attendance_policy_id", attendance_policy_id);
                using (var multi = await _dbConnection.QueryMultipleAsync(sql, parameters))
                {
                    result = multi.Read<AttendancePolicy>().Single();
                    var benefitPolicy = multi.Read<AttendancePolicyBenefit>().ToList();
                    var dayoffPolicy = multi.Read<AttendancePolicyDayoff>().ToList();
                    var leavePolicy = multi.Read<AttendancePolicyLeave>().ToList();
                    var shiftPolicy = multi.Read<AttendancePolicyShift>().ToList();
                 
                   

                    result.attendance_Policy_Shifts=shiftPolicy;
                    result.attendance_Policy_Benefits = benefitPolicy;
                    result.attendance_Policy_Leaves = leavePolicy;
                    result.attendance_Policy_Dayoffs = dayoffPolicy;
      
                    
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


        public async Task<dynamic> GetAttendancePolicyCode()
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            try
            {
                var sql = "SELECT ((SELECT company_corporate_short_name FROM Administrative.Company_Corporate " +
                    "WHERE company_corporate_id = @company_corporate_id)+'-' + '1000' + '' + (SELECT Convert(nvarchar, ISNULL(MAX(ISNULL([attendance_policy_id], 0)), 0) + 1) FROM Attendance.Attendance_Policy)) as code";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_corporate_id", company_corporate_id);

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
    }
}
