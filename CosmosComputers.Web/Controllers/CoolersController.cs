using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CoolersController : CrudController<Cooler>
    {
        public CoolersController(IRepository<Cooler> repository) : base(repository)
        {
        }
    }
}