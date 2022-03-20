using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class EcommercePlatformRepository : IEcommercePlatformRepository
    {
        private readonly IEntityDataAccess<EcommercePlatform> _entityDataAccess;

        public EcommercePlatformRepository(
            IEntityDataAccess<EcommercePlatform> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;

        }
        public void Add(EcommercePlatform oEcommercePlatform)
        {
            try
            {
                oEcommercePlatform.ecommerce_paltforms_id = GetAutoId();
                _entityDataAccess.Add(oEcommercePlatform);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_ecommerce_paltforms_name"))
                    throw new Exception("This Ecommerce Platform name(" + oEcommercePlatform.ecommerce_paltforms_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }

        public void Update(EcommercePlatform oEcommercePlatform)
        {
            try
            {
                _entityDataAccess.Update(oEcommercePlatform);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_ecommerce_paltforms_name"))
                    throw new Exception("This Ecommerce Platform name(" + oEcommercePlatform.ecommerce_paltforms_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }

        public IEnumerable<EcommercePlatform> GetAllEcommercePlatform()
        {
            return _entityDataAccess.GetAll();
        }


        public EcommercePlatform GetById(int ecommerce_paltforms_id)
        {
            return _entityDataAccess.GetById(ecommerce_paltforms_id);
        }

        public IEnumerable<object> EcommercePlatformCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.ecommerce_paltforms_id)
                             select new { id = r.ecommerce_paltforms_id, name = r.ecommerce_paltforms_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int ecommerce_paltforms_id)
        {
            EcommercePlatform oEcommercePlatform = new EcommercePlatform() { ecommerce_paltforms_id = ecommerce_paltforms_id };
            _entityDataAccess.Remove(oEcommercePlatform);
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.ecommerce_paltforms_id).ToList();
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
            catch (Exception)
            {
                throw;
            }

        }

    }
}
