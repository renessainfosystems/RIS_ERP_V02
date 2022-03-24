using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using Auth.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess;
using Microsoft.EntityFrameworkCore;

namespace Auth.Repository.Administrative
{
    public class EcommercePlatformRepository : IEcommercePlatformRepository
    {
        private readonly IEntityDataAccess<EcommercePlatformViewModel> _entityDataAccessVM;
        private readonly IEntityDataAccess<EcommercePlatform> _entityDataAccess;
 

        public EcommercePlatformRepository(
            IEntityDataAccess<EcommercePlatformViewModel> entityDataAccessVM
            , IEntityDataAccess<EcommercePlatform> entityDataAccess

            )
        {
            _entityDataAccessVM = entityDataAccessVM;
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
                if (ex.InnerException.Message.Contains("UC_ecommerce_platforms"))
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
                if (ex.InnerException.Message.Contains("UC_ecommerce_platforms"))
                    throw new Exception("This Ecommerce Platform name(" + oEcommercePlatform.ecommerce_paltforms_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }

        public IEnumerable<dynamic> GetAllByRawSql()
        {
            try
            {
                var sql = @"select EP.*,C.country_name from [Administrative].[Ecommerce_Platforms] EP 
                       left join [Administrative].[Country] C on EP.country_id=C.country_id order by ecommerce_paltforms_id desc";
                return _entityDataAccessVM.SqlRawQuery(sql);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<dynamic> GetByIdRawSql(int ecommerce_paltforms_id)
        {
            try
            {

                var sql = @"select EP.*,C.country_name from [Administrative].[Ecommerce_Platforms] EP 
                       left join [Administrative].[Country] C on EP.country_id= c.country_id where EP.ecommerce_paltforms_id='" + ecommerce_paltforms_id + "'";
                return _entityDataAccessVM.SqlRawQuery(sql);
            }
            catch (Exception ex)
            {
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
