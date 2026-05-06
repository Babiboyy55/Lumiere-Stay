using Lumiere.Models;

namespace Lumiere.Repositories
{
    public interface IPaymentRepository: IRepository<Payment>
    {
        public Task<int?>createPayment (Payment payment);

    }
}
