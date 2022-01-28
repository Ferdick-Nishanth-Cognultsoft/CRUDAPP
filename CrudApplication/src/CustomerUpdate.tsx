import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';

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

export default function CustomerUpdate() {
  const classes = useStyles();

  const { id } = useParams();
  useEffect(() => {
    fetch("https://localhost:44311/api/Customers/Post")
      .then(res => res.json())
      .then(
        (result) => {
          setCustomername(result.customer.customerName)
          setAge(result.customer.age)
          setPlace(result.customer.place)
          setPhoneno(result.customer.phoneNo)
        }
      )
  }, [id])

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    var data = {
      //'id': id,
      'customerName': customerName,
      'age': age,
      'place': place,
      'phoneNo': phoneNo
    }
    fetch('https://localhost:44311/api/Customers/Post', {
      method: 'PUT',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
    )
  }

  const [customerName, setCustomername] = useState('');
  const [age, setAge] = useState('');
  const [place, setPlace] = useState('');
  const [phoneNo, setPhoneno] = useState('');

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
                autoComplete="customername"
                name="customerName"
                variant="outlined"
                required
                fullWidth
                id="customerName"
                label="Customer Name"
                value={customerName}
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="place"
                label="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNo"
                label="PhoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneno(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
