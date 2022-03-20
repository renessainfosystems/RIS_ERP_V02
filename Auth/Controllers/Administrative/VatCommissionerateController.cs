
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
    public class VatCommissionerateController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IVatCommissionerateRepository _vatCommissionerateRepository;

        public VatCommissionerateController(
            IVatCommissionerateRepository vatCommissionerateRepository
            )
        {

            _vatCommissionerateRepository = vatCommissionerateRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllVatCommissionerate()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _vatCommissionerateRepository.GetAllVatCommissionerate();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int vat_commissionerate_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _vatCommissionerateRepository.GetById(vat_commissionerate_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(VatCommissionerate oVatCommissionerate)
        {
           
            var message = new CommonMessage();
            try
            {
                _vatCommissionerateRepository.Add(oVatCommissionerate);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(VatCommissionerate oVatCommissionerate)
        {

            var message = new CommonMessage();
            try
            {
                _vatCommissionerateRepository.Update(oVatCommissionerate);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int vat_commissionerate_id)
        {
            var message = new CommonMessage();
            try
            {
                _vatCommissionerateRepository.Delete(vat_commissionerate_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic VatCommissionerateCboList()
        {            
            return _vatCommissionerateRepository.VatCommissionerateCboList();
        }
    }
}
