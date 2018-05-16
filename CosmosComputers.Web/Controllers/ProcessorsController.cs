using System.Linq;
using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProcessorsController : CrudController<Processor>
    {
        public ProcessorsController(IRepository<Processor> repository) : base(repository)
        {
        }

        [HttpGet("OfSocket/{socket}")]
        public IActionResult GetProcessorsOfSocket(string socket)
        {
            return Ok(Repository.GetAll().Where(p => p.Socket.Equals(socket)));
        }
    }
}