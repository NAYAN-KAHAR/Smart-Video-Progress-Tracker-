
import HomePage from './Components/Home';

import './style.css';
import { Route, Routes } from 'react-router-dom';

import Videos from './Components/Videos';
// import Sample from './Components/sample';


const App = () => {
  
    return(
        <>
    
      	<Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/videos' element={<Videos />} />
        </Routes>
        </>
    )
}


export default App;


