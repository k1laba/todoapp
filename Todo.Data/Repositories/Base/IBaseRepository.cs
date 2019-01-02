using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Todo.Data.Uow;
using Todo.Data.Entities;

namespace Todo.Data.Repositories
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> LoadAllAsync();
        Task<T> LoadAsync(Guid id);
        Task<Guid> AddAsync(T entity, bool commit = true);
        Task<Guid> EditAsync(T entity, bool commit = true);
        Task DeleteAsync(Guid id, bool commit = true);
        IUnitOfWork GetUnitOfWork();
    }
}
