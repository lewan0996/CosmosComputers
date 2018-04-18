using System;
using Inflector;
using System.Linq;
using System.Threading.Tasks;
using CosmosComputers.Contract;
using Microsoft.Azure.Documents.Client;

namespace CosmosComputers.DataAccess
{
    public class CosmosSqlRepository<T> : IRepository<T>
    {
        private readonly DocumentClient _client;
        private readonly string _dbName;
        private readonly string _collectionName;
        public CosmosSqlRepository(string endpointUri, string authKey, string dbName)
        {
            _dbName = dbName;
            var uri = new Uri(endpointUri);
            _client = new DocumentClient(uri, authKey);
            _collectionName = typeof(T).Name.Pluralize();
        }
        public async Task<T> Get(string id)
        {
            var documentUri = UriFactory.CreateDocumentUri(_dbName, _collectionName, id);
            var document = await _client.ReadDocumentAsync<T>(documentUri);

            return document.Document;
        }

        public IQueryable<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new System.NotImplementedException();
        }

        public void Add(T entity)
        {
            throw new System.NotImplementedException();
        }
    }
}
