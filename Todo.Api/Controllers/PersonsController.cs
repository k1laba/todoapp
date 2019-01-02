using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Todo.Api.Models;
using Todo.Business.Services;
using Todo.Data.Entities;

namespace Todo.Api.Controllers
{
    public class PersonsController : BaseApiController<Person, PersonViewModel>
    {
        public PersonsController(IPersonsService serevice, IMapper mapper) : base(serevice, mapper)
        {
        }
    }
}
