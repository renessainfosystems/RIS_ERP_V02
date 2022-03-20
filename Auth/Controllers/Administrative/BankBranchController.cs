using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Utility.Administrative.Enum;
using FromBodyAttribute = Microsoft.AspNetCore.Mvc.FromBodyAttribute;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

/// <summary>
/// Created By Adnan Amin
/// Dated: 26/12/2021
/// </summary>
/// 


namespace Auth.Controllers.Administrative
{
    // [Authorize]
    [ApiController]

    [Route("api/[controller]/[action]")]
    public class BankBranchController : ControllerBase
    {
        private IBankBranchRepository _bankBranchRepository;
        private IConfiguration _config;

        public BankBranchController(IBankBranchRepository bankBranchRepository, IConfiguration config)
        {
            _bankBranchRepository = bankBranchRepository;
            _config = config;
        }

        [HttpPost]
        public async Task<dynamic> Create([FromBody] BankBranch bankBranch)

        {
            return await _bankBranchRepository.IUDBankBranch(bankBranch, (int)GlobalEnumList.DBOperation.Create);
        }

        //User Registration
        [HttpPost]
        public async Task<dynamic> Update(BankBranch bankBranch)
        {
            return await _bankBranchRepository.IUDBankBranch(bankBranch, (int)GlobalEnumList.DBOperation.Update);

        }
        //User Delete
        [HttpPost]
        public async Task<dynamic> Delete(BankBranch bankBranch)
        {
            return await _bankBranchRepository.IUDBankBranch(bankBranch, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<ActionResult> GetAllBankBranchs() 
        {
            return Ok(await _bankBranchRepository.GetAllBankBranchs());
        }

        [HttpGet]
        public async Task<ActionResult> GetAllBankBranchByBankBranchId(int bank_branch_id)
        {

            return Ok(await _bankBranchRepository.GetAllBankBranchByBankBranchId(bank_branch_id));
        }

        [HttpGet]
        public async Task<ActionResult> GetAllBankBranchByBankId(int bank_id)
        {
            return Ok(await _bankBranchRepository.GetAllBankBranchByBankId(bank_id));
        }


        

    }
}
