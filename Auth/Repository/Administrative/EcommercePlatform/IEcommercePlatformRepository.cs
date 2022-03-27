using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IEcommercePlatformRepository
    {
        void Add(EcommercePlatform oEcommercePlatform);
        void Update(EcommercePlatform oEcommercePlatform);
        IEnumerable<EcommercePlatform> GetAllEcommercePlatform();
        IEnumerable<dynamic> GetAllByRawSql();
        IEnumerable<dynamic> GetByIdRawSql(int ecommerce_paltforms_id);
        EcommercePlatform GetById(int ecommerce_paltforms_id);
        IEnumerable<object> EcommercePlatformCboList();
        void Delete(int ecommerce_paltforms_id);
    }
}
