import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import NavBar from "./components/AppBar";
import Grid from "@material-ui/core/Grid";
import { Container, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  left: {
    textAlign: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  right: {
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
  error: {
    textAlign: "center",
    color: "red",
  },
}));

function App() {
  const classes = useStyles();

  const [inputFields, setInputFields] = useState([
    { name: String, socre: Number, credit: Number },
  ]);

  const [response, setResponse] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);
  useEffect(() => {
    if (response) {
      setResult(response);
    } else {
      setResult(null);
      if (errorResponse) {
        setError(errorResponse);
        console.log(error);
      }
    }
  }, [response, errorResponse]);

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const info = [...inputFields];
      const res = await axios.post(
        "http://localhost:3222/calculateGrade/",
        { info },
        config
      );

      setResponse(res.data);
    } catch (error) {
      setResponse(null);
      setErrorResponse(error.response.data);
    }
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { name: String, socre: Number, credit: Number },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    if (values.length > 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  return (
    <div>
      {" "}
      <NavBar />
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.left}>
            <Container>
              <form onSubmit={handleSubmit}>
                <h1>Add Infomation</h1>
                {inputFields.map((inputField, index) => (
                  <div key={index}>
                    <TextField
                      name="name"
                      label="Subject Name"
                      value={inputField.name}
                      onChange={(e) => handleChangeInput(index, e)}
                      required
                    />
                    <TextField
                      name="credit"
                      label="Credit"
                      type="number"
                      min="0"
                      max="100"
                      value={inputField.credit}
                      onChange={(e) => handleChangeInput(index, e)}
                      required
                    />
                    <TextField
                      name="score"
                      label="Score"
                      type="number"
                      pattern="[1-3]*"
                      inputmode="numeric"
                      value={inputField.score}
                      onChange={(e) => handleChangeInput(index, e)}
                      required
                    />
                    <IconButton>
                      <RemoveIcon onClick={() => handleRemoveFields(index)} />
                    </IconButton>
                    <IconButton onClick={() => handleAddFields()}>
                      <AddIcon />
                    </IconButton>
                  </div>
                ))}
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </form>
            </Container>
          </Grid>
          {error ? (
            <Grid item xs={12} className={classes.error}>
              {error.errors.map((res) => {
                return <h3>***{res.msg}***</h3>;
              })}
            </Grid>
          ) : null}

          <Grid item xs={12} className={classes.right}>
            <h1> Result </h1>
            <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject Name</TableCell>
                      <TableCell align="right">Credit</TableCell>
                      <TableCell align="right">Score</TableCell>
                      <TableCell align="right">Grade Number</TableCell>
                      <TableCell align="right">Grade Alphabet</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result
                      ? result.info.map((data) => {
                          return (
                            <TableRow key={data.name}>
                              <TableCell component="th" scope="row">
                                {data.name}
                              </TableCell>
                              <TableCell align="right">{data.credit}</TableCell>
                              <TableCell align="right">{data.score}</TableCell>
                              <TableCell align="right">
                                {data.gradeNumber}
                              </TableCell>
                              <TableCell align="right">
                                {data.gradeAlphabet}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {result ? (
              <div>
                <h1>Average Grade: {result.averageGrade}</h1>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
