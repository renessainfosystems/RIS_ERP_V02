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
    public class RegulatorRepository : IRegulatorRepository
    {
        private readonly IEntityDataAccess<RegulatorViewModel> _entityDataAccessVM;
        private readonly IEntityDataAccess<Regulator> _entityDataAccess;

        public RegulatorRepository(
            IEntityDataAccess<RegulatorViewModel> entityDataAccessVM
            , IEntityDataAccess<Regulator> entityDataAccess)
        {
            _entityDataAccessVM = entityDataAccessVM;
            _entityDataAccess = entityDataAccess;

        }

        public void Add(Regulator oRegulator)
        {
            try
            {
                oRegulator.regulator_id = GetAutoId();
                _entityDataAccess.Add(oRegulator);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_regulator_name_country_id"))
                    throw new Exception("This Ecommerce Platform name(" + oRegulator.regulator_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public void Update(Regulator oRegulator)
        {
            try
            {
                _entityDataAccess.Update(oRegulator);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_regulator_name_country_id"))
                    throw new Exception("This Ecommerce Platform name(" + oRegulator.regulator_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }


        public IEnumerable<dynamic> GetAllByRawSql()
        {
            try
            {
                var sql = @"select RT.*,C.country_name from [Administrative].[Regulator] RT 
                       left join [Administrative].[Country] C on RT.country_id=C.country_id order by regulator_id desc";
                return _entityDataAccessVM.SqlRawQuery(sql);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<dynamic> GetByIdRawSql(int regulator_id)
        {
            try
            {
                var sql = @"select RT.*,C.country_name from [Administrative].[Regulator] RT 
                       left join [Administrative].[Country] C on RT.country_id=C.country_id where RT.regulator_id='" + regulator_id + "'";
                return _entityDataAccessVM.SqlRawQuery(sql);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public IEnumerable<Regulator> GetAllRegulator()
        {
            return _entityDataAccess.GetAll();
        }

        public Regulator GetById(int regulator_id)
        {
            return _entityDataAccess.GetById(regulator_id);
        }

        public IEnumerable<object> RegulatorCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.regulator_id)
                             select new { regulator_id = r.regulator_id, regulator_name = r.regulator_name };
                return result;
            }
            catch
            {
                return null;
            }
        }


        public void Delete(int regulator_id)
        {
            Regulator oRegulator = new Regulator() { regulator_id = regulator_id };
            _entityDataAccess.Remove(oRegulator);
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.regulator_id).ToList();
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
