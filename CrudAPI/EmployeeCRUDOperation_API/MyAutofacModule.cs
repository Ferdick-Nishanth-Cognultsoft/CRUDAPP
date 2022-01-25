using Autofac;
using EmployeeCRUDOperation_API.IServices;
using EmployeeCRUDOperation_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace EmployeeCRUDOperation_API
{
    public class MyAutofacModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            // Singleton
            builder.RegisterType<EmployeeService>().As<IEmployeeService>().SingleInstance();
        }
    }
}
