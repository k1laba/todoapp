using Todo.Data.Entities;
using Todo.Data.Repositories;

namespace Todo.Business.Services
{
    public class TasksService : BaseService<TaskItem>, ITasksService
    {
        public TasksService(ITasksRepository repo) : base(repo) { }
    }
}
