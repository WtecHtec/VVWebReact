import React from 'react';
import  RouterConfig from './router/index';
import { HashRouter  } from 'react-router-dom';
import { createHashHistory } from 'history'
const history = createHashHistory();
function App() {
  return (
    <div className="main">
      
            <HashRouter history={history} >
                <RouterConfig/>
            </HashRouter>
     

    </div>
  );
}

export default App;