using System;
using System.Collections.Generic;
using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MemoryModulesController : CrudController<MemoryModule>
    {
        public MemoryModulesController(IRepository<MemoryModule> repository) : base(repository)
        {
        }
    }
}