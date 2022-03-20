using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class EducationRepository:IEducationRepository
    {
        private readonly IEntityDataAccess<Education> _entityDataAccess;
        
        public EducationRepository(
            IEntityDataAccess<Education> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;        
        }
       
        public void Add(Education oEducation)
        {
            try
            {
                oEducation.education_id = _entityDataAccess.GetAutoId("Administrative.Education", "education_id");
                _entityDataAccess.Add(oEducation);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_education_name"))
                    throw new Exception("This education name(" + oEducation.education_name + ") is already exists.");               
                else
                    throw new Exception(ex.Message);
            }
        }
        public void Update(Education oEducation)
        {
            try
            {
                _entityDataAccess.Update(oEducation);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_education_name"))
                    throw new Exception("This education name(" + oEducation.education_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public IEnumerable<Education> GetAllEducation()
        {
            return  _entityDataAccess.GetAll();
        }

        public Education GetById(int education_id)
        {
            return _entityDataAccess.GetById(education_id);
        }

        public IEnumerable<object> EducationCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.education_id)
                       select new { education_id = r.education_id, education_name = r.education_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }
        public void Delete(int education_id)
        {
            Education oEducation = new Education() { education_id = education_id };
            _entityDataAccess.Remove(oEducation);
        }       
    }
}
