using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Todo.Api.Models;
using Todo.Business.Services;
using Todo.Data.Entities;

namespace Todo.Api.Controllers
{
    public class BaseApiController<TEntity, TViewModel> : ApiController where TEntity : BaseEntity, new()
                                                                        where TViewModel : BaseViewModel, new()
    {
        protected readonly IBaseService<TEntity> _service;
        protected readonly IMapper _mapper;

        public BaseApiController(IBaseService<TEntity> serevice, IMapper mapper)
        {
            _service = serevice ?? throw new ArgumentNullException(nameof(serevice));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        [HttpGet]
        public async virtual Task<IHttpActionResult> Index()
        {
            return await TryActionAsync(async () =>
            {
                var data = await _service.LoadAllAsync();
                var model = _mapper.Map<List<TViewModel>>(data);
                return Ok(model);
            });
        }
        [HttpPost]
        public async virtual Task<IHttpActionResult> Save(TViewModel model)
        {
            return await TryActionAsync(async () =>
            {
                var entity = _mapper.Map<TEntity>(model);
                await _service.SaveAsync(entity);
                return Ok();
            });
        }
        [HttpDelete]
        public async virtual Task<IHttpActionResult> Delete(Guid id)
        {
            return await TryActionAsync(async () =>
            {
                await _service.DeleteAsync(id);
                return Ok();
            });
        }
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing) { _service.Dispose(); }
        }

        protected async Task<IHttpActionResult> TryActionAsync(Func<Task<IHttpActionResult>> action)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(); }
                return await action();
            }
            catch (Exception ex)
            {
                //TODO: log
                return InternalServerError(new Exception(ex?.Message ?? "Failed to process your request"));
            }
        }
    }
}