using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;



namespace Auth.Repository.Administrative
{
    public class MfsRepository : IMfsRepository
    {
        private readonly IEntityDataAccess<Mfs> _entityDataAccess;

        public MfsRepository(
            IEntityDataAccess<Mfs> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;

        }
        public void Add(Mfs oMfs)
        {
            try
            {
                oMfs.mfs_id = GetAutoId();
                _entityDataAccess.Add(oMfs);
            }
            catch (Exception ex)
            {

                if (ex.InnerException.Message.Contains("UC_mobile_financial_service"))
                    throw new Exception("This Mobile Finance Service (" + oMfs.mfs_name + ") is already exists");
                else
                    throw new Exception(ex.Message);
            }
        }

        public void Delete(int mfs_id)
        {
            Mfs oMfs = new Mfs() { mfs_id = mfs_id };
            _entityDataAccess.Remove(oMfs);
        }

        public IEnumerable<Mfs> GetAllMfs()
        {
            return _entityDataAccess.GetAll();
        }

        public Mfs GetById(int mfs_id)
        {
            return _entityDataAccess.GetById(mfs_id);
        }

        public IEnumerable<object> MfsCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.mfs_id)
                             select new { mfs_id = r.mfs_id, mfs_name = r.mfs_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Update(Mfs oMfs)
        {
            try
            {
                _entityDataAccess.Update(oMfs);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_mobile_financial_service"))
                    throw new Exception("This Mobile Finance Service (" + oMfs.mfs_name + ") is already exists");
                else
                    throw new Exception(ex.Message);
            }
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.mfs_id).ToList();
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
