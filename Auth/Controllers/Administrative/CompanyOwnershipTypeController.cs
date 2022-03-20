
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Jahid
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CompanyOwnershipTypeController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompanyOwnershipTypeRepository _companyOwnershipTypeRepository;

        public CompanyOwnershipTypeController(
            ICompanyOwnershipTypeRepository companyOwnershipTypeRepository
            )
        {

            _companyOwnershipTypeRepository = companyOwnershipTypeRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompanyOwnershipType()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _companyOwnershipTypeRepository.GetAllCompanyOwnershipType();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int companyOwnershipType_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _companyOwnershipTypeRepository.GetById(companyOwnershipType_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(CompanyOwnershipType oCompanyOwnershipType)
        {
            
            var message = new CommonMessage();
            try
            {

                _companyOwnershipTypeRepository.Add(oCompanyOwnershipType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(CompanyOwnershipType oCompanyOwnershipType)
        {

            var message = new CommonMessage();
            try
            {
                _companyOwnershipTypeRepository.Update(oCompanyOwnershipType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int company_ownership_type_id)
        {
           
            var message = new CommonMessage();
            try
            {
                _companyOwnershipTypeRepository.Delete(company_ownership_type_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }        
                
    }
}
