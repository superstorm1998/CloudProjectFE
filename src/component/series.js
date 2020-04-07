import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Backdrop,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import moment from "moment";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import SearchIcon from "@material-ui/icons/Search";
import { apiURL } from "../constant/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
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
      data: null,
      open: false,
      isOpen: false,
      seriesId: "",
      openTime: new Date(),
      closeTime: new Date(),
      preMoney: "",
      postMoney: "",
      msg: "",
      dataSearch: null,
      searchValue: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { companyId } = this.props;
    const proxyurl = apiURL.proxyUrl;
    let url = `${apiURL.baseUrl}/Series?companyID=${companyId}`;
    this.setState({ isOpen: true });
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "3000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    fetch(proxyurl + url)
      .then((response) => response.json())
      .then((data) => this.setState({ data: data, isOpen: false }))
      .catch(() => {
        this.setState({
          isOpen: false,
        });
        toastr.error(
          "There are some error had been happen. Please try in another time.",
          "Fail"
        );
      });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setStartDate = (date) => {
    this.setState({ openTime: date });
  };

  setEndDate = (date) => {
    this.setState({ closeTime: date });
  };

  handleSave = () => {
    const { companyId } = this.props;
    const { seriesId, openTime, closeTime, preMoney, postMoney } = this.state;
    if (preMoney < 0 || postMoney < 0 || preMoney >= postMoney) {
      this.setState({
        msg:
          "Please input preMoney > 0 , postMoney > 0 and postMoney > preMoney",
      });
    } else {
      const data = {
        id: seriesId,
        openTime: openTime,
        closeTime: closeTime,
        preMoney: preMoney,
        postMoney: postMoney,
        companyId: companyId,
      };
      const proxyurl = apiURL.proxyUrl;
      let url = `${apiURL.baseUrl}/Series`;
      this.setState({ isOpen: true });
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      fetch(proxyurl + url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ isOpen: false });
            this.getData();
            toastr.success("Create new series success", "Success");
          } else {
            this.setState({ isOpen: false });
            toastr.error("Create new series fail", "Fail");
          }
        })
        .catch(() => {
          this.setState({ isOpen: false });
          toastr.error(
            "There are some error had been happen. Please try in another time.",
            "Fail"
          );
        });
      this.setState({ open: false });
    }
  };

  handleSearch = (event) => {
    const { data } = this.state;
    const value = event.target.value;
    this.setState({
      searchValue: value,
      dataSearch:
        data &&
        data.filter(function (item) {
          return item.id.toLowerCase().includes(value.toLowerCase());
        }),
    });
  };

  render() {
    const gridItem = {
      padding: "0.5rem",
    };
    const {
      data,
      open,
      isOpen,
      closeTime,
      openTime,
      postMoney,
      preMoney,
      seriesId,
      msg,
      searchValue,
      dataSearch,
    } = this.state;
    return (
      <TableContainer component={Paper} style={{ maxHeight: "30rem" }}>
        <SimpleBackdrop open={isOpen} />
        <Grid
          container
          alignItems="center"
          style={{ padding: "0.5rem", border: "1px solid blue" }}
        >
          <Grid container item xs={10} alignItems="center">
            <Grid item xs={4} style={{ padding: "0 2rem" }}>
              <Typography variant="h5" color="primary">
                Series
              </Typography>
            </Grid>
            <Grid item xs={8} container justify="flex-end">
              <TextField
                label="Search"
                variant="outlined"
                margin="dense"
                onChange={this.handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" item xs={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={this.handleClickOpen}
            >
              Add
            </Button>
            <Dialog open={open} maxWidth="sm" fullWidth>
              <DialogTitle
                style={{ textAlign: "center", color: "blue", padding: "1rem" }}
              >
                Create Series
              </DialogTitle>
              <DialogContent>
                <Grid container justify="center">
                  <Grid
                    container
                    item
                    xs={10}
                    justify="center"
                    alignItems="center"
                    style={gridItem}
                  >
                    <Grid item xs={3}>
                      Series Id:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="seriesId"
                        variant="outlined"
                        label="Id"
                        size="small"
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    justify="center"
                    alignItems="center"
                    style={gridItem}
                  >
                    <Grid item xs={3}>
                      Open Time:
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        selected={this.state.openTime}
                        onChange={(date) => this.setStartDate(date)}
                        selectsStart
                        startDate={this.state.openTime}
                        endDate={this.state.closeTime}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    justify="center"
                    alignItems="center"
                    style={gridItem}
                  >
                    <Grid item xs={3}>
                      Close Time:
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        selected={this.state.closeTime}
                        onChange={(date) => this.setEndDate(date)}
                        selectsEnd
                        startDate={this.state.openTime}
                        endDate={this.state.closeTime}
                        minDate={this.state.openTime}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    justify="center"
                    alignItems="center"
                    style={gridItem}
                  >
                    <Grid item xs={3}>
                      Pre Money:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Pre Money"
                        size="small"
                        type="number"
                        onChange={this.handleChange}
                        name="preMoney"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    justify="center"
                    style={gridItem}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      Post Money:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Post Money"
                        size="small"
                        type="number"
                        onChange={this.handleChange}
                        name="postMoney"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              {seriesId === "" || preMoney === "" ? (
                <Grid container justify="center" style={{ color: "red" }}>
                  Please input seriesId, preMoney to the form.
                </Grid>
              ) : null}
              <Grid container justify="center" style={{ color: "red" }}>
                {msg}
              </Grid>
              <DialogActions>
                <Grid container justify="center" style={{ padding: "1rem" }}>
                  <Grid item xs={3} container justify="center">
                    <Button
                      onClick={this.handleClose}
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  {seriesId !== "" &&
                    openTime !== "" &&
                    closeTime !== "" &&
                    preMoney !== "" &&
                    postMoney !== "" && (
                      <Grid item xs={3} container justify="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleSave}
                        >
                          Add
                        </Button>
                      </Grid>
                    )}
                </Grid>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="center">Open Time</StyledTableCell>
              <StyledTableCell align="center">Close Time</StyledTableCell>
              <StyledTableCell align="center">Pre Money</StyledTableCell>
              <StyledTableCell align="center">Post Money</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchValue === "" ? (
              data &&
              data.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.openTime && moment(row.openTime).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.closeTime &&
                      moment(row.closeTime).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.preMoney}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.postMoney}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : dataSearch && dataSearch.length > 0 ? (
              dataSearch.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.openTime && moment(row.openTime).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.closeTime &&
                      moment(row.closeTime).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.preMoney}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.postMoney}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell align="left">
                  No record is matched.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
