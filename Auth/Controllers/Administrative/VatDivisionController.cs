
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
    public class VatDivisionController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IVatDivisionRepository _vatDivisionRepository;

        public VatDivisionController(
            IVatDivisionRepository vatDivisionRepository
            )
        {

            _vatDivisionRepository = vatDivisionRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllVatDivision()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _vatDivisionRepository.GetAllVatDivision();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int vat_division_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _vatDivisionRepository.GetById(vat_division_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(VatDivision oVatDivision)
        {
            var message = new CommonMessage();
            try
            {
                _vatDivisionRepository.Add(oVatDivision);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(VatDivision oVatDivision)
        {
            var message = new CommonMessage();
            try
            {
                _vatDivisionRepository.Update(oVatDivision);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int vat_division_id)
        {
            var message = new CommonMessage();
            try
            {
                _vatDivisionRepository.Delete(vat_division_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic VatDivisionCboList()
        {            
            return _vatDivisionRepository.VatDivisionCboList();
        }
    }
}
