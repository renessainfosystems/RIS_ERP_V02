using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.Administrative.Enum.GlobalEnumList;


/// <summary>
/// Created By Jahid
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AdministrativeEnumController : ControllerBase
    {

        [HttpGet]
        public IActionResult ContinentEnum()
        {   
            var oEnumContinents = Enum.GetValues(typeof(EnumContinent))
               .Cast<EnumContinent>()
               .Select(con => new Continent
               {
                   continent_enum_id = ((int)con),
                   // show display name
                   continent_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumContinents);
        }

        [HttpGet]
        public IActionResult OrganizationTypeEnum()
        {
            var oEnumOrganizationTypes = Enum.GetValues(typeof(EnumOrganizationType))
               .Cast<EnumOrganizationType>()
               .Select(con => new OrganizationType
               {
                   organization_type_id_enum = ((int)con),
                   // show display name
                   organization_type_name_enum = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumOrganizationTypes);


        }

        [HttpGet]
        public IActionResult AuthorizationEventEnum()
        {
            var oEnumContinents = Enum.GetValues(typeof(EnumAuthorizationEvent))
               .Cast<EnumAuthorizationEvent>()
               .Select(con => new AuthorizationEvent
               {
                   event_enum_id = ((int)con),
                   // show display name
                   event_enum_name = con.ToString()

               });
            return Ok(oEnumContinents);
        }
        [HttpGet]
        public IActionResult UserTypeEnum()
        {
            var oEnumUserTypes = Enum.GetValues(typeof(EnumUserType))
               .Cast<EnumUserType>()
               .Select(con => new UserType
               {
                   user_type_enum_id = ((int)con),
                   // show display name
                   user_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumUserTypes);
        }

        [HttpGet]
        public IActionResult DepartmentTypeConfigEnum()
        {
            var oDepartmentFunctionalities = Enum.GetValues(typeof(EnumDepartmentFunctionality))
               .Cast<EnumDepartmentFunctionality>()
               .Select(dtc => new DepartmentFunctionality
               {
                   department_functionality_enum_id = ((int)dtc),
                   // show display name
                   department_functionality_enum_name = dtc.ToString()
               });
            return Ok(oDepartmentFunctionalities);
        }

        [HttpGet]
        public IActionResult DepartmentTypeEnum()
        {
            var oDepartmentFunctionalities = Enum.GetValues(typeof(EnumDepartmentType))
               .Cast<EnumDepartmentType>()
               .Select(dt => new DepartmentType
               {
                   department_type_id = ((int)dt),
                   // show display name
                   department_type_name = dt.ToString()
               });
            return Ok(oDepartmentFunctionalities);
        }

        [HttpGet]
        public IActionResult CompanyBusinessNatureEnum()
        {
            var oEnumContinents = Enum.GetValues(typeof(EnumBusinessNature))
               .Cast<EnumBusinessNature>()
               .Select(con => new BusinessNature
               {
                   company_type_enum_id = ((int)con),
                   // show display name
                   company_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumContinents);
        }

        [HttpGet]
        public IActionResult VatApplicableEnum()
        {
            var oVatApplicables = Enum.GetValues(typeof(EnumVatApplicable))
               .Cast<EnumVatApplicable>()
               .Select(dtc => new VatApplicable
               {
                   vat_applicable_type_enum_id = ((int)dtc),
                   // show display name
                   vat_applicable_type_enum_name = dtc.ToString()
               });
            return Ok(oVatApplicables);
        }

        [HttpGet]
        public IActionResult SubOrdinateLineEnum()
        {
            var oEnumContinents = Enum.GetValues(typeof(EnumSubOrdinateLine))
               .Cast<EnumSubOrdinateLine>()
               .Select(con => new SubOrdinateLine
               {
                   sub_ordinate_line_enum_id = ((int)con),
                   // show display name
                   sub_ordinate_line_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumContinents);
        }

        [HttpGet]
        public IActionResult SalaryEnum()
        {
            var oVatApplicables = Enum.GetValues(typeof(EnumSalary))
               .Cast<EnumSalary>()
               .Select(dtc => new Salary
               {
                   increment_on_enum_id = ((int)dtc),
                   // show display name
                   increment_on_enum_name = dtc.ToString()
               });
            return Ok(oVatApplicables);
        }
       
    }
}
