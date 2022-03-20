namespace Administrative.Model.ViewModel
{
    /// <summary>
    /// Created by Jahiud
    /// Dated: 22/11/2021
    /// </summary>
    public class DivisionViewModel
    {
        public int DivisionId { get; set; }
        public byte CountryId { get; set; }
        public string DivisionCode { get; set; }
        public string DivisionName { get; set; }
        public string DivisionShortName { get; set; }
        public string DivisionNameLocalLanguage { get; set; }
        public string DivisionShortNameLocalLanguage { get; set; }
        public string Remarks { get; set; }
        public int Value { get; set; }
        public string Text { get; set; }
    }
}
