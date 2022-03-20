
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompetencyRepository
    {
        void Add(Competency oCompetency);
        void Update(Competency oCompetency);
        IEnumerable<Competency> GetAllCompetency();
        Competency GetById(int competency_id);
        IEnumerable<object> CompetencyCboList();
        void Delete(int competency_id);

    }
}
