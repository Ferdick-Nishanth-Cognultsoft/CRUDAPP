import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { IEmployee } from "./model/IEmployee";
import { useNavigate  } from 'react-router-dom';
import { useFetch, usePost } from "./utility/apiHelper";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  navlink:{
    color: 'white',
    textDecoration: 'none'
  },
}));

export default function UserCreate() {
  const classes = useStyles();
  let navigate  = useNavigate();

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [companyName, setCompanyname] = useState('');
  const [jobTitle, setJobtitle] = useState('');

  const [users, setUsers] = useState<IEmployee[]>([]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    UsersPost();
}

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

async function UsersPost() {
  let request = {
    "firstName":firstName, 
    "lastName": lastName,
    "companyName"  : companyName,
    "jobTitle" : jobTitle
  }
    await usePost<any>('Employees/Post', request).then((user) => {
      setUsers(user.data);
    }).catch(() => {
      console.log("Something is Wrong");
    }).finally(() => {
      UserGetAll();
    })
}

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Employee
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setFirstname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label="Company Name"
                onChange={(e) => setCompanyname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="jobTitle"
                label="Job Title"
                onChange={(e) => setJobtitle(e.target.value)}
              />
            </Grid>
          </Grid>
          <Link to="/">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => UsersPost()}
          >
            Create
          </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
