using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class SecurityDepositRepository : ISecurityDepositRepository
    {
        private readonly IEntityDataAccess<SecurityDeposit> _entityDataAccess;

        public SecurityDepositRepository(IEntityDataAccess<SecurityDeposit> entityDataAccess)
        {
            _entityDataAccess = entityDataAccess;

        }

        public void Add(SecurityDeposit oSecurityDeposit)
        {
            try
            {
                oSecurityDeposit.security_deposit_id = GetAutoId();
                _entityDataAccess.Add(oSecurityDeposit);
            }
            catch (Exception ex)
            {

            }
        }

        public void Delete(int security_deposit_id)
        {
            SecurityDeposit oSecurityDeposit = new SecurityDeposit() { security_deposit_id = security_deposit_id };
            _entityDataAccess.Remove(oSecurityDeposit);
        }

        public IEnumerable<SecurityDeposit> GetAllSecurityDeposit()
        {
            return _entityDataAccess.GetAll();
        }

        public SecurityDeposit GetById(int security_deposit_id)
        {
            return _entityDataAccess.GetById(security_deposit_id);
        }

        public IEnumerable<object> SecurityDepositCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.security_deposit_id)
                             select new { security_deposit_id = r.security_deposit_id, security_deposit_name = r.security_deposit_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Update(SecurityDeposit oSecurityDeposit)
        {
            try
            {
                _entityDataAccess.Update(oSecurityDeposit);
            }
            catch (Exception ex)
            {

            }
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.security_deposit_id).ToList();
                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                return id;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
