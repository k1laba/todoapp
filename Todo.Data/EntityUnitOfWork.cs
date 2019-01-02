using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Todo.Data.Context;

namespace Todo.Data.Uow
{
    public class EntityUnitOfWork : IUnitOfWork
    {
        private DbContext _ctx;
        public EntityUnitOfWork() : this(new ApplicationDbContext()) { }
        public EntityUnitOfWork(DbContext context)
        {
            _ctx = context ?? throw new ArgumentNullException(nameof(context));
        }
        public void Commit()
        {
            _ctx.SaveChanges();
        }
        public object GetDbContext()
        {
            return _ctx;
        }
        public void Dispose()
        {
            _ctx.Dispose();
        }
    }
}