using Todo.Data.Entities;
using Todo.Data.Uow;

namespace Todo.Data.Repositories
{
    public class TasksRepository : BaseRepository<TaskItem>, ITasksRepository
    {
        public TasksRepository(IUnitOfWork uow) : base(uow) { }
    }
}
