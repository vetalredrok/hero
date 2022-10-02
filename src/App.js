import { Component} from "react";

class App extends Component{
  constructor() {
    super();

    this.state = {
      name: 'Yihua'
    };
  }



  render() {
    return (
        <div className="App">
        <p>Hi {this.state.name} </p>
          <button onClick={()=>{
            this.setState({name: 'Andrei'})
          }}>Change Name</button>
        </div>
    );


  }
}

export default App;
