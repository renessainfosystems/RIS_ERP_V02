using Auth.DataAccess.PIMS;
using Auth.Model.PIMS.Model;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class EmployeeOfficialRepository:IEmployeeOfficialRepository
    {
        protected EmployeeOfficialDataAccess _DataAccess { get; set; }

        //Data access initialize
        public EmployeeOfficialRepository(EmployeeOfficialDataAccess oEmployeeOfficialDataAccess)
        {
            _DataAccess = oEmployeeOfficialDataAccess;
        }

        public async Task<dynamic> IUD(EmployeeOfficial oEmployeeOfficial, int dbOperation)
        {
            return await _DataAccess.IUD(oEmployeeOfficial, dbOperation);
        }
        public async Task<dynamic> Get(long Employee_id)
        {
            return await _DataAccess.Get(Employee_id);
        }
    }
}
