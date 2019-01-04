using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Entities;
using Todo.Data.Repositories;

namespace Todo.Business.Services
{
    public class PersonsService : BaseService<Person>, IPersonsService
    {
        public PersonsService(IPersonsRepository repo) : base(repo)
        {
        }
    }
}
