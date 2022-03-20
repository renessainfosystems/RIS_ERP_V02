namespace Administrative.Model.ViewModel
{
    public class BankBranchViewModel
    {
        public int BankBranchId { get; set; }
        public string BankBranchName { get; set; }
        public string BankBranchShortName { get; set; }
        public string BankBranchRouting { get; set; }
        public int BankId { get; set; }
        public string BankBranchContactNumber { get; set; }
        public string BankBranchEmail { get; set; }
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
        public bool IsBranch { get; set; }
        //public bool IsActive { get; set; }



        public static BankBranchViewModel ConvertToModel(dynamic bankBranch)
        {

            var model = new BankBranchViewModel();
            model.BankBranchId = bankBranch.bank_branch_id;
            model.BankBranchName = bankBranch.bank_branch_name ?? "";
            model.BankBranchShortName = bankBranch.bank_branch_short_name ?? "";
            model.BankBranchRouting = bankBranch.bank_branch_routing ?? "";
            model.BankId = bankBranch.bank_id ?? 0;
            model.BankBranchContactNumber = bankBranch.bank_branch_contact_number ?? "";
            model.BankBranchEmail = bankBranch.bank_branch_email ?? "";
            model.CountryId = bankBranch.country_id ?? 0;
            model.DivisionId = bankBranch.division_id ?? 0;
            model.DistrictId = bankBranch.district_id ?? 0;
            model.City = bankBranch.city ?? "";
            model.PsArea = bankBranch.ps_area ?? "";
            model.PostCode = bankBranch.post_code ?? "";
            model.Block = bankBranch.block ?? "";
            model.RoadNo = bankBranch.road_no ?? "";
            model.HouseNo = bankBranch.house_no ?? "";
            model.FlatNo = bankBranch.flat_no ?? "";
            model.AddressNote = bankBranch.address_note ?? "";
            model.Remarks = bankBranch.remarks ?? "";
            model.IsBranch = bankBranch.is_branch ?? false;
            //model.IsActive = bankBranch.is_active ?? true;
            return model;


    }
    }
}
