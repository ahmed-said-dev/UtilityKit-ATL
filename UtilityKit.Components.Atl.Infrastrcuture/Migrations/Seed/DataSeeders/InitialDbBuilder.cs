using UtilityKit.Components.Atl.Infrastrcuture;

namespace UtilityKit.Components.Atl.Infrastrcuture.Migrations.Seed.DataSeeders
{
    public class InitialDbBuilder
    {
        private readonly ATLDbContext  _context;

        public InitialDbBuilder(ATLDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new UserCreator(_context).Create();
          
            _context.SaveChanges();
        }
    }
}
