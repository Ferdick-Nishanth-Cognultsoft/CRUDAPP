using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCRUDOperation_API.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public int Age { get; set; }
        public string Place { get; set; }
        public string PhoneNo { get; set; }
    }
}
