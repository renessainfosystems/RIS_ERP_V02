
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
    public class VatCircleController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IVatCircleRepository _vatCircleRepository;

        public VatCircleController(
            IVatCircleRepository vatCircleRepository
            )
        {

            _vatCircleRepository = vatCircleRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllVatCircle()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _vatCircleRepository.GetAllVatCircle();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int vat_circle_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _vatCircleRepository.GetById(vat_circle_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(VatCircle oVatCircle)
        {
            var message = new CommonMessage();
            try
            {
                _vatCircleRepository.Add(oVatCircle);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(VatCircle oVatCircle)
        {

            var message = new CommonMessage();
            try
            {
                _vatCircleRepository.Update(oVatCircle);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int vat_circle_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _vatCircleRepository.Delete(vat_circle_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic VatCircleCboList()
        {            
           return _vatCircleRepository.VatCircleCboList();
        }
    }
}
