using Auth.Model.Attendance.Model;
using Auth.Model.Attendance.ViewModel;
using Auth.Utility;
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
    public class AttendanceCalendarDataAccess
    {

        private readonly IDbConnection _dbConnection;

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        protected readonly ApplicationDBContext _context;

        public AttendanceCalendarDataAccess(ApplicationDBContext context, IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
            _context = context;
        }

        //Parameter Binding
        public DynamicParameters AttendanceCalendarParameterBinding(AttendanceCalendar attendanceCalendar, int operationType)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];

            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@param_attendance_calendar_id", attendanceCalendar.attendance_calendar_id, DbType.Int32);
                parameters.Add("@param_attendance_calendar_name", attendanceCalendar.attendance_calendar_name, DbType.String);
                parameters.Add("@param_remarks", attendanceCalendar.remarks, DbType.String);
                parameters.Add("@param_is_active", attendanceCalendar.is_active, DbType.Boolean);
                parameters.Add("@param_created_user_info_id", currentUserInfoId ?? 0, DbType.Int32);
                parameters.Add("@param_company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@param_company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@param_DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@param_attendance_calendar_id", attendanceCalendar.attendance_calendar_id, DbType.Int32);
                parameters.Add("@param_DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }



        public async Task<dynamic> IUD_AttendanceCalendar(AttendanceCalendar attendanceCalendar, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = AttendanceCalendarParameterBinding(attendanceCalendar, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryFirstOrDefaultAsync("[Attendance].[SP_Attendance_Calendar_IUD]", parameters, commandType: CommandType.StoredProcedure);
                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data!=null)
                {
                    result = AttendanceCalendarViewModel.ConvertToModel(data);
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, result);
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

        public async Task<dynamic> GetAllAttendanceCalendar()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            try
            {
                var sql = "DECLARE @pv_is_shared BIT SELECT @pv_is_shared = is_shared from Auth.Software_Sharing_Policy " +
                    "SELECT  attendance_calendar_id,attendance_calendar_name,remarks,is_active FROM Attendance.Attendance_Calendar s " +
                    "WHERE S.company_group_id = CASE WHEN(@pv_is_shared = 1) THEN @company_group_id ELSE S.company_group_id END AND" +
                    " S.company_id = CASE WHEN(@pv_is_shared = 0) THEN @company_id ELSE S.company_id END ";
               
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                parameters.Add("@company_id", company_id);
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select AttendanceCalendarViewModel.ConvertToModel(dr)).ToList();

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
        public async Task<dynamic> GetAllActiveAttendanceCalendar()
        {
            var message = new CommonMessage();

            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            try
            {
                var sql = "DECLARE @pv_is_shared BIT SELECT @pv_is_shared = is_shared from Auth.Software_Sharing_Policy " +
                    "SELECT attendance_calendar_id, attendance_calendar_name FROM Attendance.Attendance_Calendar s " +
                    "WHERE S.is_active = 1 AND S.company_group_id = CASE WHEN(@pv_is_shared = 1) THEN @company_group_id ELSE S.company_group_id END " +
                    "AND S.company_id = CASE WHEN(@pv_is_shared = 0) THEN @company_id ELSE S.company_id END";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@company_group_id", company_group_id);
                parameters.Add("@company_id", company_id);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select AttendanceCalendarViewModel.ConvertToModel(dr)).ToList();

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
        public async Task<dynamic> GetAttendanceCalendarById(int attendance_calendar_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = " SELECT attendance_calendar_id,attendance_calendar_name,remarks,is_active " +
                    "FROM Attendance.Attendance_Calendar WHERE attendance_calendar_id = @attendance_calendar_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@attendance_calendar_id", attendance_calendar_id);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                if (data != null)
                {


                    result = AttendanceCalendarViewModel.ConvertToModel(data);


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

    }
}
