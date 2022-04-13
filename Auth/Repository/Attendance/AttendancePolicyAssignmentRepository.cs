using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class AttendancePolicyAssignmentRepository:IAttendancePolicyAssignmentRepository
    {
        protected AttendancePolicyAssignmentDataAccess _policyAssignmentDataAccess { get; set; }

        //Data access initialize
        public AttendancePolicyAssignmentRepository(AttendancePolicyAssignmentDataAccess policyAssignmentDataAccess)
        {
            _policyAssignmentDataAccess = policyAssignmentDataAccess;
        }

        public async Task<dynamic> IUD_Attendance_Policy_Assignment(AttPolicyAssignment attPolicyAssignment, int dbOperation)
        {
            return await _policyAssignmentDataAccess.IUD_Attendance_Policy_Assignment(attPolicyAssignment, dbOperation);
        }

        public async Task<dynamic> GetAllAttendancePolicyOrganogram()
        {
            return await _policyAssignmentDataAccess.GetAllAttendancePolicyOrganogram();
        }

        public async Task<dynamic> GetAttendancePolicyOrganogramById(int attendance_policy_organogram_id)
        {
            return await _policyAssignmentDataAccess.GetAttendancePolicyOrganogramById(attendance_policy_organogram_id);
        }

        public async Task<dynamic> GetGroupNameById()
        {
            return await _policyAssignmentDataAccess.GetGroupNameById();
        }

        public async Task<dynamic> GetCompanyByOrganogram(OrganogramFilter organogramFilter)
        {
            return await _policyAssignmentDataAccess.GetCompanyByOrganogram(organogramFilter);
        }

        public async Task<dynamic> GetLocationByOrganogram(OrganogramFilter organogramFilter)
        {
            return await _policyAssignmentDataAccess.GetLocationByOrganogram(organogramFilter);
        }

        public async Task<dynamic> GetDepartmentByOrganogram(OrganogramFilter organogramFilter)
        {
            return await _policyAssignmentDataAccess.GetDepartmentByOrganogram(organogramFilter);
        }

        public async Task<dynamic> GetPositionByOrganogram(OrganogramFilter organogramFilter)
        {
            return await _policyAssignmentDataAccess.GetPositionByOrganogram(organogramFilter);
        }
    }
}
