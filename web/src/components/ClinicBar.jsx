import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';

//import Navigate
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { IconButton } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import theme1 from '../theme';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - 200px)`,
      marginLeft: `200px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));




export default function ClinicBar({open, setOpen}) {

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme1}>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position='static' theme={theme1} open={open}>
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={()=>{navigate("/")}}
                    >
                        <KeyboardDoubleArrowLeftIcon />
                    </IconButton> 
                    <Typography variant="h3" 
                                component="div" 
                                sx={{ flexGrow: 1 }}
                                style={{fontWeight: 700}}>
                        看診小助手
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}
