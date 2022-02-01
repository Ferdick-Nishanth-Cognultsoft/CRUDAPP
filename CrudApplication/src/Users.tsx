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
import EditEmployees from "./EditEmployees";
import TablePagination from '@mui/material/TablePagination';

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
  searchBox: {
    borderRadius: 30,
    border: '2px, blue solid',
    width: '120%',
    height: '35px',
    boxShadow: 'rgba(100, 100, 111, 0.5) 0px 7px 29px 0px',
    fontSize: 16,
    textIndent: '10px'
  }
}));


const UserList = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const theme = useTheme();

  const [user, setUser] = useState<IEmployee>({});
  const [users, setUsers] = useState<IEmployee[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchemployee, setsearchemployee] = useState<string>('');

  const search = (e: any) => {
    setsearchemployee(e);
  }

  useEffect(() => {
    UserGetAll();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const UserGetAll = () => {
    (async () => {
      let request = {
        "search": searchemployee.trimStart().trimEnd() ?? ""
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await usePost<IEmployee[]>('Employees/GetAll', request).then((user) => {
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

  /* const UsersGetId = (id: any) => {
    (async () => {
      await useFetch<any>(`Employees/GetById?Id=${id}`).then((user) => {
        setUsers(user.data);
      }).catch(() => {
        console.log("Something is Wrong");
      }).finally(() => {
      })
    })()
  }
 */

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1} textAlign="left">
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Employees
              </Typography>
            </Box>
            <Box>
              <input value={searchemployee}
                type='text' placeholder="Search here"
                className={classes.searchBox}
                onChange={e => search(e.target.value)}
                onKeyPress={event => { if (event.key === 'Enter') { UserGetAll(); } }}
                maxLength={255}
              />
            </Box>
            <Box>
              <Link to="/create">
                <Button component="h2" variant="contained" color="primary">
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
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((r) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell align="right">{r.id}</TableCell>
                          <TableCell align="left">{r.firstName}</TableCell>
                          <TableCell align="left">{r.lastName}</TableCell>
                          <TableCell align="left">{r.companyName}</TableCell>
                          <TableCell align="left">{r.jobTitle}</TableCell>
                          <TableCell align="center">
                            <EditEmployees employee={r} />
                          </TableCell>
                          <TableCell>
                            <Button variant='contained' color="primary"
                              aria-label="outlined primary button group" onClick={() => { UserDelete(r.id); setOpen(true)}}>Delete</Button>
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

export default UserList
