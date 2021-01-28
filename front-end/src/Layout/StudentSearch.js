import { Button, Container, TextField } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import {ToastContainer, toast } from "react-toastify";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

class StudentSearch extends Component {
  constructor() {
    super();
    this.state = {
      stuRoll: "",
      Dataitem: [],
      isLoaded:false,
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
      stuRollError: "",
    });
    const errors = {
      stuRollError: "",
    };

    if (this.state.stuRoll.length < 1) {
      isError = true;
      errors.stuRollError = "Please Enter the Roll Number.";
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
      const stuRoll = this.state.stuRoll;
      const data = {
        stuRoll
      };
      console.log(stuRoll + "hello everyone");
      axios.get("http://localhost:4000/stusearch", {params:data})
        .then((response) => {
          if (response.status === 200) {
            if (response.data.length === 0) {
             
              this.setState({
                isLoaded:true,
                Dataitem: response.data,
              });
              toast.error("🦄 Not Found", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              this.setState({
                isLoaded:true,
                Dataitem: response.data,
              });
              toast.success("🦄 Result Succesfully found", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

            }
          }
        })
        .catch((err) => {
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
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    return (
      <div>
        <ToastContainer></ToastContainer>
        <center>
          <div>
            <Container maxWidth="sm" spacing={2}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="stuRoll"
                label="Student Roll Number"
                name="stuRoll"
                error={this.state.stuRollError}
                helperText={this.state.stuRollError}
                autoComplete="stuSearch"
                color="primary"
                type="stuRoll"
                value={this.state.stuRoll}
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
                Search
              </Button>
            </Container>
          </div>

          
        </center>
        <br></br>
        <div>
            <Container maxWidth="md" spacing={2}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Student_ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Student_Roll
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Student_Name
                    </StyledTableCell>
                    <StyledTableCell align="right">Student_Age</StyledTableCell>
                    <StyledTableCell align="right">
                      Student_Class
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Student_DOB
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.Dataitem.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row._id}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                          >
                        {row.Student_Roll}
                      </StyledTableCell>

                      <StyledTableCell
            
                        align="right"
                      >
                        {row.Student_Name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Student_Age}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Student_Class}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Student_DOB}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>               </Table>
            </TableContainer>
            </Container>
          </div>
      </div>
    );
  }
}

export default StudentSearch;
