using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class LeaveHeadRepository : ILeaveHeadRepository
    {
        protected LeaveHeadDataAccess _leaveHeadDataAccess { get; set; }

        //Data access initialize
        public LeaveHeadRepository(LeaveHeadDataAccess leaveHeadDataAccess)
        {
            _leaveHeadDataAccess = leaveHeadDataAccess;
        }
        public async Task<dynamic> GetAllLeaveHead()
        {
            return await _leaveHeadDataAccess.GetAllLeaveHead();
        }
        public async Task<dynamic> GetAllLeaveHeadForDP()
        {
            return await _leaveHeadDataAccess.GetAllLeaveHeadForDP();
        }
        
        public async Task<dynamic> IUD_LeaveHead(LeaveHead leaveHead, int dbOperation)
        {
            return await _leaveHeadDataAccess.IUD_LeaveHead(leaveHead,dbOperation);
        }
      
    }
}
