using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IShiftBreakRepository
    {
        void Add(ShiftBreak shiftBreak);
        IEnumerable<dynamic> GetAllShiftBreak();
        IEnumerable<dynamic> GetAllActiveBreakForDP();
        ShiftBreak GetById(int shift_break_head_id);
        void Delete(int shift_break_head_id);
        int ShiftBreakActivity(int shift_break_head_id);
    }
}
