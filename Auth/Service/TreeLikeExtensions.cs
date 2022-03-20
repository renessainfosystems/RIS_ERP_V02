using Auth.Model.Auth.Model;
using Auth.Utility.Model;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Service
{
    public static class TreeLikeExtensions
    {
        public static IList<Dto> BuildTrees(this IQueryable<Menu> models)
        {
            var dtos = models.Select(m => new Dto
            {
                data = new Data { MenuId = m.menu_id, MenuParentId = m.menu_parentid, MenuName = m.menu_name, 
                    SortingPriority = m.sorting_priority,MenuIconPath=m.menu_icon_path,MenuRoutingPath=m.menu_routing_path,CallingParameterType=m.calling_parameter_type,CallingParameterValue=m.calling_parameter_value,IsActive=m.is_active }
               
            }).OrderBy(x => x.data.MenuParentId).ThenBy(x => x.data.SortingPriority).ToList();

            return BuildTrees(0, dtos);
        }


        // private helper function that builds tree recursively
        private static IList<Dto> BuildTrees(int? pid, IList<Dto> candicates)
        {
            var children = candicates.Where(c => c.data.MenuParentId == pid).ToList();
            if (children == null || children.Count() == 0)
            {
                return null;
            }
            foreach (var i in children)
            {
                i.children = BuildTrees(i.data.MenuId, candicates);
            }
            return children;
        }
    }
}
