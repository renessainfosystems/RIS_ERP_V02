using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IAttendanceBenefitPolicyRepository
    {
        Task<dynamic> GetAllAttendanceBenefitPolicy();
   
        Task<dynamic> GetAttendanceBenefitPolicyById(int abp_id);

        Task<dynamic> GetBenefitPolicyCode();
        Task<dynamic> GetAllAttBenefitPolicyForDP();
        Task<dynamic> IUD_Attendance_Benefit_Policy(AttendanceBenefitPolicy attendanceBenefitPolicy, int dbOperation);
    }
}
