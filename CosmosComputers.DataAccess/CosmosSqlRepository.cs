using System;
using System.Linq;
using System.Threading.Tasks;
using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;

namespace CosmosComputers.DataAccess
{
    public class CosmosSqlRepository<T> : IRepository<T> where T : Entity
    {
        private readonly DocumentClient _client;
        private const string DbName = "CosmosComputers";
        private readonly string _collectionName;
        private readonly string _typeName;

        public CosmosSqlRepository(string uri, string authKey, string collectionName)
        {
            _client = new DocumentClient(new Uri(uri), authKey);
            _collectionName = collectionName;
            _typeName = typeof(T).Name;
        }

        public CosmosSqlRepository(IConfiguration configuration, string collectionName = null)
        {
            var cosmosOptions = configuration.GetSection("cosmosDb");
            _client = new DocumentClient(new Uri(cosmosOptions["uri"]), cosmosOptions["authKey"]);
            _collectionName = collectionName ?? cosmosOptions["hardwareCollectionName"];
            _typeName = typeof(T).Name;
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
            return _client.CreateDocumentQuery<T>(collectionUri).Where(x => x.Discriminator.Equals(_typeName));
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
