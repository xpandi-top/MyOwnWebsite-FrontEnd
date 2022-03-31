import {Link as RouterLink} from 'react-router-dom';
// material
import {Button, Container, Grid, Stack, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
//
import {asyncGetRecords} from "../services/services";
import {useEffect, useState} from "react";
import RecordCard from "../components/records/RecordCard";
import RecordsSort from "../components/records/RecordsSort";
import RecordsSearch from "../components/records/RecordsSearch";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Records() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    asyncGetRecords(setRecords);
  })

  return (
    <Page title="Records">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Records
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Record
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {records.map((record, index) => (
            <RecordCard key={record.recordId} record={record} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
