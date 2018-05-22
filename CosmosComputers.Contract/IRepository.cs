using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents.Client;

namespace CosmosComputers.Contract
{
    public interface IRepository<T>
    {
        Task<T> GetAsync(string id);
        IQueryable<T> GetAll();
        Task<T> Update(string id, T entity, RequestOptions options = null);
        Task Delete(string id);
        Task<T> Add(T entity);
    }
}
