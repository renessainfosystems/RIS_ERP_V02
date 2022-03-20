
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
    public class CompanyBusinessNatureController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompanyBusinessNatureRepository _companyBusinessNatureRepository;

        public CompanyBusinessNatureController(
            ICompanyBusinessNatureRepository companyBusinessNatureRepository
            )
        {

            _companyBusinessNatureRepository = companyBusinessNatureRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompanyBusinessNature()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _companyBusinessNatureRepository.GetAllCompanyBusinessNature();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int company_business_nature_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _companyBusinessNatureRepository.GetById(company_business_nature_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(CompanyBusinessNature oCompanyBusinessNature)
        {
            
            var message = new CommonMessage();
            try
            {
                oCompanyBusinessNature.is_active = true;
                _companyBusinessNatureRepository.Add(oCompanyBusinessNature);

                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(CompanyBusinessNature oCompanyBusinessNature)
        {     
            var message = new CommonMessage();
            try
            {
                _companyBusinessNatureRepository.Update(oCompanyBusinessNature);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int company_business_nature_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _companyBusinessNatureRepository.Delete(company_business_nature_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic GetAllByRawSql()
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _companyBusinessNatureRepository.GetAllByRawSql();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

    }
}
