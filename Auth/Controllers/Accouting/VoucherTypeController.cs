
using Auth.Model.DomainModel;
using Auth.Service;
using Auth.Utility;
using Microsoft.AspNetCore.Mvc;
using System;

/// <summary>
/// Created By Jahid
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Controllers.Accouting
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VoucherTypeController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IVoucherTypeRepository _VoucherTypeRepository;

        public VoucherTypeController(
            IVoucherTypeRepository VoucherTypeRepository
            )
        {

            _VoucherTypeRepository = VoucherTypeRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllVoucherType()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _VoucherTypeRepository.GetAllVoucherType();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int voucher_type_id)
        {            
            dynamic data = (dynamic)null;
            try
            {
                data = _VoucherTypeRepository.GetById(voucher_type_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(VoucherType oVoucherType)
        {
            var message = new CommonMessage();
            try
            {
                _VoucherTypeRepository.Add(oVoucherType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(VoucherType oVoucherType)
        {
            var message = new CommonMessage();
            try
            {
                _VoucherTypeRepository.Update(oVoucherType);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int voucher_type_id)
        {
            var message = new CommonMessage();
            try
            {
                _VoucherTypeRepository.Delete(voucher_type_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic VoucherTypeCboList()
        {            
            return _VoucherTypeRepository.VoucherTypeCboList();
        }
    }
}
