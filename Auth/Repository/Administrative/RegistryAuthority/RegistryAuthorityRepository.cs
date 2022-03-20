using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;


namespace Auth.Repository.Administrative
{
    public class RegistryAuthorityRepository : IRegistryAuthorityRepository
    {
        //private readonly IEntityDataAccess<RegistryAuthority> _entityDataAccess;
        //public RegistryAuthorityRepository(
        // IEntityDataAccess<RegistryAuthority> entityDataAccess

        // )
        //{
        //    _entityDataAccess = entityDataAccess;

        //}

        private readonly IEntityDataAccess<RegistryAuthority> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public RegistryAuthorityRepository(
            IEntityDataAccess<RegistryAuthority> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;

        }

        public void Add(RegistryAuthority oRegistryAuthority)
        {
            try
            {
                oRegistryAuthority.registry_authority_id = GetAutoId();
                _entityDataAccess.Add(oRegistryAuthority);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_registry_authority_name_country_id"))
                    throw new Exception("This registry authority name(" + oRegistryAuthority.registry_authority_name + ") is already exists.");
                //else if (ex.InnerException.Message.Contains("UC_registry_authority_short_name"))
                //    throw new Exception("This registry authority short name(" + oRegistryAuthority.registry_authority_short_name + ") is already exists.");
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

                //_entityDataAccess.Update(oRegistryAuthority);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_association_name"))
                    throw new Exception("This association name(" + oRegistryAuthority.registry_authority_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_abbreviation"))
                    throw new Exception("This abbreviation(" + oRegistryAuthority.registry_authority_short_name + ") is already exists.");
                else
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

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.registry_authority_id).ToList();
                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                return id;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
