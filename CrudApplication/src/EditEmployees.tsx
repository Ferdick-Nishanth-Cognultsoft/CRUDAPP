/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Container, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { IEmployee } from './model/IEmployee';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import { useFetch, usePost } from './utility/apiHelper';
import { useNavigate } from 'react-router-dom';
import { IEmployees } from './model/IEmployees';

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

const Editemployess: React.FC<{ employee: IEmployee }> = (props) => {

    const classes = useStyles();
    let navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [user, setUser] = useState<IEmployee[]>([]);
    const [users, setUsers] = useState<IEmployee>({});

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
        UserGetAll();
    }, []);

    var employeeDetails: IEmployees = {
        id: props.employee?.id,
        firstName: props.employee?.firstName,
        lastName: props.employee?.lastName,
        companyName: props.employee?.companyName,
        jobTitle: props.employee?.jobTitle
    }

    const [employees, setEmployees] = useState(employeeDetails);

    // const { id } = useParams();

    const handleChange = (event: any) => {
        const name = event.target.name;
        console.log(name);
        setEmployees({
            ...employees,
            [name]: event.target.value
        })
    }

    const handleSubmit = () => {
        (async () => {
            let request = {
                "id": employees.id,
                "firstName": employees.firstName,
                "lastName": employees.lastName,
                "companyName": employees.companyName,
                "jobTitle": employees.jobTitle
            }
            await usePost<any>('Employees/UpdateEmployee', request).catch(() => {
                console.log("Something is Wrong");
            }).finally(() => {
                UserGetAll();
            })
        })()
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
                    {"User"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Container maxWidth="xs">
                            <div className={classes.paper}>
                                <form className={classes.form} onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="outlined-input"
                                                name="firstName"
                                                defaultValue={employees.firstName}
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
                                                defaultValue={employees.lastName}
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
                                                defaultValue={employees.companyName}
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
                                                defaultValue={employees.jobTitle}
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


export default Editemployess