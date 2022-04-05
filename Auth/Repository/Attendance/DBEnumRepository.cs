using Auth.DataAccess.Attendance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class DBEnumRepository: IDBEnumRepository
    {
        protected DBEnumDataAcess _dBEnumDataAcess { get; set; }

        //Data access initialize
        public DBEnumRepository(DBEnumDataAcess dBEnumDataAcess)
        {
            _dBEnumDataAcess = dBEnumDataAcess;
        }


        public async Task<dynamic> GetDayOffTypeForDP()
        {
           return await _dBEnumDataAcess.GetDayOffTypeForDP();
        }

        public async Task<dynamic> GetDayOffAlternativeForDP()
        {
            return await _dBEnumDataAcess.GetDayOffAlternativeForDP();
        }
    }
}
