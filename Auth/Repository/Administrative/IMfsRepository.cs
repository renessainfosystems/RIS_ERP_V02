using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IMfsRepository
    {
        void Add(Mfs oMfs);
        void Update(Mfs oMfs);
        IEnumerable<Mfs> GetAllMfs();
        IEnumerable<dynamic> GetAllByRawSql();
        IEnumerable<dynamic> GetByIdRawSql(int mfs_id);
        Mfs GetById(int mfs_id);
        IEnumerable<object> MfsCboList();
        void Delete(int mfs_id);
    }
}
