import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Users from "./Users";


/* const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar><>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
               sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}   
          >
            <MenuIcon />
          </IconButton>
          </>
          <Typography variant="h6" noWrap component="div">
            CRUD Operation
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <Divider />
        <List>
          {['Employees', 'Customers'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <PersonIcon /> : <GroupIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography>
          <Users />
        </Typography>
      </Box>
    </Box>
  );
}

 */








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
  navlink:{
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
}
}));


export default function App() {
  const classes = useStyles();
  const [isExpanded, setIsEpanded] = useState(false);

  const handleToggler = () => {
    setIsEpanded(s => !s);
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <div className={`${isExpanded ? classes.sidebar : classes.sidebarCollapsed}`}>
                <div className={classes.sidebarHeader}>
                    <IconButton size="medium" onClick={handleToggler}>
                        {
                            isExpanded ?
                                <DoubleArrowIcon fontSize="inherit" style={{ color: 'black', transform: 'rotateY(180deg)' }} />
                                :
                                <DoubleArrowIcon fontSize="inherit" style={{ color: 'black' }} />
                        }
                    </IconButton>
                </div>
                </div>
          <Link className={classes.navlink} to="/">
            <Typography variant="h6" className={classes.title}>
              CRUD Operation
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
} 

 