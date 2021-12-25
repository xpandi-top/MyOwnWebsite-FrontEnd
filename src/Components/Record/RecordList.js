import React from "react";
import PropTypes from 'prop-types';
import {visuallyHidden } from '@mui/utils';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FormLabel from "@mui/material/FormLabel";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Box,
    Collapse, Grid,
    IconButton,Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from "@mui/material";
import styled from "@emotion/styled";

const useRowStyles = styled({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
function descendingComparator(a, b, orderBy) {
    let bb = orderBy==="duration"?duration(b["startTime"],b["endTime"]):b[orderBy];
    let aa =orderBy==="duration"?duration(a["startTime"],a["endTime"]):a[orderBy];

    if (bb < aa) {
        return -1;
    }
    if (bb > aa) {
        return 1;
    }
    return 0;
}
const duration = (date1, date2) => {
    let minutes = Date.parse(date2)-Date.parse(date1);
    return minutes/1000/60
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'gameName',
        numeric: false,
        disablePadding: true,
        label: 'Board Game',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'startTime',
        numeric: false,
        disablePadding: false,
        label: 'Start Time',
    },
    {
        id: 'duration',
        numeric: true,
        disablePadding: false,
        label: 'Duration (minute)',
    },
];
function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell/>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

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
                                    {row.players.map((playerRow) => (
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
        players: PropTypes.arrayOf(
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
    const records = props.records;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('startTime');
    const [filterBy, setFilterBy] = React.useState('');
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleFilterChange = (event) => {
      setFilterBy(event.target.value);
      console.log(filterBy);
    }
    
    const defaultProps = {
        options: [...new Set(props.records.map((option) => option.gameName))],
    };

    return(
        <Paper>
            <Grid container spacing={2}>
                <Grid item >
                    <FormControl fullWidth>
                        <FormLabel component="legend">Filter By Game Name</FormLabel>
                        <NativeSelect defaultValue={''}
                                      inputProps={{
                                          name: 'boardGameFilter',
                                          id: 'uncontrolled-native',
                                      }}
                                      onChange={handleFilterChange} aria-label={"Filter by"} >
                            <option value={''} key={"all"}> All records</option>
                            {defaultProps.options.map((opt)=>(
                                <option value={opt} key={opt}>{opt}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer>
                <Table stickyHeader={true} aria-label="collapsible table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(records,getComparator(order, orderBy))
                            .slice()
                            .filter(record=>(filterBy===''||record["gameName"]===filterBy))
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
                count={records.filter(record=>(filterBy===''||record["gameName"]===filterBy)).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    );

}
export default RecordList;