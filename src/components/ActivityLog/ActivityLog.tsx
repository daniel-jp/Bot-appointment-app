// components/ActivityLog.tsx
import { Box, Typography, IconButton, Alert, CircularProgress, Snackbar, Paper, Button } from '@mui/material';
import { Delete, CheckCircle, Warning, Error, Info } from '@mui/icons-material';
import { LogEntry, AppointmentDetails } from '../../styles/types';
import { useState } from 'react';

interface ActivityLogProps {
  logs: LogEntry[];
  status: {
    connection: boolean;
    login: boolean;
    formAccess: boolean;
    booking: boolean;
  };
  appointment?: AppointmentDetails;
  onClear: () => void;
  onConfirm: () => void;
  onSkip: () => void;
}

export const ActivityLog = ({ 
  logs, 
  status, 
  appointment, 
  onClear, 
  onConfirm, 
  onSkip 
}: ActivityLogProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <Paper sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Bot Activity</Typography>
        <IconButton onClick={onClear} color="inherit">
          <Delete />
        </IconButton>
      </Box>

      <Box flex={1} overflow="auto">
        {logs.map((log, i) => (
          <Alert
            key={i}
            severity={log.type}
            sx={{ mb: 1 }}
            iconMapping={{
              info: <Info fontSize="small" />,
              success: <CheckCircle fontSize="small" />,
              warning: <Warning fontSize="small" />,
              error: <Error fontSize="small" />
            }}
          >
            <Typography variant="body2">
              [{log.timestamp}] {log.message}
            </Typography>
          </Alert>
        ))}
      </Box>

      {appointment && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <Typography variant="h6">Appointment Found!</Typography>
          <Typography>
            {appointment.category} slot available on {appointment.date} at {appointment.time}
          </Typography>
          <Box mt={1} display="flex" gap={1}>
            <Button 
              variant="contained" 
              color="success"
              onClick={() => {
                onConfirm();
                setOpenConfirm(true);
              }}>
              Confirm Booking
            </Button>
            <Button 
              variant="outlined" 
              color="inherit"
              onClick={onSkip}>
              Skip & Continue
            </Button>
          </Box>
        </Alert>
      )}

      <Snackbar
        open={openConfirm}
        autoHideDuration={6000}
        onClose={() => setOpenConfirm(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success">
          <Typography variant="h6">Booking Confirmed!</Typography>
          <Typography>Confirmation details sent to your email</Typography>
        </Alert>
      </Snackbar>

      <Box mt={2} pt={2} borderTop={1} borderColor="divider">
        <Typography variant="subtitle1" mb={1}>Connection Status</Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))" gap={2}>
          {Object.entries(status).map(([key, active]) => (
            <Box key={key} display="flex" alignItems="center">
              <CircularProgress 
                size={20} 
                color={active ? 'success' : 'inherit'}
                variant={active ? 'indeterminate' : 'determinate'}
                value={100}
              />
              <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{key}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};