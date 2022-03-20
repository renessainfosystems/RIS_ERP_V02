using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IRegulatorRepository
    {
        void Add(Regulator oRegulator);
        void Update(Regulator oRegulator);
        IEnumerable<Regulator> GetAllRegulator();
        Regulator GetById(int regulator_id);
        IEnumerable<object> RegulatorCboList();
        void Delete(int regulator_id);
    }
}
