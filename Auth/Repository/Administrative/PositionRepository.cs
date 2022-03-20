using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Auth.Model.DomainModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class PositionRepository:IPositionRepository
    {
        private readonly IEntityDataAccess<Position> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public PositionRepository(
            IEntityDataAccess<Position> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Position oPosition)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
                oPosition.position_id = _entityDataAccess.GetAutoId("Administrative.Position", "position_id");
                oPosition.created_user_id = (long)currentUserInfoId;
                oPosition.company_corporate_id = (int)company_corporate_id;
                oPosition.created_datetime = DateTime.Now;
                oPosition.db_server_date_time = DateTime.Now;
                _entityDataAccess.Add(oPosition);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_position_code"))
                    throw new Exception("This position code(" + oPosition.position_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_position_name"))
                    throw new Exception("This position name(" + oPosition.position_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_position_short_name"))
                    throw new Exception("This position short name(" + oPosition.position_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }
        }
        public void Update(Position oPosition)
        {
            try
            {               
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                oPosition.updated_datetime = DateTime.Now;
                oPosition.updated_user_id = (long)currentUserInfoId;
                _entityDataAccess.Update(oPosition);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_position_code"))
                    throw new Exception("This position code(" + oPosition.position_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_position_name"))
                    throw new Exception("This position name(" + oPosition.position_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_position_short_name"))
                    throw new Exception("This position short name(" + oPosition.position_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Position> GetAllPosition()
        {
            return  _entityDataAccess.GetAll();
        }

        public Position GetById(int position_id)
        {
            return _entityDataAccess.GetById(position_id);
        }

        public IEnumerable<object> PositionCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.position_id)
                       select new { position_id = r.position_id, position_name = r.position_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int position_id)
        {
            Position oPosition = new Position() { position_id = position_id };
            _entityDataAccess.Remove(oPosition);
        }
    }
}
