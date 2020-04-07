import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import React from "react";
import Logo from "../../asset/logoCloud.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { apiURL } from "../../constant/constant";

const useStyles = (theme) => ({
  root: {
    backgroundImage: "-webkit-linear-gradient(left, #2fc96c, #13a1ee)",
    height: "100vh",
  },
  container: {
    position: "absolute",
    border: "1px solid black",
    padding: theme.spacing(5, 8, 5),
    backgroundColor: "#fffef5",
    marginTop: theme.spacing(9),
    borderRadius: "2rem",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(1, 8, 4),
    padding: theme.spacing(1, 6, 1),
  },
  remember: {
    margin: theme.spacing(0, 3.5, 1),
  },
  message: {
    marginTop: theme.spacing(3),
    color: "red",
  },
});

const backdropStyle = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function SimpleBackdrop(open) {
  const classes = backdropStyle();
  return (
    <Backdrop className={classes.backdrop} open={open.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      message: "",
      data: null,
      isOpen: false,
    };
  }

  handleLogin = (username, password) => {
    const proxyurl = apiURL.proxyUrl;
    let url = `${apiURL.baseUrl}/UserAccount?email=${username}&phone=${password}`;
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
    this.setState({ isOpen: true });
    fetch(proxyurl + url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          this.setState({ message: "", isOpen: false });
          this.props.history.push({ pathname: "/Home", state: { user: data } });
        } else {
          this.setState({
            message: "Your username or password is incorrect.",
            isOpen: false,
          });
        }
      })
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

  render() {
    const { classes } = this.props;
    const { username, password, error, message, isOpen } = this.state;

    return (
      <Grid container justify="center" className={classes.root}>
        <SimpleBackdrop open={isOpen} />
        <Container container="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar} src={Logo} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <Grid container spacing={3} alignItems="center">
                <Grid item sm={1}>
                  <AccountCircle />
                </Grid>
                <Grid item sm={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    label="UserName"
                    value={username}
                    autoComplete="true"
                    error={error}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                </Grid>
                <Grid item sm={1}>
                  <LockIcon />
                </Grid>
                <Grid item sm={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    label="Password"
                    type="password"
                    value={password}
                    error={error}
                    autoComplete="true"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container justify="center" className={classes.message}>
                {message}
              </Grid>
              <Grid className={classes.remember}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submit}
                  onClick={() => this.handleLogin(username, password)}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <Link href="#" variant="body1">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body1">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(LoginPage);
