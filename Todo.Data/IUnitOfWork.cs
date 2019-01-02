using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.Data.Uow
{
    public interface IUnitOfWork : IDisposable
    {
        object GetDbContext();
        void Commit();
    }
}
