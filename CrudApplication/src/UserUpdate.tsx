/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useParams } from 'react-router-dom';
import { IEmployees } from "./model/IEmployees";
import { useFetch, usePost } from "./utility/apiHelper";
import { IEmployee } from "./model/IEmployee";
import axios from "axios";
//import {withRouter} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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
}));

export interface IFormState {
  [key: string]: any;
  values: IEmployees[];
  submitSuccess: boolean;
  loading: boolean;
}

const employees: IEmployees = {
  firstName : "",
  lastName : "",
  companyName : "",
  jobTitle : "",
}

function UserUpdate<RouteComponentProps>() {
  const[employees, setEmployees] = useState({} as IEmployees);
  const { id } = useParams();

  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = await axios.get(`https://localhost:44311/api/Employees/GetById?Id=${id}`)
    await setEmployees(user.data);
    console.log(employees)
  }

  const handleChange = (event: any) => {
    event.persist();
    setEmployees(employees => ({
      ...employees,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event:any) => {
    event.persist();
    axios.patch(`https://localhost:44311/api/Employees/GetById?Id=${id}`, employees).then(data => {
          history.back()
});
}

  return (
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            User
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-input"
                  name="firstName"
                  value={employees.firstName}
                  label="First Name"
                  type="text"
                  required
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-input"
                  name="lastName"
                  value={employees.lastName}
                  label="Last Name"
                  type="text"
                  required
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-input"
                  name="companyName"
                  value={employees.companyName}
                  label="CompanyName"
                  type="text"
                  required
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-input"
                  name="jobTitle"
                  value={employees.jobTitle}
                  label="JobTitle"
                  type="text"
                  required
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Update
              </Button>
          </form>
        </div>
      </Container>
    );
  }

//export default withRouter(UserUpdate);
export default (UserUpdate);
















/* eslint-disable react-hooks/rules-of-hooks */
/* import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useParams } from 'react-router-dom';
import { IEmployees } from "./model/IEmployees";
import { useFetch, usePost } from "./utility/apiHelper";
import { IEmployee } from "./model/IEmployee";

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
}));

const Update: React.FC<{ Employee: IEmployee[] }> = (props) => {

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [companyName, setComapanyname] = useState('');
  const [jobTitle, setJobtitle] = useState('');

  const classes = useStyles();

  const { id } = useParams();
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    var data = {
      //'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'companyName': companyName,
      'jobTitle': jobTitle,
    }
  }

var mappinngValues: IEmployee = {
  firstName: props.Employee.firstName,
  lastName: props.Employee.lastName,
  companyName: props.Employee.companyName,
  jobTitle: props.Employee.jobTitle
}

const [localState, setLocalState] = useState(mappinngValues);
    const handleChange =(e:any) => {
      setLocalState({
        ...localState,
        [e.target.name]: [e.target.value]
      })
    }

async function UserUpdate(e:any) {
  e.preventDefault()
  let request = {
    'firstName': localState.firstName,
    'lastName': localState.lastName,
    'companyName': localState.companyName,
    'jobTitle': localState.jobTitle,
  }
      await usePost<any>(`Employees/Post`, request).then((user) => {
      }).catch(() => {
        console.log("Something is Wrong");
      }).finally(() => {
      })
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
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            User
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="firstName"
                  name={props.Employee.firstName}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={localState.firstName}
                  onChange={(e) => handleChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name={props.Employee.lastName}
                  id="lastName"
                  label="Last Name"
                  value={localState.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name={props.Employee.companyName}
                  id="companyName"
                  label="CompanyName"
                  value={localState.companyName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name={props.Employee.jobTitle}
                  id="jobTitle"
                  label="JobTitle"
                  value={localState.jobTitle}
                  onChange={(e) => handleChange(e)}
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
                onClick={UserUpdate}
                
              >
                Update
              </Button>
            </Link>
          </form>
        </div>
      </Container>
    );
  }

export default Update
 */