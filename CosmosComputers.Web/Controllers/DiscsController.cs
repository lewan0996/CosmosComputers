﻿using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DiscsController : CrudController<Disc>
    {
        public DiscsController(IRepository<Disc> repository) : base(repository)
        {
        }
    }
}