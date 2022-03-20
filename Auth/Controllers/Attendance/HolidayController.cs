using Auth.Model.Attendance.Model;
using Auth.Repository.Attendance;
using Auth.Utility.Attendance;
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
    public class HolidayController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IHolidayRepository _holidayRepository;

        public HolidayController(
            IHolidayRepository holidayRepository
            )
        {

            _holidayRepository = holidayRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllHoliday()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _holidayRepository.GetAllHoliday();

            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }
      
        [HttpGet]
        public dynamic GetById(int holiday_id)
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _holidayRepository.GetById(holiday_id);

            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public dynamic Create(Holiday oHoliday)
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

                _holidayRepository.Add(oHoliday);

                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }


        [HttpPost]
        public dynamic Update(Holiday oHoliday)
        {
            var message = new CommonMessage();
            try
            {
                _holidayRepository.Update(oHoliday);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int holiday_id)
        {
            var message = new CommonMessage();
            try
            {
                _holidayRepository.Delete(holiday_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                if (ex.HResult == (-2146233088))
                {
                    message = CommonMessage.SetErrorMessage("This holiday already used in attendance calendar");
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(ex.Message);
                }

                
            }
            return message;
        }

        [HttpGet]
        public dynamic GetHolidayListForDP()
        {
            return _holidayRepository.HolidayListForDP();

        }
        
    }
}
