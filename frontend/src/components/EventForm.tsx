import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

function Component() {
  const [role, setRole] = useState('user');

  return (
    <>
        <Box component="section" sx={{ p: 5, bgcolor: 'white', borderRadius: 2 }} >
            <Stack spacing={2}>
                <TextField
                    required
                    id="standard-required"
                    label="Event Name"
                    placeholder="Event Name"
                    variant="standard"
                />

                <TextField
                    required
                    id="standard-required"
                    label="Event Date"
                    variant="standard"
                    type="date"
                    slotProps={{ inputLabel: { shrink: true } }}
                />

                <TextField
                    required
                    id="standard-required"
                    label="Description"
                    placeholder="What is this event about"
                    variant="standard"
                />

                <TextField
                    required
                    id="standard-required"
                    label="Location"
                    defaultValue="Toronto"
                    variant="standard"
                />
            </Stack>
        </Box>
    </>
  )
}

export default Component
