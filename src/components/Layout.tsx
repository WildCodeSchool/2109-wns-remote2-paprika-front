import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const drawerWidth = 280;

const links = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    path: '',
    cleanPath: '/dashboard',
  },
  {
    name: 'Utilisateurs',
    icon: <PeopleAltIcon />,
    path: '/users',
    cleanPath: '/dashboard/users',
  },
];

const useStyles = makeStyles(() => ({
  active: {
    color: '#f39c12',
    backgroundColor: '#fff8db',
    fontWeight: 700,
    borderRight: '3px solid #f39c12',
  },
  inactive: {
    color: '#34495e',
    fontWeight: 500,
  },
  activeIcon: {
    color: '#f39c12 !important',
  },
  inactiveIcon: {
    color: '#34495e !important',
  },
}));

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
`;

const CustomListItem = styled(ListItem)`
  padding-left: 40px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #ecf0f1;
    transition: 0.2s ease-in-out;
  }
`;

const Item = styled.p`
  font-size: 15px;
  padding: 0;
  margin: 5px 0;
`;

const UserTab = styled(Paper)`
  background-color: #ecf0f1;
  padding: 16px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

type Children = {
  children?: JSX.Element;
};

const Layout = ({ children }: Children) => {
  const navigation = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  React.useEffect(() => {
    const token = Cookies.get('connected');
    console.log(token);
    if (!!!token) navigation('/login');
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ padding: '24px 24px 0 24px' }}>
            <Typography
              fontWeight={800}
              variant={'h6'}
              sx={{ marginBottom: '24px', color: '#f39c12' }}
            >
              Paprika Dashboard
            </Typography>
            <UserTab elevation={0}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  fontSize: 18,
                  fontWeight: 600,
                  marginRight: 2,
                  bgcolor: '#f39c12',
                }}
              >
                JD
              </Avatar>
              <Typography fontSize={14} fontWeight={700}>
                John Doe
              </Typography>
            </UserTab>
          </Box>
          <List>
            {links.map((link) => (
              <CustomNavLink key={link.name} to={`/dashboard${link.path}`}>
                <CustomListItem
                  className={
                    link.cleanPath === location.pathname
                      ? classes.active
                      : classes.inactive
                  }
                >
                  <ListItemIcon
                    sx={{ minWidth: 0, paddingRight: '20px' }}
                    className={
                      link.cleanPath === location.pathname
                        ? classes.activeIcon
                        : classes.inactiveIcon
                    }
                  >
                    {link.icon}
                  </ListItemIcon>
                  <Item>{link.name}</Item>
                </CustomListItem>
              </CustomNavLink>
            ))}
          </List>
        </Drawer>
        <Box p={2}>{children}</Box>
      </Box>
    </>
  );
};

export default Layout;
