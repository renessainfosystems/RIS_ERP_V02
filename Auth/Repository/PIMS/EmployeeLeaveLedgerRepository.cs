using Auth.DataAccess.PIMS;
using Auth.Model.PIMS.Model;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class EmployeeLeaveLedgerRepository : IEmployeeLeaveLedgerRepository
    {
        protected EmployeeLeaveLedgerDataAccess _DataAccess { get; set; }

        //Data access initialize
        public EmployeeLeaveLedgerRepository(EmployeeLeaveLedgerDataAccess oEmployeeLeaveLedgerDataAccess)
        {
            _DataAccess = oEmployeeLeaveLedgerDataAccess;
        }

        public async Task<dynamic> Gets(long nEmployee_id)
        {
            return await _DataAccess.Gets(nEmployee_id);
        }
    }
}
