using Auth.Model.Attendance.Model;
using Auth.Repository.Attendance;
using Auth.Utility.Attendance.Enum;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Auth.Controllers.Attendance
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LeaveHeadController : ControllerBase
    {
        //Intialize
        #region Constructor
        private ILeaveHeadRepository _leaveHeadRepository;
        public LeaveHeadController(ILeaveHeadRepository leaveHeadRepository)
        {
            _leaveHeadRepository = leaveHeadRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] LeaveHead leaveHead)

        {
            return await _leaveHeadRepository.IUD_LeaveHead(leaveHead, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(LeaveHead leaveHead)
        {

            return await _leaveHeadRepository.IUD_LeaveHead(leaveHead, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Delete(LeaveHead leaveHead)
        {
            return await _leaveHeadRepository.IUD_LeaveHead(leaveHead, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllLeaveHead()
        {

            return await _leaveHeadRepository.GetAllLeaveHead();
        }

        [HttpGet]
        public async Task<dynamic> GetAllLeaveHeadForDP()
        {

            return await _leaveHeadRepository.GetAllLeaveHeadForDP();
        }


    }
}
