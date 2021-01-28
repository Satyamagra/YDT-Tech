import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CircularProgress } from "@material-ui/core";
import Axios from "axios";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      fullnameError: "",
      Email: "",
      EmailError: "",
      password: "",
      passwordError: "",
      phone: "",
      phoneError: "",
      alertSuccess: false,
      alertWarning: false,
      progress: false,
    };
  }
  changeField = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
   
    
  };
  validate = () => {
    let isError = false;
    this.setState({
      fullnameError: "",
      EmailError: "",
      passwordError: "",
      phoneError: "",
    });
    const errors = {
      fullnameError: "",
      EmailError: "",
      passwordError: "",
      phoneError: "",
    };

    if (this.state.fullname.length < 1) {
      isError = true;
      errors.fullnameError = "Please filled the empty box";
    } else if (this.state.fullname.length < 6) {
      isError = true;
      errors.fullnameError = "Please enter the full name!";
    }
    if (!this.state.Email.includes("@") ) {
      isError = true;
      errors.EmailError = "Please include '@'.";
    }else if(!this.state.Email.includes(".com")){
        isError = true;
      errors.EmailError = "Please include '.com'.";
    }
    if (this.state.password.length <= 5) {
      isError = true;
      errors.passwordError =
        "Your password must contain between 4 and 20 characters.";
    }
    if (this.state.phone.length < 10 || this.state.phone.length > 10) {
      isError = true;
      errors.phoneError = "Please enter a valid number!";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  sendData(ev) {
    //ev.preventDefalut();
    const error = this.validate();
    if (!error) {
      
      const fullname = this.state.fullname;
      const Email = this.state.Email;
      const password = this.state.password;
      const phone = this.state.phone;
      const data = {
        fullname,
        Email,
        phone,
        password,
      };
      this.setState({ progress: true });
      Axios.get("http://localhost:4000/register", { params: data })
        .then((response) => {

          if (response.status === 200) {
            this.setState({
              progress: false,
              fullname: "",
              password: "",
              Email: "",
              phone: "",
            });
            toast.success("🦄 Registered Successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          this.setState({
            progress: false,
          });
      
          toast.error("🦄 Something Wrong", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
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
                  Sign up
                </Typography>
                <Container maxWidth="xs">
                <div></div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="fullname"
                    error={this.state.fullnameError}
                    helperText={this.state.fullnameError}
                    autoComplete="fullname"
                    color="primary"
                    type="fullname"
                    value={this.state.fullname}
                    onChange={this.changeField.bind(this)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="Email"
                    error={this.state.EmailError}
                    helperText={this.state.EmailError}
                    value={this.state.Email}
                    onChange={this.changeField.bind(this)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="phone"
                    label="Mobile Number"
                    name="phone"
                    error={this.state.phoneError}
                    helperText={this.state.phoneError}
                    value={this.state.phone}
                    onChange={this.changeField.bind(this)}
                  />
                  <TextField
                    variant="outlined"
                    type="password"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    error={this.state.passwordError}
                    helperText={this.state.passwordError}
                    value={this.state.password}
                    onChange={this.changeField.bind(this)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    className="set"
                    variant="contained"
                    color="primary"
                    style={{
                      marginBottom: "1em",
                    }}
                    onClick={this.sendData.bind(this)}
                  >
                    SUBMIT
                  </Button>
                  {this.state.progress ? (
                    <div>
                      <CircularProgress color="secondary" />
                    </div>
                  ) : null}
                  <Grid item xs={12}>
                    <Link to="/" variant="body2" style={{ color: "black" }}>
                      {"Back to Login"}
                    </Link>
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

export default Register;
