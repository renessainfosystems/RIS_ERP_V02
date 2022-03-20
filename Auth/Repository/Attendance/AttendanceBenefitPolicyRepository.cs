using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class AttendanceBenefitPolicyRepository: IAttendanceBenefitPolicyRepository
    {
        protected AttendanceBenefitPolicyDataAccess _attendanceBenefitPolicyDataAccess { get; set; }

        //Data access initialize
        public AttendanceBenefitPolicyRepository(AttendanceBenefitPolicyDataAccess attendanceBenefitPolicyDataAccess)
        {
            _attendanceBenefitPolicyDataAccess = attendanceBenefitPolicyDataAccess;
        }

    

        public async Task<dynamic> GetAllAttendanceBenefitPolicy()
        {
            return await _attendanceBenefitPolicyDataAccess.GetAllAttendanceBenefitPolicy();
        }

        public async Task<dynamic> GetAttendanceBenefitPolicyById(int abp_id)
        {
            return await _attendanceBenefitPolicyDataAccess.GetAttendanceBenefitPolicyById(abp_id);
        }

        public  async Task<dynamic> GetBenefitPolicyCode()
        {
            return await _attendanceBenefitPolicyDataAccess.GetBenefitPolicyCode();
        }

        public async Task<dynamic> IUD_Attendance_Benefit_Policy(AttendanceBenefitPolicy attendanceBenefitPolicy, int dbOperation)
        {
            return await _attendanceBenefitPolicyDataAccess.IUD_Attendance_Benefit_Policy(attendanceBenefitPolicy, dbOperation);
        }
    }
    }

