using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.Data.Entities;
using Todo.Data.Uow;

namespace Todo.Business.Services
{
    public interface IBaseService<T> : IDisposable where T : BaseEntity, new()
    {
        Task<IEnumerable<T>> LoadAllAsync();
        Task<T> LoadAsync(Guid id);
        Task<Guid> SaveAsync(T viewModel, bool commit = true);
        Task DeleteAsync(Guid id, bool commit = true);
        IUnitOfWork GetUnitOfWork();
    }
}
