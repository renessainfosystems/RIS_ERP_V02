using Auth.Model.PIMS.Model;
using Auth.Repository.PIMS;
using Auth.Utility.Attendance.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Auth.Controllers.PIMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeCategoryTypeController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IEmployeeCategoryTypeRepository _EmployeeCategoryTypeRepository;
        public EmployeeCategoryTypeController(
            IEmployeeCategoryTypeRepository EmployeeCategoryTypeRepository
            )
        {
            _EmployeeCategoryTypeRepository = EmployeeCategoryTypeRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create(EmployeeCategoryType EmployeeCategoryType)
        {
            return await _EmployeeCategoryTypeRepository.IUD_EmployeeCategoryType(EmployeeCategoryType, (int)GlobalEnumList.DBOperation.Create);           
        } 
        [HttpPost]
        public async Task<dynamic> Update(EmployeeCategoryType EmployeeCategoryType)
        {
            return await _EmployeeCategoryTypeRepository.IUD_EmployeeCategoryType(EmployeeCategoryType, (int)GlobalEnumList.DBOperation.Update);
        }   
        [HttpPost]
        public async Task<dynamic> Delete(int EmployeeCategoryTypeId)
        {
            EmployeeCategoryType oEmployeeCategoryType = new EmployeeCategoryType();
            oEmployeeCategoryType.employee_category_type_id = EmployeeCategoryTypeId;            
            return await _EmployeeCategoryTypeRepository.IUD_EmployeeCategoryType(oEmployeeCategoryType, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpGet]
        public dynamic GetAllEmployeeCategoryType()
        {
            dynamic data = (dynamic)null;
            try
            {
                data = _EmployeeCategoryTypeRepository.GetAllEmployeeCategoryType();
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
                data = _EmployeeCategoryTypeRepository.GetById(voucher_type_id);
            }
            catch (Exception ex)
            {
                data = "Error info:" + ex.Message;
            }
            return data;
        }
    }
}
