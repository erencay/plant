import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import "./input.css";
import firebase from '../../firebase/firebase';

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: props.url,
      içerik:{
        date: '10/08/80',
        id: props.kullanıcı_adı,
        yazı:''
    }}
  }

  setInput = (e) => {
    console.log(this.state.url)
    firebase.database().ref('kategoriler/'+this.state.url+'/answer').push(this.state.içerik)
  }

  render() {
    return (
      <div className="mainInput">
        <MuiThemeProvider theme={theme}>
          <TextField
            id="textarea mui-theme-provider-input"
            label="Ne Düsünüyorsunuz?"
            multiline
            className="Input"
            margin="normal"
            onChange={(event)=>{
              const içerik = {...this.state.içerik};
              içerik.yazı = event.target.value;
              this.setState({ içerik });
            }}
          />
        </MuiThemeProvider>
        <label htmlFor="outlined-button-fie">
          <Button variant="outlined" component="span" className="plant-button" onClick={this.setInput}>
            PLANT
          </Button>
        </label>
      </div>
    );
  }
}

export default Input;
