
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
    public class CompanyBINController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompanyBINRepository _companyBINRepository;

        public CompanyBINController(
            ICompanyBINRepository companyBINRepository
            )
        {

            _companyBINRepository = companyBINRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompanyBIN()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _companyBINRepository.GetAllCompanyBIN();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int company_bin_id)
        {
           
            dynamic data = (dynamic)null;
            try
            {
                data = _companyBINRepository.GetById(company_bin_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(CompanyBIN oCompanyBIN)
        {
            
            var message = new CommonMessage();
            try
            {
                _companyBINRepository.Add(oCompanyBIN);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(CompanyBIN oCompanyBIN)
        {
           
            var message = new CommonMessage();
            try
            {                
                _companyBINRepository.Update(oCompanyBIN);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(string company_bin_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _companyBINRepository.Delete(company_bin_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic CompanyBINCboList()
        {
            return _companyBINRepository.CompanyBINCboList();
        }        
    }
}
