//using Auth.Model.Procurement.Model;
//using Auth.Service;
//using Auth.Utility.Procurement.Enum;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.IO;
//using System.Net.Http.Headers;
//using System.Threading.Tasks;
//using FromBodyAttribute = Microsoft.AspNetCore.Mvc.FromBodyAttribute;
//using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
//using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
//using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


using Auth.Model.Procurement.Model;
using Auth.Repository.Procurement;
using Auth.Utility.Procurement.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using FromBodyAttribute = Microsoft.AspNetCore.Mvc.FromBodyAttribute;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

/// <summary>
/// Created By Adnan Amin
/// Dated: 21/04/2022
/// </summary>
/// 




namespace Auth.Controllers.Procurement
{
    // [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]

    
    public class SupplierAssessmentController : ControllerBase
    {

        private ISupplierAssessmentRepository _supplierAssessmentRepository;
      //  private IConfiguration _config;

        public SupplierAssessmentController(ISupplierAssessmentRepository supplierAssessmentRepository)
        {
            _supplierAssessmentRepository = supplierAssessmentRepository;
           // _config = config;
        }

        //Business

        [HttpPost]
        public async Task<dynamic> Create([FromBody] SupplierAssessment supplierAssessment)
        {
            return await _supplierAssessmentRepository.IUDSupplierAssessment(supplierAssessment, (int)GlobalEnumList.DBOperation.Create);
        }

        [HttpPost]
        public async Task<dynamic> Update([FromBody] SupplierAssessment supplierAssessment)
        {
            return await _supplierAssessmentRepository.IUDSupplierAssessment(supplierAssessment, (int)GlobalEnumList.DBOperation.Update);
        }

    }
}
