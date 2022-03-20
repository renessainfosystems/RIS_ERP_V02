using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IEcommercePlatformRepository
    {
        void Add(EcommercePlatform oEcommercePlatform);
        void Update(EcommercePlatform oEcommercePlatform);
        IEnumerable<EcommercePlatform> GetAllEcommercePlatform();
        EcommercePlatform GetById(int ecommerce_paltforms_id);
        IEnumerable<object> EcommercePlatformCboList();
        void Delete(int ecommerce_paltforms_id);
    }
}
