using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface ILeaveHeadRepository
    {
        Task<dynamic> IUD_LeaveHead(LeaveHead leaveHead, int dbOperation);
        Task<dynamic> GetAllLeaveHead();
        Task<dynamic> GetAllLeaveHeadForDP();
    }
}
