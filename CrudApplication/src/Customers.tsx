/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
import EditCustomers from "./EditCustomers";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    marginTop: '50px',
    align: "right",
    minWidth: 650
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CustomerList = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const theme = useTheme();

  const [customer, setCustomer] = useState<ICustomer>({});
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  useEffect(() => {
    CustomersGet()
  }, [])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  // const CustomersGetId = (id: any) => {
  //   (async () => {
  //     await useFetch<any>(`Customers/GetById?Id=${id}`).then((customer) => {
  //       setCustomers(customer.data);
  //     }).catch(() => {
  //       console.log("Something is Wrong");
  //     }).finally(() => {
  //     })
  //   })()
  // }

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
                {customers.map((c) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell align="right">{c.id}</TableCell>
                        <TableCell align="left">{c.customerName}</TableCell>
                        <TableCell align="left">{c.age}</TableCell>
                        <TableCell align="left">{c.place}</TableCell>
                        <TableCell align="left">{c.phoneNo}</TableCell>
                        <TableCell align="center">
                          <EditCustomers customer={c} />
                        </TableCell>
                        <TableCell>
                          <Button variant='contained' color="primary"
                            aria-label="outlined primary button group" onClick={() => { setOpen(true); CustomerDelete(c.id); }}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })
                }
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleClose} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

        </Paper>
      </Container>
    </div>
  );
}

export default CustomerList
