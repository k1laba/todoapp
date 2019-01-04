using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Todo.Data.Entities;
using Todo.Data.Migrations;

namespace Todo.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base("ApplicationDbContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());
        }
        public DbSet<Person> Persons { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().HasMany(p => p.Tasks).WithOptional(p => p.Person).HasForeignKey(p => p.PersonId).WillCascadeOnDelete(true);
            base.OnModelCreating(modelBuilder);
        }
    }
}
