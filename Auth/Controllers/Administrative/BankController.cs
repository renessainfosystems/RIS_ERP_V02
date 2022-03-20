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
/// Dated: 24/12/2021
/// </summary>
/// 



namespace Auth.Controllers.Administrative
{
    // [Authorize]
    [ApiController]

    [Route("api/[controller]/[action]")]
    public class BankController : ControllerBase
    {
        private IBankRepository _bankRepository;
        private IConfiguration _config;

        public BankController(IBankRepository bankRepository, IConfiguration config)
        {
            _bankRepository = bankRepository;
            _config = config;
        }

        [HttpPost]
        public async Task<dynamic> Create([FromBody] Bank bank)

        {
            return await _bankRepository.IUDBank(bank, (int)GlobalEnumList.DBOperation.Create);
        }

        //User Registration
        [HttpPost]
        public async Task<dynamic> Update(Bank bank)
        {
            return await _bankRepository.IUDBank(bank, (int)GlobalEnumList.DBOperation.Update);

        }
        //User Delete
        [HttpPost]
        public async Task<dynamic> Delete(Bank bank)
        {
            return await _bankRepository.IUDBank(bank, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpGet]
        public async Task<dynamic> GetAllBanks()
        {
            return await _bankRepository.GetBanks();
        }

        [HttpGet]
        public async Task<ActionResult> GetBankById(int bank_id)
        {

            return Ok(await _bankRepository.GetBankByBankId(bank_id));
        }

        [HttpGet]
        public async Task<dynamic> BankCboList()
        {
            return await _bankRepository.BankCboList();

        }



    }
}
