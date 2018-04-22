using System.Linq;
using System.Threading.Tasks;
using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Inflector;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;

namespace CosmosComputers.DataAccess
{
    public class CosmosSqlRepository<T> : IRepository<T> where T : Entity
    {
        private readonly DocumentClient _client;
        private const string DbName = "CosmosComputers";
        private readonly string _collectionName;
        
        public CosmosSqlRepository(DocumentClient client)
        {
            _client = client;
            _collectionName = typeof(T).Name.Pluralize();
        }
        public async Task<T> Get(string id)
        {
            var documentUri = UriFactory.CreateDocumentUri(DbName, _collectionName, id);
            var document = await _client.ReadDocumentAsync<T>(documentUri);
            return document.Document;
        }

        public IQueryable<T> GetAll()
        {
            var collectionUri = UriFactory.CreateDocumentCollectionUri(DbName, _collectionName);
            return _client.CreateDocumentQuery<T>(collectionUri);
        }

        public async Task<T> Update(string id, T entity)
        {
            var documentUri = UriFactory.CreateDocumentCollectionUri(DbName, _collectionName);
            entity.Id = id;
            var res = new Document();
            
            await _client.UpsertDocumentAsync(documentUri, entity);
            return entity;
        }

        public async Task Delete(string id)
        {
            var uri = UriFactory.CreateDocumentUri(DbName, _collectionName, id);
            await _client.DeleteDocumentAsync(uri);
        }

        public async Task<T> Add(T entity)
        {
            var creationTask = CreateCollectionIfNotExists();

            var uri = UriFactory.CreateDocumentCollectionUri(DbName, _collectionName);

            await creationTask;

            await _client.CreateDocumentAsync(uri, entity);
            return entity;
        }

        private async Task CreateCollectionIfNotExists()
        {
            var collection = new DocumentCollection
            {
                Id = _collectionName
            };

            var dbUri = UriFactory.CreateDatabaseUri(DbName);
            await _client.CreateDocumentCollectionIfNotExistsAsync(dbUri, collection);
        }
    }
}
