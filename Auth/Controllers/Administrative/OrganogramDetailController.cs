
using Auth.Model.Administrative.Model;
using Auth.Repository.Administrative;
using Auth.Utility;
using Auth.Utility.Administrative.Enum;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

/// <summary>
/// Created By Jahid
/// Dated: 22/11/2021
/// Re-Created By Masum
/// Dated: 04/04/2022
/// </summary>
namespace Auth.Controllers.Administrative
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class OrganogramDetailController : ControllerBase
    {

        //Intialize
        #region Constructor
        private IOrganogramDetailRepository _organogramDetailRepository;

        public OrganogramDetailController(
            IOrganogramDetailRepository organogramDetailRepository
            )
        {

            _organogramDetailRepository = organogramDetailRepository;
        }

        #endregion        

        [HttpPost]
        public async Task<dynamic> Create(OrganogramDetail organogramDetail)
        {
            return await _organogramDetailRepository.IUD_OrganogramDetail(organogramDetail, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(OrganogramDetail organogramDetail)
        {

            var organogramInfo = _organogramDetailRepository.GetOrganogramDetailById(organogramDetail.organogram_detail_id).Result;
            //if (OrganogramInfo==null)
            //{
            //    return;
            //}

            return await _organogramDetailRepository.IUD_OrganogramDetail(organogramDetail, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Delete(int OrganogramDetailId)
        {
            OrganogramDetail oOrganogram = new OrganogramDetail();
            oOrganogram.organogram_detail_id = OrganogramDetailId;
            return await _organogramDetailRepository.IUD_OrganogramDetail(oOrganogram, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllOrganogramDetail(int Organogram_Id)
        {

            return await _organogramDetailRepository.GetAllOrganogramDetail(Organogram_Id);
        }

        [HttpGet]
        public async Task<dynamic> GetOrganogramById(int OrganogramId)
        {

            return await _organogramDetailRepository.GetOrganogramDetailById(OrganogramId);
        }
        [HttpGet]
        public async Task<dynamic> GetAllActiveOrganogramDetail(int Organogram_Id)
        {

            return await _organogramDetailRepository.GetAllActiveOrganogramDetail(Organogram_Id);
        }

        [HttpPost]
        public async Task<dynamic> OrganogramActivity(int Organogram_id)
        {
            return await _organogramDetailRepository.OrganogramDetailActivity(Organogram_id);

        }
        //[HttpGet]
        //public dynamic GetAllOrganogramDetail()
        //{

        //    dynamic data = (dynamic)null;
        //    try
        //    {
        //        data = _organogramDetailRepository.GetAllOrganogramDetail();
        //    }
        //    catch (Exception ex)
        //    {
        //        data = ex.Message;
        //    }
        //    return data;
        //}

        //[HttpGet]
        //public dynamic GetById(int organogram_detail_id)
        //{
        //    dynamic data = (dynamic)null;
        //    try
        //    {
        //        data = _organogramDetailRepository.GetById(organogram_detail_id);
        //    }
        //    catch (Exception ex)
        //    {
        //        data = "Error info:" + ex.Message;
        //    }
        //    return data;
        //}

        //[HttpPost]
        //public dynamic Create(OrganogramDetail oOrganogramDetail)
        //{

        //    var message = new CommonMessage();
        //    try
        //    {
        //        _organogramDetailRepository.Add(oOrganogramDetail);
        //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonSaveMessage);
        //    }
        //    catch (Exception ex)
        //    {
        //        message = CommonMessage.SetErrorMessage(ex.Message);
        //    }
        //    return message;
        //}

        //[HttpPost]
        //public dynamic Update(OrganogramDetail oOrganogramDetail)
        //{


        //    var message = new CommonMessage();
        //    try
        //    {
        //        _organogramDetailRepository.Update(oOrganogramDetail);
        //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonUpdateMessage);
        //    }
        //    catch (Exception ex)
        //    {
        //        message = CommonMessage.SetErrorMessage(ex.Message);
        //    }
        //    return message;
        //}

        //[HttpPost]
        //public dynamic Delete(int organogram_detail_id)
        //{

        //    var message = new CommonMessage();
        //    try
        //    {
        //        _organogramDetailRepository.Delete(organogram_detail_id);
        //        message = CommonMessage.SetSuccessMessage(CommonMessage.CommonDeleteMessage);
        //    }
        //    catch (Exception ex)
        //    {
        //        message = CommonMessage.SetErrorMessage(ex.Message);
        //    }
        //    return message;

        //}
    }
}
