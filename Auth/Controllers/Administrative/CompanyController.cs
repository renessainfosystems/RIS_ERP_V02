﻿
using Auth.DataAccess.EntityDataAccess;
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
        private readonly IEntityDataAccess<Company> _entityDataAccess;
        private ICompanyRepository _companyRepository;

        public CompanyController(
            IEntityDataAccess<Company> entityDataAccess
            ,ICompanyRepository companyRepository
            )
        {
            _entityDataAccess = entityDataAccess;
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
            dynamic data = (dynamic)null;
            try
            {                
                oCompany.company_id = _entityDataAccess.GetAutoId("Administrative.Company", "company_id");
                _companyRepository.Add(oCompany);
                data = _companyRepository.GetById(oCompany.company_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
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
            dynamic data = (dynamic)null;
            try
            {
                _companyRepository.Update(oCompany);
                data = _companyRepository.GetById(oCompany.company_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage, data);
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

    }
}
