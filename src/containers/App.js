import './App.css';
import {Navigation} from '../components/navigation/Navigation';
import {Logo} from '../components/Logo/Logo';
import {ImageLinkForm} from '../components/ImageForm/ImageLinkForm';
import {Rank} from '../components/Rank/Rank';
import { FaceRecognition } from '../components/FaceRecognition/FaceRecognition';
import { Signin } from '../components/Signin/Signin';
import { Register } from '../components/Register/Register';
import Particles from 'react-particles-js';
import { Component } from 'react';

const particlesOption = {
    particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        }
    }
  }
 
const initialState = {
  input: '',
  imageUrl: '',
  routes: 'signin',
  isSignedIn: false,
   user: {
     id:'',
     name: '',
     email: '',
     entries: 0,
     createdDate: ''
 }
}

export class App extends Component{
  //defining user input state
  constructor(){
     super();
     this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      createdDate: data.createdDate
    }
  })
}

  onRouteChange = (route)=> {
    if (route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({routes: route})
  };

  //input change event
  onInputChangeEvent = (event) => {
    console.log(event.target.value)
    this.setState({input: event.target.value})
  }

  //on submit event
  onSubmit = ()=> {
    this.setState({imageUrl: this.state.input})
    console.log()
    const imageBody = JSON.stringify({
      id: this.state.user.id
    })
    const body = JSON.stringify({
       imageUrl: this.state.input
    })
    console.log(imageBody)
    fetch('http://localhost:5000/detectionUrl/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: body
    })
        .then(response => {
          if (response){
            fetch("http://localhost:5000/image", {
              method: 'PUT',
              headers: {'Content-Type':'application/json'},
              body: imageBody
            })
            .then(response => response.json())
            .then(count => {
               this.setState(Object.assign(this.state.user, {entries:count}))
            })
            .catch(err => console.log(err))
          }
        })
       
        .catch(error => console.log('error', error));
  }
  
  render(){
   const { imageUrl, routes,isSignedIn,user} = this.state;
    return(
      <div className="App">
            <Particles className="particles"
                    params={particlesOption} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            {
              routes === 'home' ? 
              <div>
                  <Logo/>
                  <Rank user= {user}/>
                  <ImageLinkForm onInputChangeEvent={this.onInputChangeEvent} onSubmit={this.onSubmit}/>
                  <FaceRecognition imageUrl = {imageUrl}/>
                </div> : (routes === 'signin' ? <Signin loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/> : <Register loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/>)
                
            }
            
        </div>)
  }
}

export default App;
