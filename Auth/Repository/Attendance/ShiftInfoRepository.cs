using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class ShiftInfoRepository: IShiftInfoRepository
    {
        protected ShiftInfoDataAccess _shiftInfoDataAccess { get; set; }

        //Data access initialize
        public ShiftInfoRepository(ShiftInfoDataAccess shiftInfoDataAccess)
        {
            _shiftInfoDataAccess = shiftInfoDataAccess;
        }

        public async Task<dynamic> GetTimeZone()
        {
            return await _shiftInfoDataAccess.GetTimeZone();
        }

        public async Task<dynamic> GetAllShift()
        {
            return await _shiftInfoDataAccess.GetAllShift();
        }
        public async Task<dynamic> GetAllShiftByFiltering(ShiftFiltering shiftFiltering)
        {
            return await _shiftInfoDataAccess.GetAllShiftByFiltering(shiftFiltering);
        }
        
        public async Task<dynamic> GetShiftDurationSlabById(int shift_id)
        {
            return await _shiftInfoDataAccess.GetShiftDurationSlabById(shift_id);
        }

        public async Task<dynamic> GetShiftById(int shift_id)
        {
            return await _shiftInfoDataAccess.GetShiftById(shift_id);
        }

        public async Task<dynamic> IUD_shiftInfo(ShiftInfo shiftInfo, int dbOperation)
        {
            return await _shiftInfoDataAccess.IUD_shiftInfo(shiftInfo, dbOperation);
        }

        public async Task<dynamic> IUD_shiftInfoSlab(ShiftBreakDuration shiftBreakDuration, int dbOperation)
        {
            return await _shiftInfoDataAccess.IUD_shiftInfoSlab(shiftBreakDuration, dbOperation);
        }

        public async Task<dynamic> GetShiftForDP()
        {
            return await _shiftInfoDataAccess.GetShiftForDP();
        }
    }
}
