import React, { createContext } from 'react';
import './App.css';
import AutoCompleteText from './AutoCompleteText';
import location from './location';

// class App extends Component {
//   state = {  }
//   render() { 
//     return (  );
//   }
// }
 
// export default App;

function App() {
  return (
    <div className="App">
      <div className="App-Component">
          <AutoCompleteText items={location} />
          <br /><br />
          <AutoCompleteText items={location} />
      </div>
    </div>
  );
}

export default App;
