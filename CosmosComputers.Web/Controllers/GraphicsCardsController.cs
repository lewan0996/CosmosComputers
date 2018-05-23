using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GraphicsCardsController : CrudController<GraphicsCard>
    {
        public GraphicsCardsController(IRepository<GraphicsCard> repository) : base(repository)
        {
        }
    }
}