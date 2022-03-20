using Dapper;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Utility.Auth.Enum;

namespace Utility
{
    public class CommonParammeter
    {
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public DynamicParameters ParameterBinding(object obj,int operationType)
        {
            DynamicParameters parameters = new DynamicParameters();
            var objList = obj.GetType().GetProperties().ToList();
            if(operationType== (int)GlobalEnumList.DBOperation.Delete)
            {
                var modelKey = objList.FirstOrDefault(p => p.GetCustomAttributes(false).Any(a => a.GetType() == typeof(KeyAttribute)));
                parameters.Add("@" + modelKey.Name, modelKey.GetValue(obj, null));
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Create);
            }
            else
            {
                for (int i = 0; i < objList.Count; i++)
                {
                    parameters.Add("@" + objList[i].Name, objList[i].GetValue(obj, null));
                }
            }
            parameters.Add("@DBOperation", operationType);

            return parameters;
        }
     
    }
}
