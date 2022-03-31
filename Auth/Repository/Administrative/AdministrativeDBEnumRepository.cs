
using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class AdministrativeDBEnumRepository : IAdministrativeDBEnumRepository
    {
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();


        private readonly IEntityDataAccess<MfsType> _entityDataAccessMfsType;
        private readonly IEntityDataAccess<BankType> _entityDataAccessBankType;
        private readonly IEntityDataAccess<DepartmentType> _entityDataAccessDepartmentType;
        private readonly IEntityDataAccess<PaymentFrequency> _entityDataAccessPaymentFrequency;
        public AdministrativeDBEnumRepository(
            IEntityDataAccess<MfsType> entityDataAccessMfsType
            ,IEntityDataAccess<BankType> entityDataAccessBankType
            ,IEntityDataAccess<DepartmentType> entityDataAccessDepartmentType
            ,IEntityDataAccess<PaymentFrequency> entityDataAccessPaymentFrequency
            )
        {
            _entityDataAccessMfsType = entityDataAccessMfsType;
            _entityDataAccessBankType = entityDataAccessBankType;
            _entityDataAccessDepartmentType = entityDataAccessDepartmentType;
            _entityDataAccessPaymentFrequency = entityDataAccessPaymentFrequency;

        }

        public IEnumerable<object> MFSTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccessMfsType.GetAll().OrderBy(r => r.mfs_type_id)
                             select new { mfs_type_id = r.mfs_type_id, mfs_type_name = r.mfs_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> BankTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccessBankType.GetAll().OrderBy(r => r.bank_type_id)
                             select new { bank_type_id = r.bank_type_id, bank_type_name = r.bank_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> PaymentFrequencyCboList()
        {
            try
            {
                var result = from r in _entityDataAccessPaymentFrequency.GetAll().OrderBy(r => r.payment_frequency_id)
                             select new { payment_frequency_id = r.payment_frequency_id, payment_frequency_name = r.payment_frequency_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> DepartmentTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccessDepartmentType.GetAll().OrderBy(r => r.department_type_id)
                             select new { department_type_id = r.department_type_id, department_type_name = r.department_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> DepartmentTypeCboListByFunctionality(string type)
        {
            try
            {
                var result = from r in _entityDataAccessDepartmentType.GetAll(x=>x.functionality_name==type).OrderBy(r => r.department_type_id)
                             select new { department_type_id = r.department_type_id, department_type_name = r.department_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

    }
}
