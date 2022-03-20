
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
    public class CompanyGroupController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompanyGroupRepository _companyGroupRepository;

        public CompanyGroupController(
            ICompanyGroupRepository companyGroupRepository
            )
        {

            _companyGroupRepository = companyGroupRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompanyGroup()
        {


            dynamic data = (dynamic)null;
            try
            {
                data = _companyGroupRepository.GetAllCompanyGroup();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int company_group_id)
        {

            dynamic data = (dynamic)null;
            try
            {
                data = _companyGroupRepository.GetById(company_group_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(CompanyGroup oCompanyGroup)
        {
            var message = new CommonMessage();
            try
            {
                _companyGroupRepository.Add(oCompanyGroup);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(CompanyGroup oCompanyGroup)
        {

            var message = new CommonMessage();
            try
            {                
                _companyGroupRepository.Update(oCompanyGroup);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete( int company_group_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _companyGroupRepository.Delete(company_group_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpGet]
        public dynamic CompanyGroupCboList()
        {            
            return _companyGroupRepository.CompanyGroupCboList();
        }

    }
}
