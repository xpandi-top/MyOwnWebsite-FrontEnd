import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import Button from "@mui/material/Button";
import Divider from "@material-ui/core/Divider";
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const duration = (date1, date2) => {
      let minutes = Date.parse(date2)-Date.parse(date1);
      return minutes/1000/60
    }
    return (
        <React.Fragment>
            <TableRow hover className={classes.root} role="checkbox" tabIndex={-1}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.gameName}
                </TableCell>
                <TableCell align="left" >{row.description}</TableCell>
                <TableCell align="left" >
                    {row.startTime.replace('T',", ")}
                </TableCell>
                <TableCell align="left">
                    {duration(row.startTime,row.endTime)}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Players and Scores
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Player</TableCell>
                                        <TableCell>Score</TableCell>
                                        <TableCell align="left">Notes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.numPlayers.map((playerRow) => (
                                        <TableRow key={playerRow.player}>
                                            <TableCell component="th" scope="row">
                                                {playerRow.player}
                                            </TableCell>
                                            <TableCell>{playerRow.score}</TableCell>
                                            <TableCell align="left">{playerRow.notes}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        gameName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        numPlayers: PropTypes.arrayOf(
            PropTypes.shape({
                player: PropTypes.string.isRequired,
                score: PropTypes.number.isRequired,
                notes: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};
function RecordList(props) {
    console.log("In RecordList!!!");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const defaultProps = {
        options: [...new Set(props.records.map((option) => option.gameName))],
    };
    return(
        <Paper>
            <Grid container>
                <Grid item>
                    <Autocomplete
                        {...defaultProps}
                        id="combo-box-demo"
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Filter By GameName" variant="standard"/>}
                    />
                </Grid>
                <Grid item>
                    <Button>
                        Apply
                    </Button>
                </Grid>
                <Grid item>
                    <Button>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            <Divider/>
            <TableContainer>
                <Table stickyHeader={true} aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>BoardGame</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Start Time</TableCell>
                            <TableCell align="left">Duration(minutes)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.records
                            .slice()
                            .reverse()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                            <Row key={row.recordId} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 15, 100]}
                component="div"
                count={props.records.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    );

}
export default RecordList;