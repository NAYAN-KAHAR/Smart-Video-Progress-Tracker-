
import HomePage from './Components/Home';

import './style.css';
import { Route, Routes } from 'react-router-dom';

import Videos from './Components/Videos';

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


