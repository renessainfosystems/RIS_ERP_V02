using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.Procurement.Enum.GlobalEnumList;

/// <summary>
/// Created By Adnan
/// Dated: 22/11/2021
/// </summary>
namespace Auth.Controllers.Procurement
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GlobalEnumProcurementController : ControllerBase
    {

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
        public IActionResult DomicileEnum()
        {
            var oEnumDomiciles = Enum.GetValues(typeof(EnumDomicile))
               .Cast<EnumDomicile>()
               .Select(con => new Domicile
               {
                   domicile_enum_id = ((int)con),
                   // show display name
                   domicile_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumDomiciles);
        }

        [HttpGet]
        public IActionResult BusinessActivitiesEnum()
        {
            var oEnumBusinessActivities = Enum.GetValues(typeof(EnumBusinessActivities))
               .Cast<EnumBusinessActivities>()
               .Select(con => new BusinessActivities
               {
                   business_activities_enum_id = ((int)con),
                   // show display name
                   business_activities_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumBusinessActivities);
        }

        [HttpGet]
        public IActionResult MembershipTypeEnum()
        {
            var oEnumMembershipTypes = Enum.GetValues(typeof(EnumMembershipTypes))
               .Cast<EnumMembershipTypes>()
               .Select(con => new MembershipTypes
               {
                   membership_type_enum_id = ((int)con),
                   // show display name
                   membership_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumMembershipTypes);
        }

 
    }
}
