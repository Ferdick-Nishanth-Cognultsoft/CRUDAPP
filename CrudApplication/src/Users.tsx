/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
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
import { IEmployee } from "./model/IEmployee";
import UserUpdate from "./UserUpdate";
import { useDelete, useFetch, usePost } from "./utility/apiHelper";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, useMediaQuery } from "@material-ui/core";
import { IEmployees } from "./model/IEmployees";
import axios from "axios";

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
    marginTop: '50px',
    align: "right",
    minWidth: 650
  }
}));


const UserList = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUsers] = useState<IEmployee[]>([]);
  useEffect(() => {
    UserGetAll();
  }, []);

  const UserGetAll = () => {
    (async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useFetch<any>('Employees/GetAll').then((user) => {
        setUsers(user.data);
      }).catch(() => {
        console.log("Something is Wrong");
      }).finally(() => {
      })
    })()
  }

  const UserDelete = (id: any) => {
    (async () => {
      await useDelete<any>(`Employees/Delete?Id=${id}`).catch(() => {
        console.log("Something is Wrong");
      }).finally(() => {
        UserGetAll();
      })
    })()
  }

  const UsersGetId = (id: any) => {
    (async () => {
      await useFetch<any>(`Employees/GetById?Id=${id}`).then((user) => {
        setUsers(user.data);
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
                Employees
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
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
                  <TableCell align="center">FirstName</TableCell>
                  <TableCell align="left">LastName</TableCell>
                  <TableCell align="left">CompanyName</TableCell>
                  <TableCell align="left">JobTitle</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((r) => {
                  return (
                    <><TableRow>
                      <TableCell align="right">{r.id}</TableCell>
                      <TableCell align="left">{r.firstName}</TableCell>
                      <TableCell align="left">{r.lastName}</TableCell>
                      <TableCell align="left">{r.companyName}</TableCell>
                      <TableCell align="left">{r.jobTitle}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary"
                          aria-label="outlined primary button group"
                          onClick={handleClickOpen}>
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant='contained' color="primary"
                          aria-label="outlined primary button group" onClick={() => { UserDelete(r.id); }}>Delete</Button>
                      </TableCell>
                    </TableRow></>
                  )
                })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserList
