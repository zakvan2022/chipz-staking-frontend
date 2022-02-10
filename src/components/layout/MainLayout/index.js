import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, Typography, useMediaQuery, Button } from '@mui/material';

// project imports
import Breadcrumbs from 'components/ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from 'menu-items';
import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';

// assets
import { IconChevronRight } from '@tabler/icons';

import metamask from '../../../assets/images/metamask.png';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };
    const [showMetamask, setShowMetamask] = useState(false);

    const clickMetamask = () => {
        setShowMetamask(!showMetamask);
    };

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    borderBottom: '0.5px solid rgba(255, 255, 255, 0.25)',
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} clickMetamask={clickMetamask} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                {showMetamask && (
                    <Box
                        position="absolute"
                        zIndex="10"
                        width="100%"
                        height="100%"
                        bgcolor="rgba(17, 21, 34, 0.49)"
                        style={{ backdropFilter: 'blur(28px)' }}
                    >
                        <Box
                            display="flex"
                            position="relative"
                            flexDirection="column"
                            p="10px"
                            borderRadius="12px"
                            border="2px solid #CE2179"
                            alignItems="center"
                            boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
                            bgcolor="#111522"
                            width="500px"
                            top="calc(100vh - 1300px / 2)"
                            left="calc((100vw - 1000px) / 2)"
                        >
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                borderBottom="1px solid rgba(255, 255, 255, 0.25)"
                                sx={{
                                    color: 'white',
                                    fontSize: '30px',
                                    fontWeight: 600,
                                    width: '100%'
                                }}
                            >
                                <Typography fontSize="16px" fontWeight="400">
                                    Connect to a Wallet
                                </Typography>
                                <Button>
                                    <Typography fontSize="16px" fontWeight="400" color="white">
                                        X
                                    </Typography>
                                </Button>
                            </Box>
                            <Button
                                sx={{
                                    color: 'white',
                                    padding: '10px 40px',
                                    backgroundColor: '#CE2179',
                                    '&:hover': { backgroundColor: '#BE1169' },
                                    boxShadow: '0px 8px 0px #8F1754',
                                    borderRadius: '7px',
                                    width: '250px',
                                    marginY: '30px'
                                }}
                                onClick={clickMetamask}
                            >
                                <Typography fontSize="18px" fontWeight="600" mr="20px">
                                    Metamask
                                </Typography>
                                <img src={metamask} alt="metamask" style={{ width: '32px' }} />
                            </Button>
                        </Box>
                    </Box>
                )}
                <Outlet />
            </Main>
        </Box>
    );
};

export default MainLayout;
