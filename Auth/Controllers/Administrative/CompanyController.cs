
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
    public class CompanyController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompanyRepository _companyRepository;

        public CompanyController(
            ICompanyRepository companyRepository
            )
        {

            _companyRepository = companyRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompany()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _companyRepository.GetAllCompany();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int company_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _companyRepository.GetById(company_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(Company oCompany)
        {
            var message = new CommonMessage();
            try
            {
                //Unique key check
                //var companNameExist = validateUniqueKey(oCompany.company_name);
                //if (companNameExist.Count > 0)
                //{
                //    return message = CommonMessage.SetWarningMessage("Company name must be unique.Please try another name.");
                //}

                _companyRepository.Add(oCompany);

                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }


        [HttpPost]
        public dynamic Update(Company oCompany)
        {
            var message = new CommonMessage();
            try
            {
                _companyRepository.Update(oCompany);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int company_id)
        {
            var message = new CommonMessage();
            try
            {
                _companyRepository.Delete(company_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic CompanyCboList()
        {
            return _companyRepository.CompanyCboList();

        }

        //Unique key validation method
        //private dynamic validateUniqueKey(string company_name)
        //{

        //    var companies = _companyRepository.GetAllCompany();
        //    var result = (from c in companies
        //                  where c.company_name == company_name
        //                  select c.company_name).ToList();
        //    return result;
        //}
    }
}
