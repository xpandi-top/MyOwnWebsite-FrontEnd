import { useFormik } from 'formik';
import {useEffect, useState} from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {asyncGetGames} from "../services/services";
import GameList from "../components/games/GameList";
import GamesSort from "../components/games/GamesSort";
import GamesFilterSidebar from "../components/games/GamesFilterSidebar";

// ----------------------------------------------------------------------

export default function Games() {
  const [openFilter, setOpenFilter] = useState(false);

  const [games, setGames] = useState([]);

  useEffect(() => {
      asyncGetGames(setGames);
  }, [])

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Games">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Games
        </Typography>

        <GameList games={games} />
      </Container>
    </Page>
  );
}
