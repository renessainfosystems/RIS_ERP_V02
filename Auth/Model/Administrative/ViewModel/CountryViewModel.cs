namespace Administrative.Model.ViewModel
{
    /// <summary>
    /// Created by Jahiud
    /// Dated: 22/11/2021
    /// </summary>
    public class CountryViewModel
    {
        public int CountryId { get; set; }
        public byte ContinentEnum { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public string CountryShortName { get; set; }
        public string CountryNameLocalLanguage { get; set; }
        public string CountryShortNameLocalLanguage { get; set; }
        public string Remarks { get; set; }
        public int Value { get; set; }
        public string Text { get; set; }
    }
}
