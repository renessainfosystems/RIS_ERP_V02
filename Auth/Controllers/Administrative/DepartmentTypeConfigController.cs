
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
    public class DepartmentTypeConfigController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IDepartmentTypeConfigRepository _departmentTypeConfigRepository;

        public DepartmentTypeConfigController(
            IDepartmentTypeConfigRepository departmentTypeConfigRepository
            )
        {

            _departmentTypeConfigRepository = departmentTypeConfigRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllDepartmentTypeConfig()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _departmentTypeConfigRepository.GetAllDepartmentTypeConfig();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int department_type_config_id)
        {           
            dynamic data = (dynamic)null;
            try
            {
                data = _departmentTypeConfigRepository.GetById(department_type_config_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(DepartmentTypeConfig oDepartmentTypeConfig)
        {            
            var message = new CommonMessage();
            try
            {
                _departmentTypeConfigRepository.Add(oDepartmentTypeConfig);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(DepartmentTypeConfig oDepartmentTypeConfig)
        {
            
            var message = new CommonMessage();
            try
            {
                _departmentTypeConfigRepository.Update(oDepartmentTypeConfig);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int department_type_config_id)
        {
            
            var message = new CommonMessage();
            try
            {
                _departmentTypeConfigRepository.Delete(department_type_config_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }                     

        [HttpGet]
        public dynamic DepartmentTypeConfigCboList()
        {            
            return _departmentTypeConfigRepository.DepartmentTypeConfigCboList();
        }
    }
}
