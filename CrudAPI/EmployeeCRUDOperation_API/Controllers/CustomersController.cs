using EmployeeCRUDOperation_API.Models;
using EmployeeCRUDOperation_API.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeCRUDOperation_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private ICustomerService _oCustomerService;
        public CustomersController(ICustomerService oCustomerService)
        {
            _oCustomerService = oCustomerService;
        }

        // GET: api/<CustomersController>
        [HttpGet]
        [ActionName("GetAll")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _oCustomerService.GetCustomer());
        }

        // GET api/<CustomersController>/5
        [HttpGet]
        [ActionName("GetById")]
        public async Task<IActionResult> Gets(int Id)
        {
            return Ok(await _oCustomerService.GetById(Id));
        }

        // POST api/<CustomersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Customer oCustomer)
        {
            await _oCustomerService.Save(oCustomer);
            return Accepted();
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete]
        public async Task<IActionResult> Delete(int Id)
        {
            await _oCustomerService.DeleteCustomer(Id);
            return Accepted();
        }
    }
}
