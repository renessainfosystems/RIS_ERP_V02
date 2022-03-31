using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan
/// Dated: 15/02/2022
/// </summary>
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AdministrativeDBEnumController : Controller
    {
        //Intialize
        #region Constructor
        private IAdministrativeDBEnumRepository _administrativeDBEnumRepository;

        public AdministrativeDBEnumController(
            IAdministrativeDBEnumRepository administrativeDBEnumRepository
            )
        {
            _administrativeDBEnumRepository = administrativeDBEnumRepository;
        }

        #endregion

        [HttpGet]
        public dynamic MFSTypeCboList()
        {
            return _administrativeDBEnumRepository.MFSTypeCboList();
        }

        [HttpGet]
        public dynamic BankTypeCboList()
        {
            return _administrativeDBEnumRepository.BankTypeCboList();
        }

        [HttpGet]
        public dynamic PaymentFrequencyCboList()
        {
            return _administrativeDBEnumRepository.PaymentFrequencyCboList();
        }

        [HttpGet]
        public dynamic DepartmentTypeCboList()
        {
            return _administrativeDBEnumRepository.DepartmentTypeCboList();
        }

        [HttpGet]
        public dynamic DepartmentTypeCboListByFunctionality(string type)
        {
            return _administrativeDBEnumRepository.DepartmentTypeCboListByFunctionality(type);
        }
    }
}
