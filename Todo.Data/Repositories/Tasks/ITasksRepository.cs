using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Data.Context;
using Todo.Data.Entities;

namespace Todo.Data.Repositories
{
    public interface ITasksRepository : IBaseRepository<TaskItem> { }
}
