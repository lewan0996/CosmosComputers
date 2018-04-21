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
        private readonly IRepository<T> _repository;
        public CrudController(IRepository<T> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var results = _repository.GetAll();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var result = await _repository.Get(id);
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
        public async Task<IActionResult> Add([FromBody]T item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _repository.Add(item);
            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] T item)
        {
            try
            {
                await _repository.Update(id, item);
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
                await _repository.Delete(id);
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