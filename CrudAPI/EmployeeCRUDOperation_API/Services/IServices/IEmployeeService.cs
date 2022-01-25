using EmployeeCRUDOperation_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCRUDOperation_API.IServices
{
    public interface IEmployeeService
    {
        Task<Employee> Save(Employee oEmployee);
        Task DeleteEmployee(int Id);
        Task<List<Employee>> GetEmployee();
        Task<List<Employee>> GetById(int Id);
        Task<Employee> UpdateEmployee(Employee oEmployee);
    }
}
