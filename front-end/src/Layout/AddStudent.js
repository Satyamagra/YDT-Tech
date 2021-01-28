import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Card } from "@material-ui/core";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      stuRoll: "",
      stuName: "",
      stuAge: "",
      stuClass: "",
      stuDate: "",
      stuRollError: "",
      stuNameError: "",
      stuAgeError: "",
      stuClassError: "",

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
      stuAgeError: "",
      stuNameError: "",
      stuAgeError: "",
      stuClassError: "",
    });
    const errors = {
      stuAgeError: "",
      stuNameError: "",
      stuAgeError: "",
      stuClassError: "",
    };

    if (this.state.stuRoll.length < 1) {
      isError = true;
      errors.stuRollError = "Please Enter the Roll Number.";
    }
    if (this.state.stuName.length < 4) {
      isError = true;
      errors.stuNameError = "Please fill Student Name Correctly.";
    }
    console.log(this.state.stuAge === Number);
    if (this.state.stuAge.length < 0 || this.state.stuAge.length > 2) {
      isError = true;
      errors.stuAgeError = "Please fill 21-99.";
    }
    if (this.state.stuClass.length < 0 || this.state.stuClass.length > 2) {
      isError = true;
      errors.stuClassError = "Please fill 100-9999.";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };
  handleChange(value, e) {
    console.log(value); // this will be a moment date object
    console.log(e.target.value); // this will be a string value in datepicker input field
  }

  sendData(ev) {
    //ev.preventDefalut();
    console.log(this.state.stuDate);
    const error = this.validate();
    if (!error) {
      const stuRoll = this.state.stuRoll;
      const stuName = this.state.stuName;
      const stuAge = this.state.stuAge;
      const stuClass = this.state.stuClass;
      const stuDate = this.state.stuDate;
      const data = {
        stuRoll,
        stuName,
        stuAge,
        stuClass,
        stuDate,
      };
      console.log(stuDate);
      this.setState({ progress: true });
      Axios.get("http://localhost:4000/addstudent", { params: data })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              progress: false,
              stuName: "",
              stuAge: "",
              stuClass: "",
              empPhone: "",
            });
            toast.success("🦄 Add Successfully", {
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
          toast.error("🦄Please Check ", {
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
      <div>
        {/* <Dashboard></Dashboard>  */}
        <ToastContainer></ToastContainer>
        <br></br>
        <br></br>
        <center>
          <Container maxWidth="sm" spacing={2}>
            <Card Box boxShadow={4}>
              <Typography variant="h5" style={{ paddingTop: "20px" }}>
                ADD STUDENTS DETAILS
              </Typography>

              <Container maxWidth="xs" spacing={2}>
                <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="stuRoll"
                    label="Student Roll Number"
                    name="stuRoll"
                    error={this.state.stuRollError}
                    helperText={this.state.stuRollError}
                    autoComplete="stuRoll"
                    color="primary"
                    type="stuRoll"
                    value={this.state.stuRoll}
                    onChange={this.changeField.bind(this)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="stuName"
                    label="Student Name"
                    name="stuName"
                    error={this.state.stuNameError}
                    helperText={this.state.stuNameError}
                    autoComplete="stuName"
                    color="primary"
                    type="stuName"
                    value={this.state.stuName}
                    onChange={this.changeField.bind(this)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="stuAge"
                    label="Student Age"
                    name="stuAge"
                    error={this.state.stuAgeError}
                    helperText={this.state.stuAgeError}
                    autoComplete="stuName"
                    color="primary"
                    type="stuAge"
                    value={this.state.stuAge}
                    onChange={this.changeField.bind(this)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="stuClass"
                    label="Student Class"
                    name="stuClass"
                    error={this.state.stuClassError}
                    helperText={this.state.stuClassError}
                    autoComplete="stuClass"
                    color="primary"
                    type="stuClass"
                    value={this.state.stuClass}
                    onChange={this.changeField.bind(this)}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="date"
                    label="DOB"
                    type="date"
                    defaultValue="2017-05-24"
                    name="stuDate"
                    value={this.state.stuDate}
                    onChange={this.changeField.bind(this)}
                  />
                  <Button
                    style={{ backgroundColor: "green" }}
                    type="submit"
                    fullWidth
                    className="set"
                    variant="contained"
                    color="primary"
                    /*  className="marT14" */
                    onClick={this.sendData.bind(this)}
                  >
                    {" "}
                    Add Student
                  </Button>
                  <br />
                  <br />
                </div>
                {this.state.progress ? (
                  <div>
                    <CircularProgress color="secondary" />
                  </div>
                ) : null}
              </Container>
            </Card>
          </Container>
        </center>
      </div>
    );
  }
}
