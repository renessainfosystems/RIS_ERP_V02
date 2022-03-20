using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Attendance.Model;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class ShiftBreakRepository : IShiftBreakRepository
    {
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        private readonly IEntityDataAccess<ShiftBreak> _entityDataAccess;

        public ShiftBreakRepository(
            IEntityDataAccess<ShiftBreak> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;


        }
        public void Add(ShiftBreak shiftBreak)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
                var company_id = _httpContextAccessor.HttpContext.Items["company_id"];


                shiftBreak.created_user_id = (long)currentUserInfoId;
                shiftBreak.company_corporate_id = (int)company_corporate_id;
                shiftBreak.company_group_id = (int)company_group_id;
                shiftBreak.company_id = (int)company_id;
                shiftBreak.shift_break_head_id = GetAutoId();

                _entityDataAccess.Add(shiftBreak);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_Shift_Break_Head_Name"))
                    throw new Exception("This break name(" + shiftBreak.head_name + ") is already exists.");

                else
                    throw new Exception(ex.Message);
            }
        }

        public void Delete(int shift_break_head_id)
        {
            ShiftBreak shiftBreak = new ShiftBreak() { shift_break_head_id = shift_break_head_id };
            _entityDataAccess.Remove(shiftBreak);
        }

        public IEnumerable<dynamic> GetAllShiftBreak()
        {
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"]??0;
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"] ?? 0;
   
            var sql = "DECLARE @pv_is_shared BIT SELECT @pv_is_shared = is_shared from Auth.Software_Sharing_Policy select *from Attendance.Shift_Break_Head s " +
                "WHERE   S.company_group_id = CASE WHEN(@pv_is_shared = 1) THEN @p1 ELSE S.company_group_id END AND " +
                "S.company_id = CASE WHEN(@pv_is_shared = 0) THEN @p0 ELSE S.company_id END";
            return _entityDataAccess.SqlQueryGet(sql , parameters: new[] { company_id, company_group_id });
          
        }
        public IEnumerable<dynamic> GetAllActiveBreakForDP()
        {
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"] ?? 0;
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"]??0;

            var sql = "DECLARE @pv_is_shared BIT SELECT @pv_is_shared = is_shared from Auth.Software_Sharing_Policy select  * from Attendance.Shift_Break_Head s " +
                     "WHERE   S.company_group_id = CASE WHEN(@pv_is_shared = 1) THEN @p1 ELSE S.company_group_id END AND " +
                     "S.company_id = CASE WHEN(@pv_is_shared = 0) THEN @p0 ELSE S.company_id END";
            return _entityDataAccess.SqlQueryGet(sql, parameters: new[] { company_id, company_group_id });

            //return from c in _entityDataAccess.GetAll().ToList()
            //       where c.company_group_id == (int)company_group_id
            //       select new { c.shift_break_head_id, c.head_name};

        }


        public ShiftBreak GetById(int shift_break_head_id)
        {
            return _entityDataAccess.GetById(shift_break_head_id);
        }


        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.shift_break_head_id).ToList();
                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                return id;
            }
            catch (Exception)
            {
                throw;
            }

        }



        public int ShiftBreakActivity(int shift_break_head_id)
        {
            var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var shcema_name = new SqlParameter { ParameterName = "@param_shcema_name", Value = "[Attendance]" ?? (object)DBNull.Value };
            var table_name = new SqlParameter { ParameterName = "@param_table_name", Value = "Shift_Break_Head" ?? (object)DBNull.Value };
            var object_id = new SqlParameter { ParameterName = "@param_object_id", Value = shift_break_head_id };
            var user_info_id = new SqlParameter { ParameterName = "@param_user_info_id", Value = (long)currentUserInfoId };
            var remarks = new SqlParameter { ParameterName = "@param_remarks", Value = "Shift Breakup active inactive" ?? (object)DBNull.Value };
            var created_datetime = new SqlParameter { ParameterName = "@param_created_datetime", Value = DateTime.Now };


            return _entityDataAccess.ExecuteSqlRaw("EXEC [Administrative].SP_Activity @p0,@p1,@p2,@p3,@p4,@p5", parameters: new[] { shcema_name.Value, table_name.Value, object_id.Value, user_info_id.Value, remarks.Value, created_datetime.Value });
        }



    }
}
