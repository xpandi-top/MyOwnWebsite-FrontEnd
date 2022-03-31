import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import GameCard from './GameCard';

// ----------------------------------------------------------------------

GameList.propTypes = {
  games: PropTypes.array.isRequired
};

export default function GameList({ games, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {games.map((game) => (
        <Grid key={game.id} item xs={12} sm={6} md={3}>
          <GameCard product={game} />
        </Grid>
      ))}
    </Grid>
  );
}
