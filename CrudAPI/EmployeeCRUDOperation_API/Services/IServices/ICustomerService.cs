using EmployeeCRUDOperation_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCRUDOperation_API.Services.IServices
{
    public interface ICustomerService
    {
        Task<Customer> Save(Customer oCustomer);
        Task DeleteCustomer(int Id);
        Task<List<Customer>> GetCustomer();
        Task<List<Customer>> GetById(int Id);
    }
}
