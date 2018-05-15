using System.Linq;
using System.Threading.Tasks;

namespace CosmosComputers.Contract
{
    public interface IRepository<T>
    {
        Task<T> GetAsync(string id);
        IQueryable<T> GetAll();
        Task<T> Update(string id, T entity);
        Task Delete(string id);
        Task<T> Add(T entity);
    }
}
