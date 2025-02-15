﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Todo.Data.Entities;

namespace Todo.Api.Models
{
    public class BaseViewModel
    {
        public virtual Guid Id { get; set; }
        public virtual string Title { get; set; }
    }
    public class TaskViewModel : BaseViewModel
    {
        public Guid? PersonId { get; set; }
        public virtual string Description { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual State State { get; set; }
        public virtual DateTime? Estimate { get; set; }
    }
    public class PersonViewModel : BaseViewModel
    {
        private List<TaskViewModel> _tasks = new List<TaskViewModel>();
        public List<TaskViewModel> Tasks
        {
            get { return _tasks; }
            set
            {
                _tasks = value.OrderBy(i => i.Priority).ToList();
            }
        }
    }
}