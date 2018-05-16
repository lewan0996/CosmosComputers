using System.Linq;
using CosmosComputers.Contract;
using CosmosComputers.Contract.Enums;
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

        [HttpGet("ofType/{type}")]
        public IActionResult GetMemoryModulesOfType(MemoryType type)
        {
            var qwe = Repository.GetAll().Where(m => m.Type == type).ToString();
            return Ok(Repository.GetAll().Where(m => m.Type == type));
        }
    }
}