namespace Auth.Model.Auth.ViewModel
{
    public class MenuEventViewModel
    {
        public int MenuEventId { get; set; }
        public int MenuId { get; set; }
        public int EventEnumId { get; set; }

        public static MenuEventViewModel ConvertToModel(dynamic menuEvent)
        {

            var model = new MenuEventViewModel();
            model.MenuId = menuEvent.menu_id;
            model.MenuEventId = menuEvent.menu_event_id ?? 0;
            model.EventEnumId = menuEvent.event_enum_id ?? 0;
           
            return model;
        }

    }
}
