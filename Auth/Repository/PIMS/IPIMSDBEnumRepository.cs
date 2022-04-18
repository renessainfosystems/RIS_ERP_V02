using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public interface IPIMSDBEnumRepository
    {
        Task<dynamic> GetObject(string sDbObjectName);        
    }
}
