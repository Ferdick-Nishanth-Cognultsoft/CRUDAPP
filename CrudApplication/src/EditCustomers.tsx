/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICustomer } from "./model/ICustomer";
import { ICustomers } from "./model/ICustomers";
import { useFetch, usePost } from "./utility/apiHelper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:  1
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

const EditCustomers: React.FC<{ customer: ICustomer }> = (props) => {

    const classes = useStyles();
    let navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [customer, setCustomer] = useState<ICustomer[]>([]);
    const [customers1, setCustomers1] = useState<ICustomer>({});

    const handleClickOpen = () => {
        setOpen(true);

        // (async () => {
        //     await useFetch<any>(`Employees/GetById?Id=${props.employee?.id}`).then((user) => {
        //         setUser(user.data);
        //     }).catch(() => {
        //         console.log("Something is Wrong");
        //     }).finally(() => {
        //     })
        // })()
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        CustomerGetAll();
    }, []);

    var customerDetails: ICustomers = {
        id: props.customer?.id,
        customerName: props.customer?.customerName,
        age: props.customer?.age,
        place: props.customer?.place,
        phoneNo: props.customer?.phoneNo
    }

    const [customers, setCustomers] = useState(customerDetails);

    // const { id } = useParams();

    const handleChange = (event: any) => {
        const name = event.target.name;
        console.log(name);
        setCustomers({
            ...customers,
            [name]: event.target.value
        })
    }

    const handleSubmit = () => {
        (async () => {
            let request = {
                "id": customers.id,
                "customerName": customers.customerName,
                "age": customers.age,
                "place": customers.place,
                "phoneNo": customers.phoneNo
            }
            await usePost<any>('Customers/UpdateCustomer', request).catch(() => {
                console.log("Something is Wrong");
            }).finally(() => {
                CustomerGetAll();
            })
        })()
    }

    const CustomerGetAll = () => {
        (async () => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            await useFetch<any>('Customers/GetAll').then((customer) => {
                setCustomers1(customer.data);
            }).catch(() => {
                console.log("Something is Wrong");
            }).finally(() => {
            })
        })()
    }


    return (
        <>
            <Button variant="contained" color="primary"
                aria-label="outlined primary button group"
                onClick={() => { handleClickOpen(); }}>
                Edit
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Customer"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Container maxWidth="xs">
                            <div className={classes.paper}>
                                <form className={classes.form} onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="customerName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="outlined-input"
                                                label="Customer Name"
                                                type="text"
                                                defaultValue={customers.customerName}
                                                onChange={handleChange}
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="age"
                                                id="outlined-input"
                                                label="Age"
                                                type="text"
                                                defaultValue={customers.age}
                                                onChange={handleChange}                                                       
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="place"
                                                label="place"
                                                defaultValue={customers.place}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="phoneNo"
                                                label="PhoneNo"
                                                defaultValue={customers.phoneNo}
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
                                        onClick={() => { handleSubmit(); }}
                                    >
                                        Update
                                    </Button>
                                </form>
                            </div>
                        </Container>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditCustomers