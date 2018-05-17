using System.Threading.Tasks;
using CosmosComputers.Contract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CrudController<T> : Controller
    {
        protected readonly IRepository<T> Repository;
        public CrudController(IRepository<T> repository)
        {
            Repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var results = Repository.GetAll();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var result = await Repository.GetAsync(id);
                return Ok(result);
            }
            catch (DocumentClientException ex)
            {
                if (ex.StatusCode.HasValue)
                {
                    Response.StatusCode = (int)ex.StatusCode.Value;
                }

                return Json(ex.Message);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Add([FromBody]T item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await Repository.Add(item);
            return NoContent();
        }


        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update(string id, [FromBody] T item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await Repository.Update(id, item);
                return NoContent();
            }
            catch (DocumentClientException ex)
            {
                if (ex.StatusCode.HasValue)
                {
                    Response.StatusCode = (int)ex.StatusCode.Value;
                }

                return Json(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await Repository.Delete(id);
                return NoContent();
            }
            catch (DocumentClientException ex)
            {
                if (ex.StatusCode.HasValue)
                {
                    Response.StatusCode = (int)ex.StatusCode.Value;
                }

                return Json(ex.Message);
            }
        }
    }
}