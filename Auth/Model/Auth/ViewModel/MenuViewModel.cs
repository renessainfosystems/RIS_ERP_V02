using Auth.Model.Auth.Model;
using System;
using System.Collections.Generic;

namespace Auth.Model.Auth.ViewModel
{
    public class MenuViewModel
    {
        public int MenuId { get; set; }
        public int MenuParentId { get; set; }
        public string MenuName { get; set; }
        public Boolean IsActive { get; set; }
        public int SortingPriority { get; set; }
        public string MenuIconPath { get; set; }
        public string MenuRoutingPath { get; set; }
        public string CallingParameterValue { get; set; }
        public string CallingParameterType { get; set; }

        public List<MenuEvent> menuEvents { get; set; }
        public static MenuViewModel ConvertToModel(dynamic menu)
        {

            var model = new MenuViewModel();
            model.MenuId = menu.menu_id;
            model.MenuParentId = menu.menu_parentid ?? 0;
            model.MenuName = menu.menu_name ?? "";
            model.IsActive = menu.is_active ?? false;
            model.SortingPriority = menu.sorting_priority ?? 0;
            model.MenuIconPath = menu.menu_icon_path ?? "";
            model.MenuRoutingPath = menu.menu_routing_path ?? "";
            model.CallingParameterValue = menu.calling_parameter_value ?? "";
            model.CallingParameterType = menu.calling_parameter_type ?? "";
            return model;
        }

        public static MenuViewModel ConvertToMenuEvent(dynamic menu, dynamic menuEventsList)
        {

            var model = new MenuViewModel();
            model.MenuId = menu.menu_id;
            model.MenuParentId = menu.menu_parentid ?? 0;
            model.MenuName = menu.menu_name ?? "";
            model.IsActive = menu.is_active ?? false;
            model.SortingPriority = menu.sorting_priority ?? 0;
            model.MenuIconPath = menu.menu_icon_path ?? "";
            model.MenuRoutingPath = menu.menu_routing_path ?? "";
            model.CallingParameterValue = menu.calling_parameter_value ?? "";
            model.CallingParameterType = menu.calling_parameter_type ?? "";
            model.menuEvents = menuEventsList[0];
            return model;
        }
    }
}
