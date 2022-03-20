
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IKeySkillRepository
    {
        void Add(KeySkill oKeySkill);
        void Update(KeySkill oKeySkill);
        IEnumerable<KeySkill> GetAllKeySkill();
        KeySkill GetById(int key_skill_id);
        IEnumerable<object> KeySkillCboList();
        void Delete(int key_skill_id);

    }
}
