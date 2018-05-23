using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CosmosComputers.Contract;
using CosmosComputers.Contract.Model;
using Microsoft.AspNetCore.Mvc;

namespace CosmosComputers.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Computers")]
    public class ComputersController : CrudController<Computer>
    {
        private readonly IRepository<Case> _casesRepository;
        private readonly IRepository<Cooler> _coolersRepository;
        private readonly IRepository<Disc> _discsRepository;
        private readonly IRepository<GraphicsCard> _graphicCardsRepository;
        private readonly IRepository<MemoryModule> _memoryModulesRepository;
        private readonly IRepository<Motherboard> _motherBoardsRepository;
        private readonly IRepository<PowerSupply> _powerSuppliesRepository;
        private readonly IRepository<Processor> _processorsRepository;

        public ComputersController(IRepository<Computer> repository, IRepository<Case> casesRepository,
            IRepository<Cooler> coolersRepository, IRepository<Disc> discsRepository,
            IRepository<GraphicsCard> graphicCardsRepository, IRepository<MemoryModule> memoryModulesRepository,
            IRepository<Motherboard> motherBoardsRepository, IRepository<PowerSupply> powerSuppliesRepository,
            IRepository<Processor> processorsRepository) : base(repository)
        {
            _casesRepository = casesRepository;
            _coolersRepository = coolersRepository;
            _discsRepository = discsRepository;
            _graphicCardsRepository = graphicCardsRepository;
            _memoryModulesRepository = memoryModulesRepository;
            _motherBoardsRepository = motherBoardsRepository;
            _powerSuppliesRepository = powerSuppliesRepository;
            _processorsRepository = processorsRepository;
        }

        [HttpGet("Descriptions")]
        public IActionResult GetAllDescriptions()
        {
            return Ok(Repository.GetAll().Select(c => c.Name));
        }

        [HttpGet("Flat")]
        public IActionResult GetFlatComputers()
        {
            var computers = Repository.GetAll().Select(computer => new
            {
                Case = computer.Case.Producer + " " + computer.Case.Model,
                Cooler = computer.Cooler.Producer + " " + computer.Cooler.Model,
                Disc = computer.Disc.Producer + " " + computer.Disc.Model,
                GraphicsCard = computer.GraphicsCard.Vendor + " " + computer.GraphicsCard.Model + " " +
                               computer.GraphicsCard.Version,
                Motherboard = computer.Motherboard.Producer + " " + computer.Motherboard.Model,
                PowerSupply = computer.PowerSupply.Producer + " " + computer.PowerSupply.Model,
                Processor = computer.Processor.Producer + " " + computer.Processor.Model,
                computer.Name,
                computer.Id,
                computer.MemoryModules,
                computer.Price
            }).ToList();

            var computersWithFlattenMemoryModules = computers.Select(c => new
            {
                c.Motherboard,
                c.Case,
                c.Cooler,
                c.Disc,
                c.GraphicsCard,
                c.Id,
                c.Name,
                c.PowerSupply,
                c.Processor,
                c.Price,
                MemoryModule1 = c.MemoryModules.First().Producer + " " + c.MemoryModules.First().Model + " " + c.MemoryModules.First().MemoryAmount,
                MemoryModule2 = c.MemoryModules.ElementAt(1).Producer + " " + c.MemoryModules.ElementAt(1).Model + " " + c.MemoryModules.ElementAt(1).MemoryAmount,
                MemoryModule3 = c.MemoryModules.ElementAt(2).Producer + " " + c.MemoryModules.ElementAt(2).Model + " " + c.MemoryModules.ElementAt(2).MemoryAmount,
                MemoryModule4 = c.MemoryModules.ElementAt(3).Producer + " " + c.MemoryModules.ElementAt(3).Model + " " + c.MemoryModules.ElementAt(3).MemoryAmount
            });

            return Ok(computersWithFlattenMemoryModules);
        }

        [HttpPost]
        public override async Task<IActionResult> Add([FromBody]Computer item)
        {
            var price = await CalculateComputersPrice(item);
            item.Price = price; //client can put wrong prices

            return await base.Add(item);
        }

        private async Task<float> CalculateComputersPrice(Computer computer)
        {
            var getPriceTasks = new List<Task<float>>
            {
                _casesRepository.GetAsync(computer.Case.Id).ContinueWith(t => t.Result.Price),
                _coolersRepository.GetAsync(computer.Cooler.Id).ContinueWith(t => t.Result.Price),
                _discsRepository.GetAsync(computer.Disc.Id).ContinueWith(t => t.Result.Price),
                _graphicCardsRepository.GetAsync(computer.GraphicsCard.Id).ContinueWith(t => t.Result.Price),
                _motherBoardsRepository.GetAsync(computer.Motherboard.Id).ContinueWith(t => t.Result.Price),
                _powerSuppliesRepository.GetAsync(computer.PowerSupply.Id).ContinueWith(t => t.Result.Price),
                _processorsRepository.GetAsync(computer.Processor.Id).ContinueWith(t => t.Result.Price)
            };

            var getPriceResults = await Task.WhenAll(getPriceTasks);

            var memoryModuleIds = computer.MemoryModules.Select(m => m.Id);
            var memoryModulesPrice = _memoryModulesRepository.GetAll().Where(m => memoryModuleIds.Contains(m.Id))
                .Sum(m => m.Price);

            return getPriceResults.Sum() + memoryModulesPrice;
        }
    }
}