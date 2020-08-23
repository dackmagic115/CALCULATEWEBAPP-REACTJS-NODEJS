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
import axios from "axios";

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
}));

function App() {
  const classes = useStyles();

  const [inputFields, setInputFields] = useState([
    { name: String, socre: Number, credit: Number },
  ]);

  const [response, setResponse] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (response) {
      setResult(response);
      console.log(result);
    }
  }, [response]);

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
      console.log(error);
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
          <Grid item xs={12} className={classes.right}>
            {result
              ? result.info.map((data) => {
                  return (
                    <div>
                      {data.name} {data.score} {data.credit} {data.gradeNumber}{" "}
                      {data.gradeAlphabet}{" "}
                    </div>
                  );
                })
              : null}
            {result ? <div>{result.averageGrade}</div> : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
