using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.Party.Enum.GlobalEnumList;

namespace Auth.Controllers.Party
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PartyEnumController : ControllerBase
    {
        #region Party
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
        public IActionResult SecurityTypeEnum()
        {
            var oSecurityTypes = Enum.GetValues(typeof(EnumSecurityType))
               .Cast<EnumSecurityType>()
               .Select(con => new SecurityType
               {
                   security_type_enum_id = ((int)con),
                   // show display name
                   security_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oSecurityTypes);
        }

        [HttpGet]
        public IActionResult PreferredMethodEnum()
        {
            var oSecurityTypes = Enum.GetValues(typeof(EnumPreferredMethod))
               .Cast<EnumPreferredMethod>()
               .Select(con => new PreferredMethod
               {
                   prefered_method_enum_id = ((int)con),
                   // show display name
                   prefered_method_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oSecurityTypes);
        }

        [HttpGet]
        public IActionResult OrganizationTypeEnum()
        {
            var oEnumOrganizationTypes = Enum.GetValues(typeof(EnumOrganizationType))
               .Cast<EnumOrganizationType>()
               .Select(con => new OrganizationType
               {
                   organization_type_enum_id = ((int)con),
                   // show display name
                   organization_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumOrganizationTypes);
        }

        [HttpGet]
        public IActionResult BusinessActivitiesEnum()
        {
            var oEnumBusinessActivities = Enum.GetValues(typeof(EnumBusinessActivities))
               .Cast<EnumBusinessActivities>()
               .Select(con => new BusinessActivities
               {
                   business_type_enum_id = ((int)con),
                   // show display name
                   business_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumBusinessActivities);
        }

        [HttpGet]
        public IActionResult GenderEnum()
        {
            var oGender = Enum.GetValues(typeof(EnumGender))
               .Cast<EnumGender>()
               .Select(con => new Gender
               {
                   gender_enum_id = ((int)con),
                   // show display name
                   gender_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oGender);
        }

        [HttpGet]
        public IActionResult ReligionEnum()
        {
            var oReligion = Enum.GetValues(typeof(EnumReligion))
               .Cast<EnumReligion>()
               .Select(con => new Religion
               {
                   religion_enum_id = ((int)con),
                   // show display name
                   religion_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oReligion);
        }

        [HttpGet]
        public IActionResult BloodGroupEnum()
        {
            var oReligion = Enum.GetValues(typeof(EnumBloodGroup))
               .Cast<EnumBloodGroup>()
               .Select(con => new BloodGroup
               {
                   blood_group_enum_id = ((int)con),
                   // show display name
                   blood_group_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oReligion);
        }
        #endregion
    }
}
