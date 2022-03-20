using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Auth.DataAccess.EntityDataAccess
{
    /// <summary>
    /// Created by Jahid
    /// Dated: 18/11/2021
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IEntityDataAccess<T> where T:class
    {
        T GetById(int id);
        T Get(object id);
        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Expression<Func<T, bool>> expression);
        void Add(T entity);
        void AddRange(IEnumerable<T> entities);
        void Update(T entity);
        void UpdateRange(IEnumerable<T> entities);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
        IEnumerable<T> GetAll(Expression<Func<T, bool>> expression);
        IQueryable<T> Queryable();
        bool Any(Expression<Func<T, bool>> expression);
        int ExecuteSqlRaw(string sql, params object[] parameters);
        IEnumerable<dynamic> SqlQueryGet(string sql, object[] parameters);
        int GetAutoId(string dbObjectName, string dbObjectColumn);
        string GetAutoCode(string dbObjectName, string dbObjectColumn);
    }
}
