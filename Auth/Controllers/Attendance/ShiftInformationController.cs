using Auth.Model.Attendance.Model;
using Auth.Repository.Attendance;
using Auth.Utility.Attendance.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.Attendance
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShiftInformationController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IShiftInfoRepository _shiftInfoRepository;
        public ShiftInformationController(IShiftInfoRepository shiftInfoRepository)
        {
            _shiftInfoRepository = shiftInfoRepository;
        }
        #endregion
        [HttpGet]
        public async Task<dynamic> GetTimeZone()
        {
            return await _shiftInfoRepository.GetTimeZone();
        }
        [HttpPost]
        public async Task<dynamic> Create([FromBody] ShiftInfo shiftInfo)

        {
            return await _shiftInfoRepository.IUD_shiftInfo(shiftInfo, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(ShiftInfo shiftInfo)
        {

            return await _shiftInfoRepository.IUD_shiftInfo(shiftInfo, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(ShiftInfo shiftInfo)
        {

            return await _shiftInfoRepository.IUD_shiftInfo(shiftInfo, (int)GlobalEnumList.DBOperation.Approve);
        }
      
        [HttpPost]
        public async Task<dynamic> AddBreakDurationForShiftUpdate([FromBody] ShiftBreakDuration shiftBreakDuration)

        {
            return await _shiftInfoRepository.IUD_shiftInfoSlab(shiftBreakDuration, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> RemoveBreakDurationForShiftUpdate([FromBody] ShiftBreakDuration shiftBreakDuration)

        {
            return await _shiftInfoRepository.IUD_shiftInfoSlab(shiftBreakDuration, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> Delete(ShiftInfo shiftInfo)
        {
            return await _shiftInfoRepository.IUD_shiftInfo(shiftInfo, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllShift()
        {

            return await _shiftInfoRepository.GetAllShift();
        }
        [HttpPost]
        public async Task<dynamic> GetAllShiftByFiltering(ShiftFiltering shiftFiltering)
        {

            return await _shiftInfoRepository.GetAllShiftByFiltering(shiftFiltering);
        }
        
           [HttpGet]
        public async Task<dynamic> GetShiftDurationSlabById(int shift_id)
        {

            return await _shiftInfoRepository.GetShiftDurationSlabById(shift_id);

        }

        [HttpGet]
        public async Task<dynamic> GetShiftById(int shift_id)
        {

            return await _shiftInfoRepository.GetShiftById(shift_id);

        }
        [HttpGet]
        public async Task<dynamic> GetShiftForDP()
        {

            return await _shiftInfoRepository.GetShiftForDP();

        }
        
    }
}
