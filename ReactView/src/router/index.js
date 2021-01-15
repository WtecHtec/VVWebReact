
import React,{Suspense,lazy}  from 'react';
import {Route,Switch} from 'react-router-dom';


// import  loadable  from '../uitls/loadable/loadable'

// import Login from '../views/login/login'; // 定义的模块
import Main from '../views/main/main';

import Index from '../views/index/index';
import Loadable from 'react-loadable';

const Loading = function(props) {
    console.log('Loading:', props)
    return <div>Loading...</div>
}
// const Main = loadable({
//     loader: () => import('../views/main/main'),
//     loading: Loading,
//   })

//   const Index = loadable({
//     loader: () => import('../views/index/index'),
//     loading: Loading,
//   })

//   const Login = Loadable({
//     loader: () => import('../views/login/login'),
//     loading: Loading,
//   })

  const logincom = lazy(() => import('../views/login/logincom') );
  
// let Login = loadable(()=>{return import("../views/login/login")})

// import Login from '../views/login/logincom'; 

class RouterConfig extends React.Component{
    render(){
        return(
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>


                <Route path='/'  exact  component={ logincom } />

                    {/* <Route path='/'  exact component={Login}/>
                    // main嵌套路由 ，不使用可以去掉
                        <Route path="/main" render={() =>
                            <Main>
                                <Route exact path="/main" component={Index} />
                                <Route path="/main/Page2" component={Login} /> 
            
                            </Main>
                        }/>
                    <Route path='/login'  exact component={Login}/> */}




                </Switch>
            </Suspense>
        )
    }
}
export default RouterConfig;