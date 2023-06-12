import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { FormControlLabel, Grow, Paper, Switch } from '@mui/material';

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 1000, height: 1000 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme: Theme) => theme.palette.common.black,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 500, 500"
      />
    </Box>
  </Paper>
);


export function ExpandableBox() {
  const theme = useTheme();

  return (
    <><FormControlLabel
      control={<Switch checked={true}  />}
      label="Show" /><Box sx={{ display: 'flex' }}>

        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 5000 } : {})}
        >
          {icon}
        </Grow>
      </Box></>
  );
}

/* function App() {
  return (
    <div>
      <h1>Expandable Box Transition</h1>
      <ExpandableBox />
    </div>
  ); 
}
*/