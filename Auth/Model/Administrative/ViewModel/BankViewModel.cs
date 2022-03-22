namespace Administrative.Model.ViewModel
{
    public class BankViewModel
    {
        public int BankId { get; set; }
        public string BankName { get; set; }
        public string BankShortName { get; set; }
        public string BankSwiftCode { get; set; }
        public string BankEmail { get; set; }
        public string BankWebUrl { get; set; }
        public int CountryId { get; set; }
        public int DivisionId { get; set; }
        public int DistrictId { get; set; }
        public string City { get; set; }
        public string PsArea { get; set; }
        public string PostCode { get; set; }
        public string Block { get; set; }
        public string RoadNo { get; set; }
        public string HouseNo { get; set; }
        public string FlatNo { get; set; }
        public string AddressNote { get; set; }
        public string Remarks { get; set; }
        public bool IsBank { get; set; }

        public bool IsLocal { get; set; }

        public string CountryName { get; set; }
        public string DivisionName { get; set; }
        public string DistrictName { get; set; }

        //public bool IsActive { get; set; }


        public static BankViewModel ConvertToModel(dynamic bank)
        {

            var model = new BankViewModel();
            model.BankId = bank.bank_id;
            model.BankName = bank.bank_name ?? "";
            model.BankShortName = bank.bank_short_name ?? "";
            model.BankSwiftCode = bank.bank_swift_code ?? "";
            model.BankEmail = bank.bank_email ?? "";
            model.BankWebUrl = bank.bank_web_url ?? "";
            model.CountryId = bank.country_id ?? 0;
            model.DivisionId = bank.division_id ?? 0;
            model.DistrictId = bank.district_id ?? 0;
            model.City = bank.city ?? "";
            model.PsArea = bank.ps_area ?? "";
            model.PostCode = bank.post_code ?? "";
            model.Block = bank.block ?? "";
            model.RoadNo = bank.road_no ?? "";
            model.HouseNo = bank.house_no ?? "";
            model.FlatNo = bank.flat_no ?? "";
            model.AddressNote = bank.address_note ?? "";
            model.Remarks = bank.remarks ?? "";
            model.IsBank = bank.is_bank ?? false;
            model.IsLocal = bank.is_local ?? false;

            model.CountryName = bank.country_name ?? "";
            model.DivisionName = bank.division_name ?? "";
            model.DistrictName = bank.district_name ?? "";

            // model.IsActive = bank.is_active ?? true;

            return model;

        }

        public static BankViewModel ConvertToBankModel(dynamic bank)
        {

            var model = new BankViewModel();
            model.BankId = bank.bank_id;
            model.BankName = bank.bank_name ?? "";
         

            return model;

        }
    }
}
