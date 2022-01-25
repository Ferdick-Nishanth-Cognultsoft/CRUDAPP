using EmployeeCRUDOperation_API.IServices;
using EmployeeCRUDOperation_API.Models;
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
    public class EmployeesController : ControllerBase
    {
        private IEmployeeService _oEmployeeService;

        public EmployeesController(IEmployeeService oEmployeeService)
        { 
            _oEmployeeService = oEmployeeService; 
        }

        // GET: api/<EmployeesController>
        [HttpGet]
        [ActionName("GetAll")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _oEmployeeService.GetEmployee());
        }

        // GET api/<EmployeesController>/5
        [HttpGet]
        [ActionName("GetById")]
        public async Task<IActionResult> Gets(int Id)
        {
            return Ok(await _oEmployeeService.GetById(Id));
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee oEmployee)
        {
            await _oEmployeeService.Save(oEmployee);
            return Accepted();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int Id)
        {
            await _oEmployeeService.DeleteEmployee(Id);
            return Accepted();
        }

        [HttpPost]
        [ActionName("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee oEmployee)
        {
            await _oEmployeeService.UpdateEmployee(oEmployee);
            return Accepted();
        }
    }
}
