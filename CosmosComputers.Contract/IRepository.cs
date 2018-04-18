using System.Linq;
using System.Threading.Tasks;

namespace CosmosComputers.Contract
{
    public interface IRepository<T>
    {
        Task<T> Get(string id);
        IQueryable<T> GetAll();
        void Delete(string id);
        void Add(T entity);
    }
}
