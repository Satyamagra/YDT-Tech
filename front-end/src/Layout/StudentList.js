import { CircularProgress, Container } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      Dataitem: [],
      idData: [],
      progess: true,
      Studentdata: [],
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentWillMount() {
    axios
      .get("http://localhost:4000/student/fetch", {})
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length === 0) {
            this.setState({
              isLoaded: false,
              progress: false,
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
              isLoaded: true,
              Dataitem: response.data,
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
        //   window.alert(err)
      });
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true,
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
    });
  }

  handleData = (value) => {
    let data = this.state.Dataitem;
    let data1 = data[value];
    console.log(data1);
    this.setState({ openDialog: true, Studentdata: data[value] });
    console.log(this.state.Studentdata);
  };
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

    var { isLoaded, Dataitem } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <ToastContainer></ToastContainer>
          <center>
            <h5>Data Loading</h5>
            <CircularProgress></CircularProgress>
          </center>
        </div>
      );
    } else {
      return (
        <div marginBottom="10px">
          <br></br>
          <Container maxWidth="md">
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
                  {Dataitem.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row._id}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={this.handleData.bind(this, index)}
                        align="right"
                      >
                        {row.Student_Roll}
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={this.handleData.bind(this, index)}
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
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          <Dialog
            open={this.state.openDialog}
            onCancel={this.handleCloseDialog}
          >
            <DialogTitle style={{color:"red"}}>Student Details</DialogTitle><hr/>
            <DialogContent>
            
            Student ID :  {this.state.Studentdata._id}<br></br>
             Student Roll Number : {this.state.Studentdata.Student_Roll}<br></br>
             Student Name :{this.state.Studentdata.Student_Name}<br></br>
             Student Age :{this.state.Studentdata.Student_Age}<br></br>
             Student Class :{this.state.Studentdata.Student_Class}<br></br>
             Student DOB :{this.state.Studentdata.Student_DOB}<br></br>
            </DialogContent>
            <DialogActions>
              <Button type="button" color="primary" onClick={this.handleCloseDialog}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}
