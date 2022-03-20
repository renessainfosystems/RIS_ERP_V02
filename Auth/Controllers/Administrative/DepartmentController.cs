
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
    public class DepartmentController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IDepartmentRepository _departmentRepository;

        public DepartmentController(
            IDepartmentRepository departmentRepository
            )
        {

            _departmentRepository = departmentRepository;
        }

        #endregion        

        [HttpGet]
        public dynamic GetAllDepartment()
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _departmentRepository.GetAllDepartment();
            }
            catch (Exception ex)
            {
                data = ex.Message;
            }
            return data;
        }

        [HttpGet]
        public dynamic GetById(int department_id)
        {
            
            dynamic data = (dynamic)null;
            try
            {
                data = _departmentRepository.GetById(department_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }

        [HttpPost]
        public  dynamic Create(Department oDepartment)
        {
            
            var message = new CommonMessage();
            try
            {
                _departmentRepository.Add(oDepartment);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Update(Department oDepartment)
        {

            var message = new CommonMessage();
            try
            {
                _departmentRepository.Update(oDepartment);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }

        [HttpPost]
        public dynamic Delete(int department_id)
        {
            var message = new CommonMessage();
            try
            {
                _departmentRepository.Delete(department_id);
                message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            return message;
        }
                
        [HttpGet]
        public dynamic DepartmentCboList()
        {            
            return _departmentRepository.DepartmentCboList();
        }
    }
}
