import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
} from '@mui/material';

import { 
  PlayArrow, 
  Pause, 
  Stop, 
  Menu as MenuIcon 
} from '@mui/icons-material';
import { BotStatus } from '../../styles/types';
import { useState } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
interface HeaderProps {
  botStatus: BotStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const Header = ({ botStatus, onStart, onPause, onStop }: HeaderProps) => {
 
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
 

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <Box 
      component="nav" 
      sx={{ 
        p: 2, 
        bgcolor: 'primary.main', 
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1100
      }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center"
        maxWidth="xl"
        mx="auto"
      >
        {/* Left Section - Logo & Title */}
        <Box display="flex" alignItems="center" gap={2}>
          <Paper sx={{ 
            borderRadius: '100%', 
            bgcolor: 'primary.dark', 
            width: 40, 
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <SmartToyIcon fontSize="medium" />
          </Paper>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}>
              BLS Portugal Visa Bot
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Morocco to Portugal Appointment Booking
            </Typography>
          </Box>
        </Box>

        {/* Desktop Controls */}
        <Box 
          display={{ xs: 'none', md: 'flex' }} 
          alignItems="center" 
          gap={2}
        >
          <Paper sx={{ 
            p: 1, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            bgcolor: 'primary.dark'
          }}>
            <Box sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: botStatus === 'running' ? 'success.main' : 
                      botStatus === 'paused' ? 'warning.main' : 'grey.500'
            }} />
            <Typography variant="body2" textTransform="uppercase">
              {botStatus}
            </Typography>
          </Paper>
          
          <Button
            variant="contained"
            size="small"
            startIcon={<PlayArrow />}
            onClick={onStart}
            disabled={botStatus === 'running'}
            sx={{ textTransform: 'none' }}>
            Start
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            startIcon={<Pause />}
            onClick={onPause}
            disabled={botStatus !== 'running'}
            sx={{ textTransform: 'none' }}>
            Pause
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Stop />}
            onClick={onStop}
            disabled={botStatus === 'idle'}
            sx={{ textTransform: 'none' }}>
            Stop
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          onClick={handleMobileMenuOpen}
          sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          PaperProps={{
            sx: {
              bgcolor: 'primary.main',
              color: 'white',
              minWidth: 200
            }
          }}
        >
          <MenuItem disabled>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              width: '100%'
            }}>
              <Box sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: botStatus === 'running' ? 'success.main' : 
                        botStatus === 'paused' ? 'warning.main' : 'grey.500'
              }} />
              <Typography>{botStatus.toUpperCase()}</Typography>
            </Box>
          </MenuItem>
          
          <MenuItem onClick={onStart} disabled={botStatus === 'running'}>
            <PlayArrow sx={{ mr: 1 }} />
            Start Bot
          </MenuItem>
          
          <MenuItem onClick={onPause} disabled={botStatus !== 'running'}>
            <Pause sx={{ mr: 1 }} />
            Pause
          </MenuItem>
          
          <MenuItem onClick={onStop} disabled={botStatus === 'idle'}>
            <Stop sx={{ mr: 1 }} />
            Stop
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};