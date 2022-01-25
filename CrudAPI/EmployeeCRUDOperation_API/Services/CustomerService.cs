using Dapper;
using EmployeeCRUDOperation_API.Common;
using EmployeeCRUDOperation_API.Models;
using EmployeeCRUDOperation_API.Services.IServices;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCRUDOperation_API.Services
{
    public class CustomerService : ICustomerService
    {
        Customer _oCustomer = new Customer();

        public async Task<Customer> Save(Customer oCustomer)
        {
            _oCustomer = new Customer();
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@CustomerName", oCustomer.CustomerName);
                    parameters.Add("@Age", oCustomer.Age);
                    parameters.Add("@Place", oCustomer.Place);
                    parameters.Add("@PhoneNo", oCustomer.PhoneNo);
                    await con.QueryAsync<Customer>("SP_CustomerInsert", parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _oCustomer;
        }

        public async Task<List<Customer>> GetById(int Id)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Id", Id);
                    return (await con.QueryAsync<Customer>("SP_CustomerGetById", parameters, commandType: CommandType.StoredProcedure)).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Customer>> GetCustomer()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    return (await con.QueryAsync<Customer>("SP_CustomerGet", commandType: CommandType.StoredProcedure)).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteCustomer(int Id)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Id", Id);
                    await con.QueryAsync<Customer>("SP_CustomerDelete", parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
