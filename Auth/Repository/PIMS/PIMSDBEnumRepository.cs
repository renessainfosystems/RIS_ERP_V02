using Auth.DataAccess.PIMS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class PIMSDBEnumRepository : IPIMSDBEnumRepository
    {
        protected PIMSDBEnumDataAcess _dBEnumDataAcess { get; set; }

        //Data access initialize
        public PIMSDBEnumRepository(PIMSDBEnumDataAcess dBEnumDataAcess)
        {
            _dBEnumDataAcess = dBEnumDataAcess;
        }
        public async Task<dynamic> GetObject(string sDbObjectName)
        {
            return await _dBEnumDataAcess.GetObject(sDbObjectName);
        }
    }
}
