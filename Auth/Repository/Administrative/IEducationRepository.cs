
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IEducationRepository
    {
        void Add(Education oEducation);
        void Update(Education oEducation);
        IEnumerable<Education> GetAllEducation();
        Education GetById(int education_id);
        IEnumerable<object> EducationCboList();
        void Delete(int education_id);

    }
}
