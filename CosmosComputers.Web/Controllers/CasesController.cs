using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CasesController : CrudController<Case>
    {
        public CasesController(IRepository<Case> repository):base(repository)
        {
        }
    }
}