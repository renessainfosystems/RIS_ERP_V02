using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IShiftInfoRepository
    {
        Task<dynamic> GetTimeZone();
        Task<dynamic> GetAllShift();
        Task<dynamic> GetAllShiftByFiltering(ShiftFiltering shiftFiltering);
        Task<dynamic> GetShiftDurationSlabById(int shift_id);
        Task<dynamic> GetShiftById(int shift_id);

        Task<dynamic> IUD_shiftInfo(ShiftInfo shiftInfo, int dbOperation);
        Task<dynamic> IUD_shiftInfoSlab(ShiftBreakDuration shiftBreakDuration, int dbOperation);
        Task<dynamic> GetShiftForDP();
    }
}
