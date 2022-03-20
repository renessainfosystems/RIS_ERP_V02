
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
    public class CompanyIndustrySubSectorController : ControllerBase
    {

        //Intialize
        #region Constructor
        private ICompanyIndustrySubSectorRepository _companyIndustrySubSectorRepository;

        public CompanyIndustrySubSectorController(
            ICompanyIndustrySubSectorRepository companyIndustrySubSectorRepository
            )
        {

            _companyIndustrySubSectorRepository = companyIndustrySubSectorRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllCompanyIndustrySubSector()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _companyIndustrySubSectorRepository.GetAllCompanyIndustrySubSector();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int company_industry_sub_sector_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _companyIndustrySubSectorRepository.GetById(company_industry_sub_sector_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(CompanyIndustrySubSector oCompanyIndustrySubSector)
        {
            
            var message = new CommonMessage();
            try
            {
                _companyIndustrySubSectorRepository.Add(oCompanyIndustrySubSector);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(CompanyIndustrySubSector oCompanyIndustrySubSector)
        {
            var message = new CommonMessage();
            try
            {
                _companyIndustrySubSectorRepository.Update(oCompanyIndustrySubSector);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int company_industry_sub_sector_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _companyIndustrySubSectorRepository.Delete(company_industry_sub_sector_id);
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
