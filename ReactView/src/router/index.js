
import Login from '../views/login/login'; // 定义的模块
import Main from '../views/main/main';
import Index from '../views/index/index';

import React from 'react';
import {Route,Switch} from 'react-router-dom';
class RouterConfig extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/'  exact component={Main}/>
                 // main嵌套路由 ，不使用可以去掉
                    <Route path="/main" render={() =>
                        <Main>
                            <Route exact path="/main" component={Index} />
                            <Route path="/main/Page2" component={Login} /> 
        
                        </Main>
                    }/>
                <Route path='/login'  exact component={Login}/>
            </Switch>
        )
    }
}
export default RouterConfig;