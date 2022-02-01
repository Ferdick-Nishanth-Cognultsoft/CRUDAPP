import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Users from "./Users";
import { Container, Box, Toolbar, Typography, List, ListItem, Drawer, IconButton, Button, TextField } from "@material-ui/core"
import DehazeIcon from '@material-ui/icons/Dehaze';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: "auto"
  },
  iconAlign: {
    marginLeft: 160
  },
  drawer: {
    width: 300,
    martinTop: 100
  },
  ListItem: {
    marginTop: 10
  },
  content: {
    padding: theme.spacing(9)
  },
  navlink: {
    color: 'white',
    textDecoration: 'none'
  },
  sidebar: {
    width: "23rem",
    padding: "1.0rem",
    backgroundColor: 'white',
    transition: "all 0.2s ease",
    display: 'block',
    whiteSpace: 'nowrap',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
  },
  sidebarCollapsed: {
    borderTopColor: 'white',
    width: "5.5rem",
    padding: "1.0rem",
    backgroundColor: 'white',
    transition: "all 0.2s ease",
    display: 'block',
    whiteSpace: 'nowrap',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px'
  },
  sidebarHeader: {
    display: 'flex'
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '5px',
    height: '2.1cm',
  },
  linkstyle: {
    textDecoration: 'none'
  }
}));

function App() {

  const classes = useStyles();
  //const [isExpanded, setIsEpanded] = useState(false);
  const [opens, setOpens] = useState(false);

  // const handleToggler = () => {
  //   setIsEpanded(s => !s);
  // }


  return (
    <Container className={classes.root}>
      <Drawer open={opens} onClose={() => setOpens(false)}>
        <List className={classes.drawer}>
          <ListItem button className={classes.ListItem}>
            <PersonIcon />
            <Link className={classes.linkstyle} to="/">
              <Box pl={1} color="inherit">
                <Button
                onClick={() => setOpens(false)}
                >Employee</Button>
              </Box>
            </Link>
          </ListItem>

          <ListItem button>
            <GroupIcon />
            <Link className={classes.linkstyle} to="/customer">
              <Box pl={1} color="inherit">
                <Button
                onClick={() => setOpens(false)}
                >Customer</Button>
              </Box>
            </Link>
          </ListItem>
        </List>
      </Drawer>

      <AppBar style={{ background: "#2E3B55" }}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={() => setOpens(true)}>
            <DehazeIcon />
          </IconButton>
          <Typography color="inherit" style={{ flex: 1 }}>
            CRUD Operation
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default App;









//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <div className={`${isExpanded ? classes.sidebar : classes.sidebarCollapsed}`}>
//             <div className={classes.sidebarHeader}>
//               <IconButton size="medium" onClick={handleToggler}>
//                 {
//                   isExpanded ?
//                     <DoubleArrowIcon fontSize="inherit" style={{ color: 'black', transform: 'rotateY(180deg)' }} />
//                     :
//                     <DoubleArrowIcon fontSize="inherit" style={{ color: 'black' }} />
//                 }
//               </IconButton>
//             </div>
//           </div>
//           <Link className={classes.navlink} to="/">
//             <Typography variant="h6" color="inherit" className={classes.title}>
//               CRUD Operation
//             </Typography>
//           </Link>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

