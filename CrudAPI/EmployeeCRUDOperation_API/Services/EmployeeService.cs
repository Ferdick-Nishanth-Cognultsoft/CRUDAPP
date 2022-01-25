using Dapper;
using EmployeeCRUDOperation_API.Common;
using EmployeeCRUDOperation_API.IServices;
using EmployeeCRUDOperation_API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCRUDOperation_API.Services
{
    public class EmployeeService : IEmployeeService
    {
        Employee _oEmployee = new Employee();
        public async Task DeleteEmployee(int Id)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Id", Id);
                    await con.QueryAsync<Employee>("SP_EmployeeDelete", parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       
        public async Task<List<Employee>> GetById(int Id)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Id", Id);
                    return (await con.QueryAsync<Employee>("SP_EmployeeGetById", parameters, commandType: CommandType.StoredProcedure)).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Employee>> GetEmployee()
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();
                   
                    return (await con.QueryAsync<Employee>("SP_EmployeeGet", commandType: CommandType.StoredProcedure)).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Employee> Save(Employee oEmployee)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@FirstName", oEmployee.FirstName);
                    parameters.Add("@LastName", oEmployee.LastName);
                    parameters.Add("@CompanyName", oEmployee.CompanyName);
                    parameters.Add("@JobTitle", oEmployee.JobTitle);
                    await con.QueryAsync<Employee>("SP_EmployeeInsert", parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _oEmployee;
        }

        public async Task<Employee> UpdateEmployee(Employee oEmployee)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Id", oEmployee.Id);
                    parameters.Add("@FirstName", oEmployee.FirstName);
                    parameters.Add("@LastName", oEmployee.LastName);
                    parameters.Add("@CompanyName", oEmployee.CompanyName);
                    parameters.Add("@JobTitle", oEmployee.JobTitle);
                    await con.QueryAsync<Employee>("SP_EmployeeUpdate", parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _oEmployee;
        }
    }
}
