using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.Data.Entities;
using Todo.Data.Repositories;
using Todo.Data.Uow;

namespace Todo.Business.Services
{
    public class BaseService<T> : IBaseService<T> where T : BaseEntity, new()
    {
        private IBaseRepository<T> _repo;
        private IUnitOfWork _uow;
        public BaseService(IBaseRepository<T> repo)
        {
            _repo = repo ?? throw new ArgumentNullException(nameof(repo));
            _repo = repo;
            _uow = _repo.GetUnitOfWork();
        }
        public async virtual Task<IEnumerable<T>> LoadAllAsync()
        {
            return await _repo.LoadAllAsync();
        }
        public async virtual Task<T> SaveAsync(T model, bool commit = true)
        {
            var current = await _repo.LoadAsync(model.Id);
            return current == null ? await _repo.AddAsync(model, commit) : await _repo.EditAsync(model, commit);
        }
        public async virtual Task<T> LoadAsync(Guid id)
        {
            return await _repo.LoadAsync(id);
        }
        public async virtual Task DeleteAsync(Guid id, bool commit = true)
        {
            await _repo.DeleteAsync(id, commit);
        }
        public IUnitOfWork GetUnitOfWork()
        {
            return _uow;
        }
        public void Dispose()
        {
            _uow.Dispose();
        }
    }
}
