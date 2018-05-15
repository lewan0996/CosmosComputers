using System.Linq;
using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Computers")]
    public class ComputersController : CrudController<Computer>
    {
        public ComputersController(IRepository<Computer> repository):base(repository)
        {
        }

        [HttpGet("Descriptions")]
        public IActionResult GetAllDescriptions()
        {
            return Ok(Repository.GetAll().Select(c => c.Description));
        }
    }
}