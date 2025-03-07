// pages/VisaBotDashboard.tsx
import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Header } from '../components/Header/Header';
import { ConfigurationTabs } from '../components/ConfigurationTabs/ConfigurationTabs';
import { ActivityLog } from '../components/ActivityLog/ActivityLog';
import { BotConfig, LogEntry, AppointmentDetails } from '../styles/types';

const initialConfig: BotConfig = {
  credentials: {
    email: 'danieljoaquimpaulinop@gmail.com',
    password: '',
  },
  notification: {
    email: 'danieljoaquimpaulinop@gmail.com',
    whatsapp: '657226746',
  },
  appointment: {
    location: 'Rabat',
    visaType: 'Long Stay Visa',
    visaSubType: 'JOB SEARCH',
    categories: ['Normal', 'Premium', 'Prime Time'],
    retryInterval: 30,
  },
  proxy: {
    enable: true,
    list: [],
    rotationInterval: 30,
  },
  captcha: {
    enable: true,
    apiKey: '',
  },
};

export const VisaBotDashboard = () => {
  const [config, setConfig] = useState<BotConfig>(initialConfig);
  const [botStatus, setBotStatus] = useState<'idle' | 'running' | 'paused' | 'error'>('idle');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [appointment, setAppointment] = useState<AppointmentDetails | undefined>();
  const [connectionStatus, setConnectionStatus] = useState({
    connection: false,
    login: false,
    formAccess: false,
    booking: false,
  });
  const [attempts, setAttempts] = useState(0);
  const [currentProxy, setCurrentProxy] = useState('');

  const addLog = (message: string, type: LogEntry['type']) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }]);
  };

  // Simulate proxy rotation
  const rotateProxy = () => {
    if (config.proxy.enable && config.proxy.list.length > 0) {
      const proxies = config.proxy.list;
      const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
      setCurrentProxy(randomProxy);
      addLog(`Rotated to proxy: ${randomProxy}`, 'info');
    }
  };

  // Simulate connection process
  const simulateConnection = async () => {
    if (currentProxy) {
      addLog(`Using proxy: ${currentProxy} to connect...`, 'info');
    }
    setConnectionStatus({
      connection: true,
      login: false,
      formAccess: false,
      booking: false,
    });
    addLog('Connecting to BLS portal...', 'info');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnectionStatus(s => ({ ...s, login: true }));
    addLog('Logging in to BLS account...', 'info');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnectionStatus(s => ({ ...s, formAccess: true }));
    addLog('Accessing appointment form...', 'info');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConnectionStatus(s => ({ ...s, booking: true }));
  };

  // Main bot operation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let isMounted = true;

    const runBot = async () => {
      try {
        await simulateConnection();
        rotateProxy();

        interval = setInterval(async () => {
          if (!isMounted) return;

          setAttempts(prev => prev + 1);
          addLog(`Checking appointments (Attempt #${attempts + 1})...`, 'info');
          
          if (Math.random() < 0.1) {
            const details = {
              date: new Date(Date.now() + 86400000 * Math.floor(Math.random() * 60))
                .toLocaleDateString(),
              time: `${Math.floor(Math.random() * 12 + 1)}:${Math.random() < 0.5 ? '0' : '30'} PM`,
              category: config.appointment.categories[
                Math.floor(Math.random() * config.appointment.categories.length)
              ],
              confirmed: false,
            };
            setAppointment(details);
            setBotStatus('paused');
            addLog(`Appointment found! ${details.category} slot on ${details.date} at ${details.time}`, 'success');
          }
        }, config.appointment.retryInterval * 1000);

      } catch (error) {
        addLog('Connection failed. Retrying...', 'error');
        setBotStatus('error');
        setTimeout(() => setBotStatus('running'), 5000);
      }
    };

    if (botStatus === 'running') {
      runBot();
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
      setConnectionStatus({
        connection: false,
        login: false,
        formAccess: false,
        booking: false,
      });
    };
  }, [botStatus, config.appointment.retryInterval, attempts]);

  const handleConfirm = async () => {
    addLog('Confirming appointment...', 'info');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addLog(`Confirmation sent to ${config.notification.email}`, 'success');
    setAppointment(undefined);
    setBotStatus('running');
  };

  const handleSkip = () => {
    addLog('Skipping appointment...', 'warning');
    setAppointment(undefined);
    setBotStatus('running');
  };

  const handleStart = () => {
    if (!config.credentials.email || !config.credentials.password) {
      addLog('Missing BLS credentials', 'error');
      return;
    }
    setBotStatus('running');
  };

  const handleStop = () => {
    setBotStatus('idle');
    setAttempts(0);
    setAppointment(undefined);
    addLog('Bot stopped', 'info');
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header
            botStatus={botStatus}
            onStart={handleStart}
            onPause={() => setBotStatus('paused')}
            onStop={handleStop}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ConfigurationTabs config={config} setConfig={setConfig} />
        </Grid>

        <Grid item xs={12} md={8}>
          <ActivityLog
            logs={logs}
            status={connectionStatus}
            appointment={appointment}
            onClear={() => setLogs([])}
            onConfirm={handleConfirm}
            onSkip={handleSkip}
          />
        </Grid>
      </Grid>
    </Box>
  );
};