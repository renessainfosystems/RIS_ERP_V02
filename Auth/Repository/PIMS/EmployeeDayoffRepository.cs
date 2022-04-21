using Auth.DataAccess.PIMS;
using Auth.Model.PIMS.Model;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class EmployeeDayoffRepository:IEmployeeDayoffRepository
    {
        protected EmployeeDayoffDataAccess _DataAccess { get; set; }

        //Data access initialize
        public EmployeeDayoffRepository(EmployeeDayoffDataAccess oEmployeeDayoffDataAccess)
        {
            _DataAccess = oEmployeeDayoffDataAccess;
        }

        public async Task<dynamic> Gets(long nEmployee_id)
        {
            return await _DataAccess.Gets(nEmployee_id);
        }
    }
}
