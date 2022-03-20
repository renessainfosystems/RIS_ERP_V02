
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Adnan
/// Dated: 08/02/2022
/// </summary>
/// 
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ContactTypeController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IContactTypeRepository _contactTypeRepository;

        public ContactTypeController(
            IContactTypeRepository contactTypeRepository
            )
        {
            _contactTypeRepository = contactTypeRepository;
        }

        #endregion

        [HttpGet]
        public dynamic GetAllContactType()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _contactTypeRepository.GetAllContactType();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic ContactTypeCboList()
        {
            return _contactTypeRepository.ContactTypeCboList();
        }
    }
}
