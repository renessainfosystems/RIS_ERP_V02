using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class KeySkillRepository : IKeySkillRepository
    {
        private readonly IEntityDataAccess<KeySkill> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public KeySkillRepository(
            IEntityDataAccess<KeySkill> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;

        }

        public void Add(KeySkill oKeySkill)
        {
            try
            {
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                oKeySkill.key_skill_id = _entityDataAccess.GetAutoId("Administrative.Key_Skill", "key_skill_id");
                oKeySkill.company_corporate_id = (int)company_corporate_id;
                _entityDataAccess.Add(oKeySkill);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_key_skill_name"))
                    throw new Exception("This key skill name(" + oKeySkill.key_skill_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public void Update(KeySkill oKeySkill)
        {
            try
            {                
                _entityDataAccess.Update(oKeySkill);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_key_skill_name"))
                    throw new Exception("This key skill name(" + oKeySkill.key_skill_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<KeySkill> GetAllKeySkill()
        {
            return _entityDataAccess.GetAll();
        }

        public KeySkill GetById(int key_skill_id)
        {
            return _entityDataAccess.GetById(key_skill_id);
        }

        public IEnumerable<object> KeySkillCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.key_skill_id)
                             select new { key_skill_id = r.key_skill_id, key_skill_name = r.key_skill_name };
                return result;
            }
            catch
            {
                return null;
            }
        }
        public void Delete(int key_skill_id)
        {
            KeySkill oKeySkill = new KeySkill() { key_skill_id = key_skill_id };
            _entityDataAccess.Remove(oKeySkill);
        }
    }
}
