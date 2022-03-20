
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IPositionRepository
    {
        void Add(Position oPosition);
        void Update(Position oPosition);
        IEnumerable<Position> GetAllPosition();
        Position GetById(int position_id);
        IEnumerable<object> PositionCboList();
        void Delete(int position_id);

    }
}
