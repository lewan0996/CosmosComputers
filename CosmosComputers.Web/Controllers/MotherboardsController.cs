using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MotherboardsController : CrudController<Motherboard>
    {
        public MotherboardsController(IRepository<Motherboard> repository) : base(repository)
        {
        }
    }
}