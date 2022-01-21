/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { makeStyles, styled, useTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import { ICustomer } from "./model/ICustomer";
import { useDelete, useFetch } from "./utility/apiHelper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  table: {
    marginTop:'50px',
    align : "right",
    minWidth: 650
  }
}));

export default function CustomerList() {
  const classes = useStyles();
  //const location = useHistory();
  let navigate = useNavigate();

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  useEffect(() => {
    CustomersGet()
  }, [])
  
  const CustomersGet = () => {
    (async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useFetch<any>('Customers/GetAll').then((customer) => {
        setCustomers(customer.data);
      }).catch(() => {
        console.log("Something is Wrong");
      }).finally(() => {
      })
    })()
  }

  const CustomerDelete = (id: any) => {
    (async () => {
      await useDelete<any>(`Customers/Delete?Id=${id}`).catch(() => {
        console.log("Something is Wrong");
      }).finally(() => {
        CustomersGet();
      })
    })()
  }

  const CustomersGetId = (id: any) => {
    (async () => {
      await useFetch<any>(`Customers/GetById?Id=${id}`).then((customer) => {
        setCustomers(customer.data);
      }).catch(() => {
        console.log("Something is Wrong");
      }).finally(() => {
      })
    })()
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Customers
              </Typography>
            </Box>
            <Box>
              <Link to="/customercreate">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">CustomerName</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Place</TableCell>
                <TableCell align="left">PhoneNo</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow>
                  <TableCell align="right">{customer.id}</TableCell>
                  <TableCell align="left">{customer.customerName}</TableCell>
                  <TableCell align="left">{customer.age}</TableCell>
                  <TableCell align="left">{customer.place}</TableCell>
                  <TableCell align="left">{customer.phoneNo}</TableCell>
                  <TableCell align="center">
                    <Link to={`/customerupdate/${customer.id}`}>
                          <Button variant='contained' color="primary"
                            aria-label="outlined primary button group">Edit</Button>
                    </Link>
                    <Button variant='contained' color="primary"
                          aria-label="outlined primary button group" onClick={() => { CustomerDelete(customer.id); } }>Delete</Button>
                      </TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}

