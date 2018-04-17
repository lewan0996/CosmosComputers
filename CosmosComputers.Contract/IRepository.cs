using System.Collections.Generic;
using System.Linq;

namespace SBDCosmosDBSQL.Contract
{
    public interface IRepository<T>
    {
        T Get(string id);
        IQueryable<T> GetAll();
        void Delete(string id);
        void Add(T entity);
    }
}
