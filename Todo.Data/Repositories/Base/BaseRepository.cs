using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Todo.Data.Entities;
using Todo.Data.Uow;
using System.Threading.Tasks;

namespace Todo.Data.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private IUnitOfWork _uow = null;
        private DbContext _ctx = null;

        public BaseRepository(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _ctx = (DbContext)_uow.GetDbContext();
        }
        public async virtual Task<IEnumerable<T>> LoadAllAsync()
        {
            return await _ctx.Set<T>().ToListAsync();
        }

        public async virtual Task<T> LoadAsync(Guid id)
        {
            return await _ctx.Set<T>().AsNoTracking().SingleOrDefaultAsync(i => i.Id == id);
        }

        public async virtual Task<T> AddAsync(T entity, bool commit = true)
        {
            _ctx.Set<T>().Add(entity);
            if (commit) { await _ctx.SaveChangesAsync(); }
            return entity;
        }

        public async virtual Task<T> EditAsync(T entity, bool commit = true)
        {
            var entry = _ctx.Entry(entity);
            if (entry.State == EntityState.Detached)
            {
                _ctx.Set<T>().Attach(entity);
                entry = _ctx.Entry(entity);
            }
            entry.State = EntityState.Modified;
            if (commit) { await _ctx.SaveChangesAsync(); }
            return entity;
        }

        public async virtual Task DeleteAsync(Guid id, bool commit = true)
        {
            T entity = _ctx.Set<T>().SingleOrDefault(i => i.Id == id);
            if (entity != null)
            {
                _ctx.Set<T>().Remove(entity);
                if (commit) { await _ctx.SaveChangesAsync(); }
            }
        }

        public IUnitOfWork GetUnitOfWork() => _uow;
    }
}