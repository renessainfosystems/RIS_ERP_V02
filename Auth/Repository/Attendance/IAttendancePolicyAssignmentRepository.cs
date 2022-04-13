using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IAttendancePolicyAssignmentRepository
    {
        Task<dynamic> IUD_Attendance_Policy_Assignment(AttPolicyAssignment attPolicyAssignment, int dbOperation);
        Task<dynamic> GetAllAttendancePolicyOrganogram();
        Task<dynamic> GetAttendancePolicyOrganogramById(int attendance_policy_organogram_id);
        Task<dynamic> GetGroupNameById();
        Task<dynamic> GetCompanyByOrganogram(OrganogramFilter organogramFilter);
        Task<dynamic> GetLocationByOrganogram(OrganogramFilter organogramFilter);
        Task<dynamic> GetDepartmentByOrganogram(OrganogramFilter organogramFilter);
        Task<dynamic> GetPositionByOrganogram(OrganogramFilter organogramFilter);
    }
}
