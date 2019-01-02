using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.Data.Entities
{
    public class BaseEntity
    {
        private DateTime _createDate = DateTime.UtcNow;
        public virtual Guid Id { get; set; }
        public virtual string Title { get; set; }
        public virtual string Description { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual State State { get; set; }
        public virtual DateTime? Estimate { get; set; }
        public virtual DateTime CreateDate { get { return _createDate; } set { _createDate = value; } }
    }
    public class TaskItem : BaseEntity
    {
        public Guid? PersonId { get; set; }
        public virtual Person Person { get; set; }
    }
    public class Person : BaseEntity
    {
        public virtual ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
    public enum Priority
    {
        Critical,
        Medium,
        Low
    }
    public enum State
    {
        New,
        Active,
        Resolved,
        Closed
    }

}
