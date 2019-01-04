namespace Todo.Data.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Todo.Data.Entities;

    internal sealed class Configuration : DbMigrationsConfiguration<Context.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(Context.ApplicationDbContext context)
        {
            if (!context.Persons.Any())
            {
                context.Persons.Add(new Person
                {
                    Title = "Person 1",
                    Tasks = new List<TaskItem>
                 {
                     new TaskItem() { Title = "task 1", Description = "desc 1", Priority = Priority.Critical },
                     new TaskItem() { Title = "task 2", Description = "desc 2", Priority = Priority.Low },
                     new TaskItem() { Title = "task 3", Description = "desc 3", Priority = Priority.Medium, State = State.Active },
                 }
                });
                context.Persons.Add(new Person
                {
                    Title = "Person 2",
                    Tasks = new List<TaskItem>
                 {
                     new TaskItem() { Title = "task 1", Description = "desc 1", Priority = Priority.Medium, State = State.Resolved },
                     new TaskItem() { Title = "task 2", Description = "desc 2", Priority = Priority.Critical },
                 }
                });
                context.SaveChanges();
            }
            base.Seed(context);
        }
    }
}
