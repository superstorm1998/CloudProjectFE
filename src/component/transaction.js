import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import moment from "moment";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {}
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

function SimpleBackdrop(open) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      transactions: null,
      isOpen: false
    };
  }

  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = "https://stockymanager.azurewebsites.net/api/Transaction";
    this.setState({ isOpen: true });
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(data => this.setState({ transactions: data, isOpen: false }))
      .catch(() => this.setState({ isOpen: false }));
  }

  render() {
    const { transactions, isOpen } = this.state;
    return (
      <TableContainer component={Paper} style={{ maxHeight: "30rem" }}>
        <SimpleBackdrop open={isOpen} />
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="center">Transaction Time</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Shares Quantity</StyledTableCell>
              <StyledTableCell align="center">Time Approve</StyledTableCell>
              <StyledTableCell align="center">Series Id</StyledTableCell>
              <StyledTableCell align="center">
                Transaction TypeId
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.transactionTime}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.sharesQuantity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.timeApprove &&
                      moment(row.timeApprove).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.seriesId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.transactionTypeId}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
