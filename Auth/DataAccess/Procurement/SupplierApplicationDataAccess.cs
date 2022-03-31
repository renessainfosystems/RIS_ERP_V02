using Auth.Model.Procurement.Model;
using Auth.Model.Procurement.ViewModel;
using Auth.Utility;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Auth.Utility.Procurement.Enum;
using static Auth.Utility.CommonMessage;

//using Auth.Model.Party.Model;
//using Auth.Model.Party.ViewModel;
//using Auth.Utility;
//using Auth.Utility.Party.Enum;
//using Dapper;
//using DataAccess;
//using Microsoft.AspNetCore.Http;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Linq;
//using System.Threading.Tasks;


namespace DataAccess.Procurement
{
    public class SupplierApplicationDataAccess
    {
        public IConfiguration _config;

        private readonly IDbConnection _dbConnection;
        //protected CommonParammeter _commonParammeter { get; set; }

        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public SupplierApplicationDataAccess(IConfiguration configuration, IDbConnection dbConnection)
        {
            _config = configuration;
            _dbConnection = dbConnection;

        }

        //Parameter Binding
        public DynamicParameters SupplierApplicationParameterBinding(SupplierApplication supplierApplication, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var company_corporate_id = _httpContextAccessor.HttpContext.Items["company_corporate_id"];
            var company_group_id = _httpContextAccessor.HttpContext.Items["company_group_id"];
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierApplication.supplier_id, DbType.Int32);
                parameters.Add("@company_corporate_id", company_corporate_id ?? 0, DbType.Int32);
                parameters.Add("@company_group_id", company_group_id ?? 0, DbType.Int32);
                parameters.Add("@company_id", company_id ?? 0, DbType.Int32);
                parameters.Add("@supplier_code", supplierApplication.supplier_code, DbType.String);
                parameters.Add("@legal_name", supplierApplication.legal_name, DbType.String);
                parameters.Add("@short_name", supplierApplication.short_name, DbType.String);
                parameters.Add("@name_in_local_language", supplierApplication.name_in_local_language, DbType.String);
                parameters.Add("@address_in_local_language", supplierApplication.address_in_local_language, DbType.String);
                parameters.Add("@year_established", supplierApplication.year_established, DbType.DateTime);
                parameters.Add("@domicile_enum_id", supplierApplication.domicile_enum_id, DbType.Int32);
                parameters.Add("@registry_authority_id", supplierApplication.registry_authority_id, DbType.Int32);
                parameters.Add("@regulator_id", supplierApplication.regulator_id, DbType.Int32);
                parameters.Add("@ownership_type_id", supplierApplication.ownership_type_id, DbType.Int32);
                parameters.Add("@supplier_logo", supplierApplication.supplier_logo, DbType.String);
                parameters.Add("@country_id", supplierApplication.country_id, DbType.Int32);
                parameters.Add("@division_id", supplierApplication.division_id, DbType.Int32);
                parameters.Add("@district_id", supplierApplication.district_id, DbType.Int32);
                parameters.Add("@city", supplierApplication.city, DbType.String);
                parameters.Add("@ps_area", supplierApplication.ps_area, DbType.String);
                parameters.Add("@post_code", supplierApplication.post_code, DbType.String);
                parameters.Add("@block", supplierApplication.block, DbType.String);
                parameters.Add("@road_no", supplierApplication.road_no, DbType.String);
                parameters.Add("@house_no", supplierApplication.house_no, DbType.String);
                parameters.Add("@flat_no", supplierApplication.flat_no, DbType.String);
                parameters.Add("@email", supplierApplication.email, DbType.String);
                parameters.Add("@mobile_no", supplierApplication.mobile_no, DbType.String);
                parameters.Add("@phone_no", supplierApplication.phone_no, DbType.String);
                parameters.Add("@pabx", supplierApplication.pabx, DbType.String);
                parameters.Add("@created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@updated_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@created_user_info_id", user_info_id ?? 0, DbType.Int64);
                parameters.Add("@updated_user_info_id", user_info_id ?? 0, DbType.Int64);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_id", supplierApplication.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            else if (operationType == (int)GlobalEnumList.DBOperation.Submit)
            {
                parameters.Add("@supplier_id", supplierApplication.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Submit);
            }

            return parameters;
        }

        public DynamicParameters SupplierBusinessParameterBinding(SupplierBusiness supplierBusiness, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierBusiness.supplier_id, DbType.Int32);
                parameters.Add("@business_activities_enum_id", supplierBusiness.business_activities_enum_id, DbType.Int32);
                parameters.Add("@management_staff_no", supplierBusiness.management_staff_no, DbType.String);
                parameters.Add("@nonmanagement_staff_no", supplierBusiness.nonmanagement_staff_no, DbType.String);
                parameters.Add("@permanent_worker_no", supplierBusiness.permanent_worker_no, DbType.String);
                parameters.Add("@casual_worker_no", supplierBusiness.casual_worker_no, DbType.String);


                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_id", supplierBusiness.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierBusinessSubSectorSessionParameterBinding(SubSectorSession subSectorSession, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", subSectorSession.supplier_id, DbType.Int32);
                parameters.Add("@industry_sub_sector_id", subSectorSession.industry_sub_sector_id, DbType.Int32);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_id", subSectorSession.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierBusinessEcommerceSessionParameterBinding(EcommerceSession ecommerceSession, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", ecommerceSession.supplier_id, DbType.Int32);
                parameters.Add("@ecommerce_platforms_id", ecommerceSession.ecommerce_platforms_id, DbType.Int32);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_id", ecommerceSession.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierAssociationParameterBinding(SupplierAssociation supplierAssociation, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierAssociation.supplier_id, DbType.Int32);
                parameters.Add("@association_id", supplierAssociation.association_id, DbType.Int32);
                parameters.Add("@membership_type_enum_id", supplierAssociation.membership_type_enum_id, DbType.Int32);
                parameters.Add("@association_number", supplierAssociation.association_number, DbType.String);
                parameters.Add("@start_date", supplierAssociation.start_date, DbType.DateTime);



                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_association_id", supplierAssociation.supplier_association_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }
        
        public DynamicParameters SupplierDocumentParameterBinding(SupplierDocument supplierDocument, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierDocument.supplier_id, DbType.Int32);
                parameters.Add("@document_type_id", supplierDocument.document_type_id, DbType.Int32);
                parameters.Add("@document_number", supplierDocument.document_number, DbType.String);
                parameters.Add("@issue_date", supplierDocument.issue_date, DbType.DateTime);
                parameters.Add("@expiry_date", supplierDocument.expiry_date, DbType.DateTime);
                parameters.Add("@file_path", supplierDocument.file_path, DbType.String);
                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_document_id", supplierDocument.supplier_document_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierLocationParameterBinding(SupplierLocation supplierLocation, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierLocation.supplier_id, DbType.Int32);
                parameters.Add("@supplier_location_name", supplierLocation.supplier_location_name, DbType.String);
                parameters.Add("@location_type_id", supplierLocation.location_type_id, DbType.Int32);
                parameters.Add("@country_id", supplierLocation.country_id, DbType.Int32);
                parameters.Add("@division_id", supplierLocation.division_id, DbType.Int32);
                parameters.Add("@district_id", supplierLocation.district_id, DbType.Int32);
                parameters.Add("@city", supplierLocation.city, DbType.String);
                parameters.Add("@ps_area", supplierLocation.ps_area, DbType.String);
                parameters.Add("@post_code", supplierLocation.post_code, DbType.String);
                parameters.Add("@block", supplierLocation.block, DbType.String);
                parameters.Add("@road_no", supplierLocation.road_no, DbType.String);
                parameters.Add("@house_no", supplierLocation.house_no, DbType.String);
                parameters.Add("@flat_no", supplierLocation.flat_no, DbType.String);
                parameters.Add("@email", supplierLocation.email, DbType.String);
                parameters.Add("@mobile_no", supplierLocation.mobile_no, DbType.String);
                parameters.Add("@phone_no", supplierLocation.phone_no, DbType.String);
                parameters.Add("@pabx", supplierLocation.pabx, DbType.String);



                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_location_id", supplierLocation.supplier_location_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierWarehouseParameterBinding(SupplierWarehouse supplierWarehouse, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierWarehouse.supplier_id, DbType.Int32);
                parameters.Add("@supplier_location_id", supplierWarehouse.supplier_location_id, DbType.Int32);
                parameters.Add("@supplier_warehouse_name", supplierWarehouse.supplier_warehouse_name, DbType.String);
                parameters.Add("@add_note", supplierWarehouse.add_note, DbType.String);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_warehouse_id", supplierWarehouse.supplier_warehouse_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierContactParameterBinding(SupplierContact supplierContact, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierContact.supplier_id, DbType.Int32);
                parameters.Add("@contact_type_id", supplierContact.contact_type_id, DbType.Int32);
                parameters.Add("@first_name", supplierContact.first_name, DbType.String);
                parameters.Add("@middle_name", supplierContact.middle_name, DbType.String);
                parameters.Add("@sur_name", supplierContact.sur_name, DbType.String);
                parameters.Add("@designation_id", supplierContact.designation_id, DbType.Int32);
                parameters.Add("@email", supplierContact.email, DbType.String);
                parameters.Add("@mobile_no", supplierContact.mobile_no, DbType.String);
                parameters.Add("@phone_no", supplierContact.phone_no, DbType.String);
                parameters.Add("@whatsapp", supplierContact.whatsapp, DbType.String);
                parameters.Add("@facebook", supplierContact.facebook, DbType.String);
                parameters.Add("@linkedin", supplierContact.linkedin, DbType.String);
                parameters.Add("@date_of_birth", supplierContact.date_of_birth, DbType.DateTime);
                parameters.Add("@nationality_id", supplierContact.nationality_id, DbType.Int32);
                parameters.Add("@religion_enum_id", supplierContact.religion_enum_id, DbType.Int32);
                parameters.Add("@gender_enum_id", supplierContact.gender_enum_id, DbType.Int32);
                parameters.Add("@marital_status_enum_id", supplierContact.marital_status_enum_id, DbType.Int32);
                parameters.Add("@blood_group_enum_id", supplierContact.blood_group_enum_id, DbType.Int32);
                parameters.Add("@date_of_marriage", supplierContact.date_of_marriage, DbType.DateTime);
                parameters.Add("@nid_number", supplierContact.nid_number, DbType.String);
                parameters.Add("@nid_file_path", supplierContact.nid_file_path, DbType.String);
                parameters.Add("@passport_no", supplierContact.passport_no, DbType.String);
                parameters.Add("@birth_id", supplierContact.birth_id, DbType.String);
                parameters.Add("@driving_license_no", supplierContact.driving_license_no, DbType.String);
                //parameters.Add("@is_active", supplierContact.is_active, DbType.String);


                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_contact_id", supplierContact.supplier_contact_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierLocationContactParameterBinding(SupplierLocationContact supplierLocationContact, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierLocationContact.supplier_id, DbType.Int32);
                parameters.Add("@supplier_contact_id", supplierLocationContact.supplier_contact_id, DbType.Int32);
                parameters.Add("@supplier_location_id", supplierLocationContact.supplier_location_id, DbType.String);
                parameters.Add("@add_note", supplierLocationContact.add_note, DbType.String);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_contact_location_id", supplierLocationContact.supplier_contact_location_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierMobileBankingParameterBinding(SupplierMobileFinancialService supplierFinancialInfo, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierFinancialInfo.supplier_id, DbType.Int32);
                parameters.Add("@mfs_id", supplierFinancialInfo.mfs_id, DbType.Int32);
                parameters.Add("@mfs_type_id", supplierFinancialInfo.mfs_type_id, DbType.Int32);
                parameters.Add("@account_number", supplierFinancialInfo.account_number, DbType.String);



                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_mobile_bank_id", supplierFinancialInfo.supplier_mobile_bank_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierBankAccountParameterBinding(SupplierBankAccount supplierBankAccount, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierBankAccount.supplier_id, DbType.Int32);
                parameters.Add("@bank_id", supplierBankAccount.bank_id, DbType.Int32);
                parameters.Add("@bank_branch_id", supplierBankAccount.bank_branch_id, DbType.Int32);
                parameters.Add("@account_name", supplierBankAccount.account_name, DbType.String);
                parameters.Add("@account_number", supplierBankAccount.account_number, DbType.String);
                parameters.Add("@iban", supplierBankAccount.iban, DbType.String);
                parameters.Add("@account_number", supplierBankAccount.account_number, DbType.String);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_bank_account_id", supplierBankAccount.supplier_bank_account_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }
            return parameters;
        }

        public DynamicParameters SupplierCreditDepositParameterBinding(SupplierCreditDeposit supplierCreditDeposit, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierCreditDeposit.supplier_id, DbType.Int32);
                parameters.Add("@currency_id", supplierCreditDeposit.currency_id, DbType.Int32);
                parameters.Add("@credit_days", supplierCreditDeposit.credit_days, DbType.Int32);
                parameters.Add("@credit_limit", supplierCreditDeposit.credit_limit, DbType.Decimal);
                parameters.Add("@is_payment_monthly", supplierCreditDeposit.is_payment_monthly, DbType.Boolean);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_id", supplierCreditDeposit.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierCreditDepositSessionParameterBinding(SecurityDepositSession securityDepositSession, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", securityDepositSession.supplier_id, DbType.Int32);
                parameters.Add("@security_deposit_id", securityDepositSession.security_deposit_id, DbType.Int32);
                parameters.Add("@security_amount", securityDepositSession.security_amount, DbType.Decimal);
                parameters.Add("@expiry_date", securityDepositSession.expiry_date, DbType.DateTime);


                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_id", securityDepositSession.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        public DynamicParameters SupplierInfoFeedbackDetailParameterBinding(SupplierInfoFeedbackDetail supplierInfoFeedbackDetail, int operationType)
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            DynamicParameters parameters = new DynamicParameters();

            if (operationType == (int)GlobalEnumList.DBOperation.Create || operationType == (int)GlobalEnumList.DBOperation.Update)
            {
                parameters.Add("@supplier_id", supplierInfoFeedbackDetail.supplier_id, DbType.Int32);
                parameters.Add("@approval_user_id", user_info_id ?? 0, DbType.Int64);
                parameters.Add("@reject_user_id", user_info_id ?? 0, DbType.Int64);
                parameters.Add("@comment", supplierInfoFeedbackDetail.comment, DbType.String);
                parameters.Add("@suggestion", supplierInfoFeedbackDetail.suggestion, DbType.String);
                parameters.Add("@created_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@updated_datetime", DateTime.Now, DbType.DateTime);
                parameters.Add("@created_user_info_id", user_info_id ?? 0, DbType.Int64);
                parameters.Add("@updated_user_info_id", user_info_id ?? 0, DbType.Int64);

                parameters.Add("@DBOperation", operationType == (int)GlobalEnumList.DBOperation.Create ? GlobalEnumList.DBOperation.Create : GlobalEnumList.DBOperation.Update);
            }
            else if (operationType == (int)GlobalEnumList.DBOperation.Delete)
            {
                parameters.Add("@supplier_id", supplierInfoFeedbackDetail.supplier_id, DbType.Int32);
                parameters.Add("@DBOperation", GlobalEnumList.DBOperation.Delete);
            }

            return parameters;
        }

        //Supplier Basic Insert Update Delete Get
        public async Task<dynamic> IUDSupplierApplication(SupplierApplication supplierApplication, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            var parameters = SupplierApplicationParameterBinding(supplierApplication, dbOperation);
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {
                try
                {
                    if (dbOperation == 3)
                    {
                        dynamic data = await _dbConnection.ExecuteAsync("[Procurement].[SP_SupplierApplication_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                        message = CommonMessage.SetWarningMessage(CommonDeleteMessage);

                    }

                    else if (dbOperation == 2)
                    {
                        dynamic data = await _dbConnection.ExecuteAsync("[Procurement].[SP_SupplierApplication_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                        message = CommonMessage.SetSuccessMessage(CommonUpdateMessage);

                    }

                    else if (dbOperation == 5)
                    {
                        dynamic data = await _dbConnection.ExecuteAsync("[Procurement].[SP_SupplierApplication_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                        message = CommonMessage.SetSuccessMessage(CommonSubmitMessage);

                    }

                    else
                    {
                        dynamic data = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_SupplierApplication_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);

                        if (data != null)
                        {
                            List<dynamic> dataList = data;
                            result = (from dr in dataList select SupplierApplicationViewModel.ConvertToSupplierApplicationAllModel(dr)).ToList();
                            message = CommonMessage.SetSuccessMessage(CommonSaveMessage, result);
                        }
                    }

                    tran.Commit();

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex.InnerException;
                }
                finally
                {
                    //DB connection dispose with db connection close
                    tran.Dispose();

                }

            }

            return (message);


            //var message = new CommonMessage();

            //var parameters = SupplierApplicationParameterBinding(supplierApplication, dbOperation);

            //if (_dbConnection.State == ConnectionState.Closed)
            //    _dbConnection.Open();


            //try
            //{

            //  //  dynamic data = await _dbConnection.QueryAsync("[PIMS].[SP_PIMS_Employee_IUD]", parameters, commandType: CommandType.StoredProcedure);
            //    dynamic data = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_SupplierApplication_IUD]", parameters, commandType: CommandType.StoredProcedure);



            //    if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
            //    {
            //        return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
            //    }

            //    else if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
            //    {
            //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
            //    }

            //    if (data.Count > 0)
            //    {
            //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
            //    }
            //    else
            //    {
            //        message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    message = CommonMessage.SetErrorMessage(ex.Message);


            //}
            //finally
            //{
            //    //DB connection dispose with db connection close
            //    _dbConnection.Dispose();
            //}

            //return (message);
        }

        public async Task<dynamic> GetSupplierByIdAsync()
        {
            var user_info_id = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select ur.employee_id as supplier_id,sa.supplier_code FROM [Auth].[User_Info] as ur,[Procurement].[Supplier_Application] as sa WHERE ur.user_info_id = '" + user_info_id + "' and ur.employee_id = sa.supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@user_info_id", user_info_id);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                //  dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {

                    result = SupplierApplicationViewModel.ConvertToSupplierUserInfo(data);
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }
        public async Task<dynamic> GetSupplierBasicInfoBySupplierIdAsync(int supplier_id)
        {
            var result = (dynamic)null;
            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select supplier_id,supplier_code,legal_name,short_name,name_in_local_language,address_in_local_language,year_established,domicile_enum_id,registry_authority_id,regulator_id,ownership_type_id,supplier_logo,country_id,division_id,district_id,city,ps_area,post_code,block,road_no,house_no,flat_no,email,mobile_no,phone_no,pabx " +
                    "From [Procurement].[Supplier_Application] WHERE supplier_id=@supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);
                //  dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {

                    result = SupplierApplicationViewModel.ConvertToSupplierApplicationAllModel(data);
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return result;
        }

        public async Task<dynamic> GetAllSupplierInfo()
        {
            var message = new CommonMessage();
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Procurement].[Supplier_Application] SI WHERE SI.company_id =" + company_id + "";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select SupplierApplicationViewModel.ConvertToSupplierApplicationAllModel(dr)).ToList();
                }

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> GetAllConfirmSupplierInfo()
        {
            var message = new CommonMessage();
            var company_id = _httpContextAccessor.HttpContext.Items["company_id"];
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                string sql = @"SELECT * FROM [Procurement].[Supplier_Application] SI WHERE SI.company_id =" + company_id + " and SI.is_confirm='true' and SI.feedback_status='1' ";
                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select SupplierApplicationViewModel.ConvertToSupplierApplicationAllModel(dr)).ToList();
                }

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }


            return (result);
        }
        //Business
        public async Task<dynamic> IUDSupplierBusinessData(SupplierBusiness supplierBusiness, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;
            dynamic data = null;

            var parameters = SupplierBusinessParameterBinding(supplierBusiness, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {
                try
                {

                    dynamic DeleteSubSector = await _dbConnection.ExecuteAsync("[Procurement].[SP_Supplier_Industry_Sub_Sector_D]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                    dynamic DeleteEcommerce = await _dbConnection.ExecuteAsync("[Procurement].[SP_Supplier_Ecommerce_Platforms_D]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);

                    if (supplierBusiness.ecommerceSession.Count > 0)
                    {
                        foreach (EcommerceSession itemEcommerce in supplierBusiness.ecommerceSession)
                        {
                            //itemEcommerce.supplier_id = data[0].supplier_id;
                            var ecommerceSessionParameters = SupplierBusinessEcommerceSessionParameterBinding(itemEcommerce, dbOperation);
                            dynamic ecommerceSessionData = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_Supplier_Ecommerce_Platforms_I]", ecommerceSessionParameters, commandType: CommandType.StoredProcedure, transaction: tran);

                        }
                    }

                    if (supplierBusiness.subSectorSession.Count > 0)
                    {
                        foreach (SubSectorSession itemSubSector in supplierBusiness.subSectorSession)
                        {
                            //itemSubSector.supplier_id = data[0].supplier_id;
                            var subSectorSessionParameters = SupplierBusinessSubSectorSessionParameterBinding(itemSubSector, dbOperation);
                            dynamic subSectorSessionData = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_Supplier_Industry_Sub_Sector_I]", subSectorSessionParameters, commandType: CommandType.StoredProcedure, transaction: tran);
                        }
                    }

                    data = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_SupplierApplication_Business_IUD]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                    if (data != null)
                    {
                        List<dynamic> dataList = data;
                        result = (from dr in dataList select SupplierBusinessViewModel.ConvertToSupplierBusinessAllModel(dr)).ToList();
                        message = CommonMessage.SetSuccessMessage(CommonSaveMessage, result);

                    }
                    tran.Commit();

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex.InnerException;
                }
                finally
                {
                    //DB connection dispose with db connection close
                    tran.Dispose();

                }
            }
            return (message);
        }
        public async Task<dynamic> GetBusinessDataBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {




                var sql = "select SA.business_activities_enum_id, SA.management_staff_no, SA.nonmanagement_staff_no, SA.permanent_worker_no, SA.casual_worker_no " +
                   "from[Procurement].[Supplier_Application] SA where SA.supplier_id = @supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);
                dynamic data = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);

                string business_activities_enum_id = Convert.ToString(data.business_activities_enum_id);



                if (business_activities_enum_id != null)
                {
                    //List<dynamic> dataList = data;
                    //result = (from dr in dataList select SupplierBusinessViewModel.ConvertToSupplierBusinessAllModel(dr)).ToList();
                    result = SupplierBusinessViewModel.ConvertToSupplierBusinessAllModel(data);
                }




            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> GetBusinessSubSectorBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select IST.industry_sector_id, IST.industry_sector_name, ISS.industry_sub_sector_id,ISS.industry_sub_sector_name " +
                             " from[Procurement].[Supplier_Industry_Sub_Sector] SSS " +
                             " left join[Administrative].[Industry_Sub_Sector] ISS on SSS.industry_sub_sector_id = ISS.industry_sub_sector_id " +
                             " left join[Administrative].[Industry_Sector] IST on ISS.industry_sector_id = IST.industry_sector_id " +
                             " where SSS.supplier_id = @supplier_id";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);


                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

                //dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                //if (data != null)
                //{
                //    List<dynamic> dataList = data;
                //    result = (from dr in dataList select SupplierAssociationViewModel.ConvertToModelForAssociation(dr)).ToList();
                //}

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> GetBusinessEcommerceBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select SEP.ecommerce_platforms_id,EP.ecommerce_paltforms_name from " +
                            " [Procurement].[Supplier_Ecommerce_Platforms] SEP " +
                            " left join[Administrative].[Ecommerce_Platforms] EP on SEP.ecommerce_platforms_id = EP.ecommerce_paltforms_id " +
                            " where SEP.supplier_id =  @supplier_id";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

                //dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                //if (data != null)
                //{
                //    List<dynamic> dataList = data;
                //    result = (from dr in dataList select SupplierAssociationViewModel.ConvertToModelForAssociation(dr)).ToList();
                //}

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        //Supplier Association Insert Update Delete Get
        public async Task<dynamic> IUDSupplierAssociationData(SupplierAssociation supplierAssociation, int dbOperation)
        {

            var message = new CommonMessage();

            var parameters = SupplierAssociationParameterBinding(supplierAssociation, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();


            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Association_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
                //tran.Commit();
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }

        public async Task<dynamic> GetAssociationBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select sa.*,FORMAT(sa.start_date, 'dd-MMM-yyyy') start_date_str, a.association_name " +
                           " from[Procurement].[Supplier_Association] sa " +
                           " left join[Administrative].[Association] a on sa.association_id = a.association_id " +
                           " where sa.supplier_id= @supplier_id";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select SupplierAssociationViewModel.ConvertToModelForAssociation(dr)).ToList();
                }

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        //Supplier Document Insert Update Delete Get
        public async Task<dynamic> IUDSupplierDocumentData(SupplierDocument supplierDocument, int dbOperation)
        {
            var message = new CommonMessage();
            //var result = (dynamic)null;
            //dynamic data = null;

            var parameters = SupplierDocumentParameterBinding(supplierDocument, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Document_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }

            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }

        public async Task<dynamic> GetLegalDocumentBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select SD.supplier_document_id,DT.document_type_name,SD.document_number,FORMAT(SD.issue_date, 'dd-MMM-yyyy') issue_date_str,FORMAT(SD.expiry_date, 'dd-MMM-yyyy') expiry_date_str,SD.file_path " +
                           "from[Procurement].[Supplier_Document] SD " +
                           "left join[Administrative].[Document_Type] DT on SD.document_type_id = DT.document_type_id " +
                           "where SD.supplier_id= @supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

                //dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters, commandType: CommandType.StoredProcedure);

                //if (data != null)
                //{
                //    List<dynamic> dataList = data;
                //    result = (from dr in dataList select SupplierLocationViewModel.ConvertToModelForAllLocation(dr)).ToList();

                //}
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {
                _dbConnection.Close();
            }

            return (result);
        }

        //Supplier Location Insert Update Delete Get
        public async Task<dynamic> IUDSupplierLocationData(SupplierLocation supplierLocation, int dbOperation)
        {

            var message = new CommonMessage();
            var parameters = SupplierLocationParameterBinding(supplierLocation, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Location_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }

            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }
        public async Task<dynamic> GetLocationBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "	select sl.*, c.country_name,dv.division_name,ds.district_name,lt.location_type_name, " +
       " 'City:' + sl.city + ' Area:' + sl.ps_area + ' Post Code:' + sl.post_code + ' Block:' + sl.block + ' Road No:' + sl.road_no + ' House No:' + sl.house_no + ' Flat_no:' + sl.flat_no Address, sl.supplier_location_name + ' - ' + lt.location_type_name supplier_location_type_name " +
       " from[Procurement].[Supplier_Location] sl " +
       " left join[Administrative].[Country] c on sl.country_id = c.country_id " +
       " left join[Administrative].[Division] dv on sl.division_id = dv.division_id " +
       " left join[Administrative].[District] ds on sl.district_id = ds.district_id " +
       " left join[Administrative].[Location_Type] lt on sl.location_type_id = lt.location_type_id " +
       " where sl.supplier_id = @supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

                //dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters, commandType: CommandType.StoredProcedure);

                //if (data != null)
                //{
                //    List<dynamic> dataList = data;
                //    result = (from dr in dataList select SupplierLocationViewModel.ConvertToModelForAllLocation(dr)).ToList();

                //}
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        //Supplier Warehouse Insert Update Delete Get
        public async Task<dynamic> IUDSupplierWarehouseData(SupplierWarehouse supplierWarehouse, int dbOperation)
        {

            var message = new CommonMessage();
            var parameters = SupplierWarehouseParameterBinding(supplierWarehouse, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();
            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Warehouse_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }

            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }
        public async Task<dynamic> getAllWarehouseByLocationId(int location_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select sw.supplier_warehouse_id,sw.supplier_warehouse_name " +
" from[Procurement].[Supplier_Warehouse] sw where sw.supplier_location_id = @location_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@location_id", location_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }
        public async Task<dynamic> GetWarehouseBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "	SELECT A.*,A.supplier_location_name + '-'+ LT.location_type_name supplier_location_type_name FROM( " +
                              "select sw.*, sl.supplier_location_name,sl.location_type_id " +
                              "from[Procurement].[Supplier_Warehouse] sw " +
                              "left join[Procurement].[Supplier_Location] sl on sw.supplier_location_id = sl.supplier_location_id " +
                              "where sw.supplier_id = @supplier_id) A, [Administrative].[Location_Type] LT " +
                              "where A.location_type_id = LT.location_type_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

                //dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters, commandType: CommandType.StoredProcedure);

                //if (data != null)
                //{
                //    List<dynamic> dataList = data;
                //    result = (from dr in dataList select SupplierLocationViewModel.ConvertToModelForAllLocation(dr)).ToList();

                //}
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        //Supplier Contact Insert Update Delete Get 
        public async Task<dynamic> UpdateContactData(SupplierContact supplierContact, int dbOperation)
        {

            var message = new CommonMessage();

            var parameters = SupplierContactParameterBinding(supplierContact, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Contact_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
                //tran.Commit();
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }
        public async Task<dynamic> UpdateContactLocationData(SupplierLocationContact supplierLocationContact, int dbOperation)
        {

            var message = new CommonMessage();

            var parameters = SupplierLocationContactParameterBinding(supplierLocationContact, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Contact_Location_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
                //tran.Commit();
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }
        public async Task<dynamic> GetContactBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {

                var sql = " select SC.*,CT.contact_type_name,DS.designation_name,C.country_name,FORMAT(SC.date_of_birth, 'dd-MMM-yyyy') date_of_birth_str " +
                               "from[Procurement].[Supplier_Contact] SC " +
                               "left join[Administrative].[Contact_Type] CT on SC.contact_type_id = CT.contact_type_id " +
                               "left join[Administrative].[Designation] DS on SC.designation_id = DS.designation_id " +
                               "left join[Administrative].[Country] C on C.country_id = SC.nationality_id " +
                               "WHERE SC.supplier_id=@supplier_id";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                dynamic data = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
                if (data != null)
                {
                    List<dynamic> dataList = data;
                    result = (from dr in dataList select SupplierContactViewModel.ConvertToModelForContact(dr)).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> GetLocationWiseContactBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select SCl.*,SC.contact_person_name,SL.supplier_location_name " +
                           "from[Procurement].[Supplier_Contact_Location] SCL " +
                            "left join[Procurement].[Supplier_Contact] SC on SCL.supplier_contact_id = SC.supplier_contact_id " +
                            "left join[Procurement].[Supplier_Location] SL on SCL.supplier_location_id = SL.supplier_location_id " +
                            "WHERE SC.supplier_id = @supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }


        //FinancialInfo Insrt Update Delete Get
        public async Task<dynamic> IUDMobileBankingData(SupplierMobileFinancialService supplierFinancialInfo, int dbOperation)
        {

            var message = new CommonMessage();

            var parameters = SupplierMobileBankingParameterBinding(supplierFinancialInfo, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Mobile_Bank_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
                //tran.Commit();
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }

        public async Task<dynamic> IUDBankAccountData(SupplierBankAccount supplierBankAccount, int dbOperation)
        {

            var message = new CommonMessage();

            var parameters = SupplierBankAccountParameterBinding(supplierBankAccount, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {

                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Bank_Account_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }
                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
                //tran.Commit();
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                _dbConnection.Dispose();

            }

            return (message);
        }
  
        public async Task<dynamic> UpdateCreditDepositData(SupplierCreditDeposit supplierCreditDeposit, int dbOperation)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            var parameters = SupplierCreditDepositParameterBinding(supplierCreditDeposit, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            using (var tran = _dbConnection.BeginTransaction())
            {
                try
                {

                    dynamic DeleteSupplierSecurity = await _dbConnection.ExecuteAsync("[Procurement].[SP_Supplier_Security_D]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);

                    if (supplierCreditDeposit.securityDepositSession.Count > 0)
                    {
                        foreach (SecurityDepositSession itemsecurityDeposit in supplierCreditDeposit.securityDepositSession)
                        {
                            var securityDepositSessionParameters = SupplierCreditDepositSessionParameterBinding(itemsecurityDeposit, dbOperation);
                            dynamic securityDepositSessionData = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_Supplier_Security_I]", securityDepositSessionParameters, commandType: CommandType.StoredProcedure, transaction: tran);

                        }
                    }

                    // dynamic DeleteCreditHistory = await _dbConnection.ExecuteAsync("[Procurement].[SP_Supplier_Security_D]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                    dynamic data = await _dbConnection.QueryAsync<dynamic>("[Procurement].[SP_Supplier_Credit_History_I]", parameters, commandType: CommandType.StoredProcedure, transaction: tran);
                    if (data != null)
                    {
                        List<dynamic> dataList = data;
                        result = (from dr in dataList select SupplierCreditDepositViewModel.ConvertToSupplierCreditDepositViewModel(dr)).ToList();
                        message = CommonMessage.SetSuccessMessage(CommonSaveMessage, result);

                    }
                    tran.Commit();

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex.InnerException;
                }
                finally
                {
                    //DB connection dispose with db connection close
                    tran.Dispose();

                }
            }
            return (message);
        }

        public async Task<dynamic> GetAllMFSBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select smb.*,mfs.mfs_name,mfst.mfs_type_name from[Procurement].[Supplier_Mobile_Bank]  smb " +
                            " left join[Administrative].[Mobile_Financial_Service] mfs on smb.mfs_id = mfs.mfs_id " +
                            " left join[DBEnum].[MFS_Type] mfst on smb.mfs_type_id = mfst.mfs_type_id where smb.supplier_id=@supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> GetAllBankAccountBySupplierId(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select SBA.*, B.bank_name,BB.bank_branch_name,BT.bank_type_name " +
                           "from[Procurement].[Supplier_Bank_Account] SBA " +
                           "left join[Administrative].[Bank] B on SBA.bank_id = B.bank_id " +
                           "left join[Administrative].[Bank_Branch] BB on SBA.bank_branch_id = BB.bank_branch_id " +
                           "left join[DBEnum].[Bank_Type] BT on B.is_local = BT.bank_type_id " +
                           "where SBA.supplier_id = @supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> getAllSupplierCreditDeposit(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "select SS.*,FORMAT(SS.expiry_date, 'dd-MMM-yyyy') expiry_date_str,SD.security_deposit_name " +
                            " from[Procurement].Supplier_Security SS " +
                            " left join[Administrative].Security_Deposit SD on SS.security_deposit_id = SD.security_deposit_id " +
                            " where SS.supplier_id = @supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> getAllSupplierCreditHistory(int supplier_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT SCH.*,C.currency_name " +
                            " FROM[Procurement].[Supplier_Credit_History] SCH " +
                            " left join[Administrative].[Currency] C on SCH.currency_id = C.currency_id " +
                            " where SCH.is_active ='1' and SCH.supplier_id=@supplier_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@supplier_id", supplier_id);

                result = await _dbConnection.QuerySingleOrDefaultAsync<dynamic>(sql, parameters);





            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        public async Task<dynamic> getAllBankCboListByBankTypeId(int bank_type_id)
        {
            var message = new CommonMessage();
            var result = (dynamic)null;

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                var sql = "SELECT bank_id,bank_name,bank_short_name,bank_swift_code,bank_email,bank_web_url,country_id,division_id,district_id,city,ps_area,post_code,block,road_no,house_no,flat_no,address_note,remarks,is_bank,is_active,is_local " +
                           "FROM[Administrative].[Bank] B " +
                           "left join[DBEnum].Bank_Type BT ON BT.bank_type_id = B.is_local  WHERE BT.bank_type_id =@bank_type_id";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@bank_type_id", bank_type_id);

                result = await _dbConnection.QueryAsync<dynamic>(sql, parameters);

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

                _dbConnection.Close();
            }


            return (result);
        }

        //Supplier Approve & Reject
        public async Task<dynamic> ApproveSupplier(SupplierInfoFeedbackDetail supplierInfoFeedbackDetail, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = SupplierInfoFeedbackDetailParameterBinding(supplierInfoFeedbackDetail, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Info_Feedback_Approval_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonApproveMessage);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonApproveMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                //DB connection dispose with db connection close
                _dbConnection.Dispose();
            }
            return (message);
        }

        public async Task<dynamic> RejectSupplier(SupplierInfoFeedbackDetail supplierInfoFeedbackDetail, int dbOperation)
        {
            var message = new CommonMessage();

            var parameters = SupplierInfoFeedbackDetailParameterBinding(supplierInfoFeedbackDetail, dbOperation);

            if (_dbConnection.State == ConnectionState.Closed)
                _dbConnection.Open();

            try
            {
                dynamic data = await _dbConnection.QueryAsync("[Procurement].[SP_Supplier_Info_Feedback_Reject_IUD]", parameters, commandType: CommandType.StoredProcedure);

                if (dbOperation == (int)GlobalEnumList.DBOperation.Create)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonRejectMessage);
                }
                if (dbOperation == (int)GlobalEnumList.DBOperation.Update)
                {
                    return message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
                }

                if (dbOperation == (int)GlobalEnumList.DBOperation.Delete)
                {
                    return message = CommonMessage.SetWarningMessage(CommonMessage.CommonDeleteMessage);
                }

                if (data.Count > 0)
                {
                    message = CommonMessage.SetSuccessMessage(CommonMessage.CommonRejectMessage, data);
                }
                else
                {
                    message = CommonMessage.SetErrorMessage(CommonMessage.CommonErrorMessage);
                }
            }
            catch (Exception ex)
            {
                message = CommonMessage.SetErrorMessage(ex.Message);
            }
            finally
            {
                //DB connection dispose with db connection close
                _dbConnection.Dispose();
            }
            return (message);
        }


    }
}
