using Auth.Model.Attendance.Model;
using Auth.Repository.Attendance;
using Auth.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.Attendance
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShiftBreakController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IShiftBreakRepository _ShiftBreakRepository;

        public ShiftBreakController(
            IShiftBreakRepository shiftBreakRepository
            )
        {

            _ShiftBreakRepository = shiftBreakRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllShiftBreak()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _ShiftBreakRepository.GetAllShiftBreak();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetAllActiveBreakForDP()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _ShiftBreakRepository.GetAllActiveBreakForDP();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int shiftBreak_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _ShiftBreakRepository.GetById(shiftBreak_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }


        [HttpPost]
        public dynamic Create(ShiftBreak shiftBreak)
        {
            var message = new CommonMessage();
            try
            {
               _ShiftBreakRepository.Add(shiftBreak);

               message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }


        [HttpPost]
        public dynamic Delete(int shiftBreak_id)
        {
            var message = new CommonMessage();
            try
            {
                _ShiftBreakRepository.Delete(shiftBreak_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic ShiftBreakActivity(int shift_break_head_id)
        {
            var message = new CommonMessage();
            try
            {
              _ShiftBreakRepository.ShiftBreakActivity(shift_break_head_id);

               message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

    }
}
