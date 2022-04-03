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


        public Task<dynamic> GetDayOffTypeForDP()
        {
            throw new NotImplementedException();
        }

        public Task<dynamic> GetDayOffAlternativeForDP()
        {
            throw new NotImplementedException();
        }
    }
}
