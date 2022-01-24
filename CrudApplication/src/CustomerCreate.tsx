import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useFetch, usePost } from "./utility/apiHelper";
import { ICustomer } from "./model/ICustomer";

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

export default function CustomerCreate() {
  const classes = useStyles();
  let navigate = useNavigate();

  const [customerName, setCustomername] = useState('');
  const [age, setAge] = useState('');
  const [place, setPlace] = useState('');
  const [phoneNo, setPhoneno] = useState('');

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  console.log(customerName)

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    CustomersPost();
  }

  const CustomerGetAll = () => {
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

  async function CustomersPost() {
    let request = {
      "customerName": customerName,
      "age": age,
      "place": place,
      "phoneNo": phoneNo
    }
    await usePost<any>('Customers/Post', request).catch(() => {
      console.log("Something is Wrong");
    }).finally(() => {
      CustomerGetAll();
    })
  }


  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Customer
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="cname"
                name="customerName"
                variant="outlined"
                required
                fullWidth
                id="customerName"
                label="Customer Name"
                onChange={(e) => setCustomername(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="age"
                label="Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="place"
                label="Place"
                onChange={(e) => setPlace(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNo"
                label="Phone No"
                onChange={(e) => setPhoneno(e.target.value)}
              />
            </Grid>
          </Grid>
          <Link to="/customer">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => CustomersPost()}
            >
              Create
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
