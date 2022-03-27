using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Auth.Repository.Administrative
{
    public class RegistryAuthorityRepository : IRegistryAuthorityRepository
    {

        private readonly IEntityDataAccess<RegistryAuthorityViewModel> _entityDataAccessVM;
        private readonly IEntityDataAccess<RegistryAuthority> _entityDataAccess;


        public RegistryAuthorityRepository(
             IEntityDataAccess<RegistryAuthorityViewModel> entityDataAccessVM
            , IEntityDataAccess<RegistryAuthority> entityDataAccess

            )
        {
            _entityDataAccessVM = entityDataAccessVM;
            _entityDataAccess = entityDataAccess;

        }

        public void Add(RegistryAuthority oRegistryAuthority)
        {
            try
            {
                _entityDataAccess.Add(oRegistryAuthority);
                var result = _entityDataAccess.GetById(oRegistryAuthority.registry_authority_id);

            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_registry_authority_name_country_id"))
                    throw new Exception("This registry authority name(" + oRegistryAuthority.registry_authority_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }

        public void Update(RegistryAuthority oRegistryAuthority)
        {
            try
            {
                var dbdata = _entityDataAccess.Get(oRegistryAuthority.registry_authority_id);
                dbdata.registry_authority_name = oRegistryAuthority.registry_authority_name;
                dbdata.registry_authority_short_name = oRegistryAuthority.registry_authority_short_name;
                dbdata.remarks = oRegistryAuthority.remarks;
                _entityDataAccess.Update(dbdata);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_registry_authority_name_country_id"))
                    throw new Exception("This Registry Authority Name name(" + oRegistryAuthority.registry_authority_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }

        public IEnumerable<dynamic> GetAllByRawSql()
        {
            try
            {
                var sql = @"select RA.*,C.country_name from [Administrative].[Registry_Authority] RA 
                       left join [Administrative].[Country] C on RA.country_id = c.country_id";
                return _entityDataAccessVM.SqlRawQuery(sql);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<dynamic> GetByIdRawSql(int registry_authority_id)
        {
            try
            {

                var sql = @"select RA.*,C.country_name from [Administrative].[Registry_Authority] RA 
                       left join [Administrative].[Country] C on RA.country_id = c.country_id where RA.registry_authority_id='" + registry_authority_id + "'";
                return _entityDataAccessVM.SqlRawQuery(sql);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public IEnumerable<RegistryAuthority> GetAllRegistryAuthority()
        {

            return _entityDataAccess.GetAll();
        }

        public RegistryAuthority GetById(int registry_authority_id)
        {
            return _entityDataAccess.GetById(registry_authority_id);
        }

        public IEnumerable<object> RegistryAuthorityCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.registry_authority_id)
                             select new { registry_authority_id = r.registry_authority_id, registry_authority_name = r.registry_authority_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int registry_authority_id)
        {
            RegistryAuthority oRegistryAuthority = new RegistryAuthority() { registry_authority_id = registry_authority_id };
            _entityDataAccess.Remove(oRegistryAuthority);
        }

    }
}
