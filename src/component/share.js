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
  TextField,
  DialogContent,
  DialogTitle,
  Dialog,
  Backdrop,
  CircularProgress,
  Typography,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import SearchIcon from "@material-ui/icons/Search";

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
      isOpen: false,
      open: false,
      shareHolderType: null,
      status: "Active",
      type: "CFD",
      Id: "",
      totalShare: "",
      UserId: "",
      msg: "",
      dataSearch: null,
      searchValue: "",
    };
  }

  componentDidMount() {
    this.getData();
    this.getShareType();
  }

  getData = async () => {
    const { companyId } = this.props;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://stockymanager.azurewebsites.net/api/Shareholder?companyID=${companyId}`;
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
    await fetch(proxyurl + url)
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

  getShareType = async () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = "https://stockymanager.azurewebsites.net/api/ShareholderType";
    this.setState({ isOpen: true });

    await fetch(proxyurl + url)
      .then((response) => response.json())
      .then((data) => this.setState({ shareHolderType: data, isOpen: false }))
      .catch(() => this.setState({ isOpen: false }));
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

  handleChangeStatus = (event) => {
    this.setState({ status: event.target.value });
  };

  handleChangeType = (event) => {
    this.setState({ type: event.target.value });
  };

  handleSave = () => {
    const { Id, totalShare, UserId, status, type } = this.state;
    if (totalShare < 0) {
      this.setState({
        msg: "Please input total share > 0 ",
      });
    } else {
      const data = {
        id: Id,
        totalShares: parseInt(totalShare),
        status: status,
        userId: UserId,
        shareholderTypeId: type,
        companyId: "CPN001",
      };
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      let url = "https://stockymanager.azurewebsites.net/api/Shareholder";
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
            this.getData();
            toastr.success("Create new series success", "Success");
          } else {
            this.setState({ isOpen: false });
            toastr.error("Create new series fail", "Fail");
          }
        })
        .catch(() => {
          this.setState({ isOpen: false });

          toastr.error("Create new series fail", "Fail");
        });
      this.setState({ open: false });
    }
  };

  handleCloseSnackbar = () => {
    this.setState({ openToast: false });
  };

  handleSearch = (event) => {
    const { data } = this.state;
    const value = event.target.value;
    this.setState({
      searchValue: value,
      dataSearch: data && data.filter((item) => (item = value)),
    });
  };

  render() {
    const {
      data,
      isOpen,
      open,
      status,
      type,
      shareHolderType,
      msg,
      Id,
      totalShare,
      UserId,
      dataSearch,
      searchValue,
    } = this.state;
    const gridItem = {
      padding: "0.5rem",
    };
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
                ShareHolder
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
                Add ShareHolder
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
                      ShareHolder Id:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="Id"
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
                      Total Shares:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Total share"
                        size="small"
                        type="number"
                        onChange={this.handleChange}
                        name="totalShare"
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
                      Status:
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        variant="outlined"
                        style={{ width: " -webkit-fill-available" }}
                      >
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={status}
                          inputProps={{ style: { padding: "0.6rem" } }}
                          onChange={this.handleChangeStatus}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Negative">Negative</MenuItem>
                        </Select>
                      </FormControl>
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
                      User Id:
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="UserId"
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
                    style={gridItem}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      ShareHolder Type:
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        variant="outlined"
                        style={{ width: " -webkit-fill-available" }}
                      >
                        <Select
                          fullWidth
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={type}
                          inputProps={{ style: { padding: "0.6rem" } }}
                          onChange={this.handleChangeType}
                        >
                          {shareHolderType &&
                            shareHolderType.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.id}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              {Id === "" || totalShare !== "" || UserId !== "" ? (
                <Grid container justify="center" style={{ color: "red" }}>
                  Please input all in the form.
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
                  {Id !== "" && totalShare !== "" && UserId !== "" && (
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
              <StyledTableCell align="center">Total Shares</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">User Id</StyledTableCell>
              <StyledTableCell align="center">
                Shareholder TypeId
              </StyledTableCell>
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
                    {row.totalShares}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">{row.userId}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.shareholderTypeId}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : dataSearch && dataSearch ? (
              dataSearch.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.totalShares}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">{row.userId}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.shareholderTypeId}
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
