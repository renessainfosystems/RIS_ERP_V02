using DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;

namespace Auth.DataAccess.EntityDataAccess
{
    public class EntityDataAccess<T>:IEntityDataAccess<T> where T: class
    {
        protected readonly ApplicationDBContext _context;
        private readonly DbSet<T> _dbSet;
        public EntityDataAccess(ApplicationDBContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
            _context.SaveChanges();
        }

        public void AddRange(IEnumerable<T> entities)
        {
            _context.Set<T>().AddRange(entities);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
            _context.SaveChanges();
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            _context.Set<T>().UpdateRange(entities);
            _context.SaveChanges();
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression);
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public T Get(object id)
        {
            return _dbSet.Find(id);
        }
        public T GetById(int id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
            _context.SaveChanges();
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
            _context.SaveChanges();
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>().Where(expression);
        }              

        public IQueryable<T> Queryable()
        {
            return _dbSet;
        }

        public bool Any(Expression<Func<T, bool>> expression)
        {
            return _dbSet.Any(expression);
        }

        public virtual IQueryable<T> SqlQuery(string query, params object[] parameters)
        {
            return _dbSet.FromSqlRaw(query, parameters).AsQueryable();
        }
       
        public int ExecuteSqlRaw(string sql, params object[] parameters)
        {
            return _context.Database.ExecuteSqlRaw(sql, parameters);
        }              
        public void Dispose()
        {
            _context.Dispose();
        }
               
        private string GetTableName()
        {
            ObjectContext objectContext = ((IObjectContextAdapter)_context).ObjectContext;
            string sql = objectContext.CreateObjectSet<T>().ToTraceString();
            Regex regex = new Regex("FROM (?<table>.*) AS");
            Match match = regex.Match(sql);

            string table = match.Groups["table"].Value;
            return table;
        }

        IEnumerable<dynamic> IEntityDataAccess<T>.SqlQueryGet(string sql, object[] parameters)
        {
            return _dbSet.FromSqlRaw(sql, parameters).ToList();
        }

        public int GetAutoId(string dbObjectName, string dbObjectColumn)
        {
            var sQuery = string.Format("SELECT TOP(1)* FROM {0} ORDER BY {1} DESC", dbObjectName, dbObjectColumn);
            var objs = _dbSet.FromSqlRaw(sQuery).ToList();
            int objId = 1;
            if (objs.Count > 0)
            {
                var obj = objs[0];
                objId = (int)obj.GetType().GetProperty(dbObjectColumn).GetValue(obj, null) + 1;
            }
            return objId;
        }

        public string GetAutoCode(string dbObjectName, string dbObjectColumn)
        {
            string prefix = "";
            prefix = prefix.PadLeft(1, '0');
            string  code;
            var sQuery = string.Format("SELECT TOP(1)* FROM {0} ORDER BY {1} DESC", dbObjectName, dbObjectColumn);
            var objs = _dbSet.FromSqlRaw(sQuery).ToList();
            int objId;
            if (objs.Count > 0)
            {
                var obj = objs[0];
                objId = (int)obj.GetType().GetProperty(dbObjectColumn).GetValue(obj, null) + 1;
            }
            else
            {
                objId = 1;
            }
            if (objId > 9)
            {
                code = Convert.ToString(objId);
            }
            else
            {
                code = "" + prefix + "" + objId + "";
            }
            return code;
        }
    }
   
}
