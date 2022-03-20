using Auth.DataAccess.EntityDataAccess;
using Auth.Model.DomainModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Service
{
    public class VoucherTypeRepository:IVoucherTypeRepository
    {
        private readonly IEntityDataAccess<VoucherType> _entityDataAccess;
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        public VoucherTypeRepository(
            IEntityDataAccess<VoucherType> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(VoucherType oVoucherType)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                oVoucherType.accounting_voucher_type_id = GetAutoId();
                oVoucherType.created_user_id = (long)currentUserInfoId;
                oVoucherType.created_datetime = DateTime.Now;
                
                _entityDataAccess.Add(oVoucherType);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_accounting_voucher_type_code"))
                    throw new Exception("This Voucher Type code(" + oVoucherType.code + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(VoucherType oVoucherType)
        {
            try
            {
                var currentUserInfoId = _httpContextAccessor.HttpContext.Items["User_Info_Id"];
                var dbdata = _entityDataAccess.Get(oVoucherType.accounting_voucher_type_id);
                dbdata.code = oVoucherType.code;
                dbdata.voucher_type = oVoucherType.voucher_type;
                dbdata.updated_user_id = (long)currentUserInfoId;
                dbdata.updated_datetime = DateTime.Now;
                _entityDataAccess.Update(dbdata);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_accounting_voucher_type_code"))
                    throw new Exception("This industry sector code(" + oVoucherType.code + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<VoucherType> GetAllVoucherType()
        {
            return  _entityDataAccess.GetAll();
        }

        public VoucherType GetById(int accounting_voucher_type_id)
        {
            return _entityDataAccess.GetById(accounting_voucher_type_id);
        }

        public IEnumerable<object> VoucherTypeCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.accounting_voucher_type_id)
                       select new { id = r.accounting_voucher_type_id, code = r.code, voucher_type = r.voucher_type };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(int accounting_voucher_type_id)
        {
            VoucherType oVoucherType = new VoucherType() { accounting_voucher_type_id = accounting_voucher_type_id };
            _entityDataAccess.Remove(oVoucherType);
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.accounting_voucher_type_id).ToList();
                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                return id;
            }
            catch (Exception)
            {
                throw;
            }

        }

    }
}
