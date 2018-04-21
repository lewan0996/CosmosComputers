using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GraphicCardsController : CrudController<GraphicsCard>
    {
        public GraphicCardsController(IRepository<GraphicsCard> repository) : base(repository)
        {
        }
    }
}