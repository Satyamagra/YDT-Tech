import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Card, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import { Link } from "react-router-dom";
import LocalStorage from "../LocalStore/LocalStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      Dataitem: "",
      progress: false,
    };
    this.handleChangeFields = this.handleChangeFields.bind(this);
  }
  
  handleChangeFields = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };
  validate = () => {
    //alert("hi2")
    //alert(this.state.email+" "+this.state.password)
    let isError = false;
    const errors = { emailError: "", passwordError: "" };
    if (!this.state.email.includes("@")) {
      isError = true;
      errors.emailError = "Please fill the correct E-mail address";
    }else if(!this.state.email.includes(".com"))
    {
        isError = true;
      errors.emailError = "Please fill the correct E-mail address";
    }
    if (this.state.password.length <=5) {
      // alert(this.state.password.length+"hello")
      isError = true;
      errors.passwordError = "Please fill Correct Password";
    }
    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };
  sendData(ev) {
    const error = this.validate();
    if (!error) {
      //alert("Hello")
      let email = this.state.email;
      let password = this.state.password;
      const data = { email, password };
      this.setState({ progress: true });
      Axios.post("http://localhost:4000/login", data)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.length === 0) {
              this.setState({
                progress: false,
              });
              toast.error("🦄 Invalid Credencial", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              let user = response.data;
              this.setState({
                Dataitem: response.data,
                progress: false,
              });

              toast.success("🦄 Login Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              LocalStorage.setUser(user);

              this.props.history.push("/dashboard");
            }
          }
        })
        .catch((err) => {
          this.setState({ progress: false });
          toast.error("🦄 Something Wrong", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(err);
        });
    }
    //this.blank()
    //window.location = "HomePage";
  }

  render() {
    return (
      <div
        style={{
          height: "50em",
          width: "100%",
          backgroundSize: "cover",
          backgroundImage: "url(/login6.jpg)",
        }}
      >
        <ToastContainer></ToastContainer>
        <div style={{ height: "3em", width: "100%" }}>
        </div>
        <div className="vertical-center">
          <Container component="main" maxWidth="sm" spacing={2}>
            <Card
              boxShadow={4}
              style={{
                opacity: "0.8",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <center>
                <LockOutlinedIcon />
                <Typography
                  component="h6"
                  variant="h5"
                  style={{ fontSize: "1.8rem" }}
                >
                  Sign in
                </Typography>
                <Container maxWidth="xs">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={this.state.emailError}
                        helperText={this.state.emailError}
                        onChange={this.handleChangeFields}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={this.state.passwordError}
                        helperText={this.state.passwordError}
                        onChange={this.handleChangeFields.bind(this)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        style={{
                          marginBottom: "1em",
                          marginTop: "1em",
                          backgroundColor: "navy",
                          color: "white",
                        }}
                        onClick={this.sendData.bind(this)}
                        type="submit"
                        fullWidth
                        variant="contained"
                      >
                        Sign In
                      </Button>
                      {this.state.progress ? (
                    <div>
                      <CircularProgress color="secondary" />
                    </div>
                  ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Link
                        to="/Registration"
                        variant="body2"
                        style={{ color: "black" }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                    
                  </Grid>
                </Container>
              </center>
            </Card>
          </Container>
        </div>
      </div>
    );
  }
}
export default Login;
