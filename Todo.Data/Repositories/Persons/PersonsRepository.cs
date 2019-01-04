using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Entities;
using Todo.Data.Uow;

namespace Todo.Data.Repositories
{
    public class PersonsRepository : BaseRepository<Person>, IPersonsRepository
    {
        public PersonsRepository(IUnitOfWork uow) : base(uow) { }
        public override async Task<IEnumerable<Person>> LoadAllAsync()
        {
            var result = await base.LoadAllAsync();
            return result.OrderBy(i => i.Title).ToList();
        }
    }
}
