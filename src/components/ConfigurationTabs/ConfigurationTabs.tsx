// components/ConfigurationTabs.tsx
import { useState } from 'react';
import { Tabs, Tab, Box, TextField, MenuItem, FormControlLabel, Checkbox, Switch, Paper, Typography } from '@mui/material';
import { AccountCircle, Settings, Shield } from '@mui/icons-material';
import { BotConfig } from '../../styles/types';

interface ConfigTabsProps {
  config: BotConfig;
  setConfig: React.Dispatch<React.SetStateAction<BotConfig>>;
}

export const ConfigurationTabs = ({ config, setConfig }: ConfigTabsProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    
    <Paper sx={{ p: 2, height: '100%' }}>
      <Tabs value={tabIndex} onChange={(_, idx) => setTabIndex(idx)}>
        <Tab icon={<AccountCircle />} label="Account" />
        <Tab icon={<Settings />} label="Settings" />
        <Tab icon={<Shield />} label="Proxy" />
      </Tabs>

      {tabIndex === 0 && (
        <Box mt={2}>
          <TextField
            fullWidth
            label="BLS Email"
            value={config.credentials.email}
            onChange={(e) => setConfig(c => ({
              ...c,
              credentials: { 
                ...c.credentials, 
                email: e.target.value 
              }
            }))} margin="normal" />
          <TextField
            fullWidth
            label="BLS Password"
            type="password"
            value={config.credentials.password}
            onChange={e => setConfig(c => ({ 
              ...c, credentials: { ...c.credentials, 
                password: e.target.value } 
              }))} margin="normal" />
          
          <TextField
            fullWidth
            label="Notification Email"
            value={config.notification.email}
            onChange={e => setConfig(c => ({ 
              ...c, notification: { ...c.notification, 
                email: e.target.value 
              } 
            }))} margin="normal" />
          
          <TextField
            fullWidth
            label="WhatsApp Number"
            value={config.notification.whatsapp}
            InputProps={{ startAdornment: <Box sx={{ p: 1 }}>+212</Box> }}
            margin="normal"
          />
        </Box>
      )}

      {tabIndex === 1 && (
        <Box mt={2}>
          <TextField
            fullWidth
            select
            label="Location"
            value={config.appointment.location}
            onChange={e => setConfig(c => ({ 
              ...c, appointment: { ...c.appointment, 
                location: e.target.value 
              } 
            }))} margin="normal">
           
            <MenuItem value="Rabat">Rabat</MenuItem>
          </TextField>
          
          <TextField
            fullWidth
            select
            label="Visa Type"
            value={config.appointment.visaType}
            onChange={e => setConfig(c => ({ ...c, appointment: { ...c.appointment, 
              visaType: e.target.value 
            } }))} margin="normal">
          
            <MenuItem value="Long Stay Visa">Long Stay Visa</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Visa Sub Type"
            value={config.appointment.visaSubType}
            onChange={e => setConfig(c => ({ ...c, appointment: { ...c.appointment, 
              visaSubType: e.target.value 
           } }))} margin="normal">

            {['JOB SEARCH', 'Work','Long Stay Visa D3','Visa National','Employment Visa',
             'Studies','Any other category of Long-Stay visa'].map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>

          <Box mt={2}>
            <Typography variant="subtitle2">Appointment Categories</Typography>
            {['Normal', 'Premium', 'Prime Time'].map(cat => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={config.appointment.categories.includes(cat)}
                    onChange={e => setConfig(c => ({
                      ...c,
                      appointment: {
                        ...c.appointment,
                        categories: e.target.checked
                          ? [...c.appointment.categories, cat]
                          : c.appointment.categories.filter(current => current !== cat)
                      }
                    }))}
                  />
                }
                label={cat}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            label="Retry Interval (seconds)"
            type="number"
            value={config.appointment.retryInterval}
            onChange={e => setConfig(c => ({
              ...c,appointment: { 
                ...c.appointment,retryInterval: 
                Number(e.target.value) 
              }
            }))} margin="normal" />
        
        </Box>
      )}

      {tabIndex === 2 && (
        <Box mt={2}>
          <FormControlLabel
            control={
              <Switch
                checked={config.proxy.enable}
                onChange={e => setConfig(c => ({ ...c, proxy: { ...c.proxy, enable: e.target.checked } }))}
              />
            }
            label="Enable Proxy Rotation"
          />

          {config.proxy.enable && (
            <>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Proxy List"
                placeholder="ip:port:username:password"
                value={config.proxy.list.join('\n')}
                onChange={e => setConfig(c => ({
                  ...c,
                  proxy: { ...c.proxy, list: e.target.value.split('\n') }
                }))}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Rotation Interval (minutes)"
                type="number"
                value={config.proxy.rotationInterval}
                onChange={e => setConfig(c => ({
                  ...c,
                  proxy: { ...c.proxy, rotationInterval: Number(e.target.value) }
                }))}
                margin="normal"
              />
            </>
          )}

          <FormControlLabel
            control={
              <Switch
                checked={config.captcha.enable}
                onChange={e => setConfig(c => ({ ...c, captcha: { ...c.captcha, enable: e.target.checked } }))}
              />
            }
            label="Enable Captcha Solver"
          />

          {config.captcha.enable && (
            <TextField
              fullWidth
              label="Captcha API Key"
              value={config.captcha.apiKey}
              onChange={e => setConfig(c => ({ ...c, captcha: { ...c.captcha, apiKey: e.target.value } }))}
              margin="normal"
            />
          )}
        </Box>
      )}
    </Paper>
  );
};