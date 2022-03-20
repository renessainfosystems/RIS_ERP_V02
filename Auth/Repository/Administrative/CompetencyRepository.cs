using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class CompetencyRepository:ICompetencyRepository
    {
        private readonly IEntityDataAccess<Competency> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public CompetencyRepository(
            IEntityDataAccess<Competency> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Competency oCompetency)
        {
            try
            {
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                oCompetency.company_corporate_id = (int)company_corporate_id;
                oCompetency.competency_id = _entityDataAccess.GetAutoId("Administrative.Competency", "competency_id");
                _entityDataAccess.Add(oCompetency);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_competency_name"))
                    throw new Exception("This competency name(" + oCompetency.competency_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(Competency oCompetency)
        {
            try
            {
                _entityDataAccess.Update(oCompetency);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_competency_name"))
                    throw new Exception("This competency name(" + oCompetency.competency_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Competency> GetAllCompetency()
        {
            return  _entityDataAccess.GetAll();
        }

        public Competency GetById(int competency_id)
        {
            return _entityDataAccess.GetById(competency_id);
        }

        public IEnumerable<object> CompetencyCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.competency_id)
                       select new { competency_id = r.competency_id, competency_name = r.competency_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int competency_id)
        {
            Competency oCompetency = new Competency() { competency_id = competency_id };
            _entityDataAccess.Remove(oCompetency);
        }
    }
}
