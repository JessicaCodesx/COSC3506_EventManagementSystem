import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';

interface CardProps {
  /** The text to display inside the button */
  title: string;
  description: string;
  date: string;
  location: string;
  registerClicked: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MediaCard({ title, description, location, date, registerClicked }: CardProps) {
  return (
    <Card sx={{ width: 400, p : 2   }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>

        <Box component="section" sx={{ pt: 2, display: 'flex' }}>
          <PlaceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {location}
          </Typography>
        </Box>

        <Box component="section" sx={{ pt: 2, display: 'flex' }}>
          <EventIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {date}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={registerClicked}>Register</Button>
      </CardActions>
    </Card>
  );
}