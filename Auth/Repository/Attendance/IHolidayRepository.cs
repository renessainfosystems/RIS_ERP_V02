using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth.Model.Attendance.Model;
namespace Auth.Repository.Attendance
{
    public interface IHolidayRepository
    {
        void Add(Holiday oHoliday);
        void Update(Holiday oholiday);
        IEnumerable<dynamic> GetAllHoliday();
       
        Holiday GetById(int holiday_id);
   
        void Delete(int holiday_id);
        IEnumerable<object> HolidayListForDP();

    }
}
