using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using Auth.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess;
using Microsoft.EntityFrameworkCore;


namespace Auth.Repository.Administrative
{
    public class AssociationRepository : IAssociationRepository
    {
        private readonly IEntityDataAccess<AssociationViewModel> _entityDataAccessVM;
        private readonly IEntityDataAccess<Association> _entityDataAccess;

        public AssociationRepository(
                 IEntityDataAccess<AssociationViewModel> entityDataAccessVM
                 ,IEntityDataAccess<Association> entityDataAccess
            )
        {
            _entityDataAccessVM = entityDataAccessVM;
            _entityDataAccess = entityDataAccess;
        }


        public void Add(Association oAssociation)
        {
            try
            {
                _entityDataAccess.Add(oAssociation);
                var result = _entityDataAccess.GetById(oAssociation.association_id);

            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_association"))
                    throw new Exception("This association name(" + oAssociation.association_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }

        public void Update(Association oAssociation)
        {
            try
            {
                _entityDataAccess.Update(oAssociation);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_association"))
                    throw new Exception("This association name(" + oAssociation.association_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }

        public IEnumerable<dynamic> GetAllByRawSql()
        {
            try
            {
                var sql = @"select A.*,C.country_name,OT.organization_type_name_enum 
                       from[Administrative].[Association] A left join[Administrative].[Country] C on A.country_id = C.country_id
                       left join[DBEnum].[Organization_Type] OT on A.organization_type_id_enum = OT.organization_type_id_enum order by association_id desc";
                return _entityDataAccessVM.SqlRawQuery(sql);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public IEnumerable<dynamic> GetByIdRawSql(int association_id)
        {
            try
            {
                var sql = @"select A.*,C.country_name,OT.organization_type_name_enum 
                       from[Administrative].[Association] A left join[Administrative].[Country] C on A.country_id = C.country_id
                       left join[DBEnum].[Organization_Type] OT on A.organization_type_id_enum = OT.organization_type_id_enum where A.association_id='" + association_id + "'";
                return _entityDataAccessVM.SqlRawQuery(sql);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public IEnumerable<Association> GetAllAssociation()
        {
            return _entityDataAccess.GetAll();
        }


        public Association GetById(int association_id)
        {
            return _entityDataAccess.GetById(association_id);
        }


        public IEnumerable<object> AssociationCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.association_id)
                             select new { association_id = r.association_id, association_name = r.association_name };
                return result;

            }
            catch
            {
                return null;
            }
        }

        public void Delete(int association_id)
        {
            Association oAssociation = new Association() { association_id = association_id };
            _entityDataAccess.Remove(oAssociation);
        }
    }
}
