namespace Administrative.Model.ViewModel
{
    /// <summary>
    /// Created by Jahiud
    /// Dated: 22/11/2021
    /// </summary>
    public class DistrictViewModel
    {    
        public int DistrictId { get; set; }
        public byte DivisionId { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public string DistrictShortName { get; set; }
        public string DistrictNameLocalLanguage { get; set; }
        public string DistrictShortNameLocalLanguage { get; set; }
        public string Remarks { get; set; }
        public int Value { get; set; }
        public string Text { get; set; }
    }
}
