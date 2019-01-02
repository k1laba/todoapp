using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.Data.Entities;
using Todo.Data.Uow;

namespace Todo.Data.Repositories
{
    public class PersonsRepository : BaseRepository<Person>, IPersonsRepository
    {
        public PersonsRepository(IUnitOfWork uow) : base(uow) { }
    }
}
