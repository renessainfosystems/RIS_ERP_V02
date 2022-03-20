namespace Administrative.Model.ViewModel
{
    public class BankAllViewModel
    {
        public int BankId { get; set; }
        public string BankName { get; set; }

        public static BankAllViewModel ConvertToBankAllModel(dynamic bank)
        {

            var model = new BankAllViewModel();
            model.BankId = bank.bank_id;
            model.BankName = bank.bank_name ?? "";

            return model;

        }
    }


}
