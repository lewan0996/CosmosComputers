using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PowerSuppliesController : CrudController<PowerSupply>
    {
        public PowerSuppliesController(IRepository<PowerSupply> repository) : base(repository)
        {
        }
    }
}