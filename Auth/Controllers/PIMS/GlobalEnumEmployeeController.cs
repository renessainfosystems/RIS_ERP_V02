using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.PIMS.Enum.GlobalEnumList;

namespace Auth.Controllers.PIMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GlobalEnumEmployeeController : ControllerBase
    {
        #region PIMS
        [HttpGet]
        public IActionResult EmployeeTittleEnum()
        {
            var oGenderList = Enum.GetValues(typeof(EnumEmployeeTittle))
               .Cast<EnumEmployeeTittle>()
               .Select(dtc => new EmployeeTittle
               {
                   title_enum_id = ((int)dtc),
                   // show display name
                   title_enum_name = dtc.GetType()
                            .GetMember(dtc.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()
               });
            return Ok(oGenderList);
        }
        [HttpGet]
        public IActionResult EmployeeGenderEnum()
        {
            var oGenderList = Enum.GetValues(typeof(EnumEmployeeGender))
               .Cast<EnumEmployeeGender>()
               .Select(dtc => new EmployeeGender
               {
                   gender_enum_id = ((int)dtc),
                   // show display name
                   gender_enum_name = dtc.GetType()
                            .GetMember(dtc.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()
               });
            return Ok(oGenderList);
        }
        [HttpGet]
        public IActionResult EmployeeReligionEnum()
        {
            var oGenderList = Enum.GetValues(typeof(EnumEmployeeReligion))
               .Cast<EnumEmployeeReligion>()
               .Select(dtc => new EmployeeReligion
               {
                   religion_enum_id = ((int)dtc),
                   // show display name
                   religion_enum_name = dtc.ToString()
               });
            return Ok(oGenderList);
        }
        [HttpGet]
        public IActionResult EmployeeBloodGroupEnum()
        {
            var oGenderList = Enum.GetValues(typeof(EnumEmployeeBloodGroup))
               .Cast<EnumEmployeeBloodGroup>()
               .Select(dtc => new EmployeeBloodGroup
               {
                   blood_group_enum_id = ((int)dtc),
                   // show display name
                   blood_group_enum_name = dtc.GetType()
                            .GetMember(dtc.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()
               });
            return Ok(oGenderList);
        }
        [HttpGet]
        public IActionResult ResidencialStatusEnum()
        {
            var oGenderList = Enum.GetValues(typeof(EnumResidencialStatus))
               .Cast<EnumResidencialStatus>()
               .Select(dtc => new ResidencialStatus
               {
                   residentcial_status_enum_id = ((int)dtc),
                   // show display name
                   residentcial_status_enum_name = dtc.GetType()
                            .GetMember(dtc.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()
               });
            return Ok(oGenderList);
        } 
        [HttpGet]
        public IActionResult MaritalStatusEnum()
        {
            var oGenderList = Enum.GetValues(typeof(EnumMaritalStatus))
               .Cast<EnumMaritalStatus>()
               .Select(dtc => new MaritalStatus
               {
                   marital_status_enum_id = ((int)dtc),
                   // show display name
                   marital_status_enum_name = dtc.GetType()
                            .GetMember(dtc.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()
               });
            return Ok(oGenderList);
        }
        #endregion
    }
}
