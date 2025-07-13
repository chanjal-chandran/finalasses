import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: '#9c27b0',
        boxShadow: 'none',
        mb: 3
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            color: 'white', 
            textDecoration: 'none',
            fontWeight: 500
          }}
        >
          BlogApp
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/"
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            HOME
          </Button>
          <Button
            component={Link}
            to="/add"
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            ADD
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
