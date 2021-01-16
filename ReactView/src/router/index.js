
import React,{Suspense,lazy}  from 'react';
import {Route,Switch} from 'react-router-dom';

/*  未启用 懒加载方式  start */
// import Login from '../views/login/login'; // 定义的模块
// import Main from '../views/main/main';
// import Index from '../views/index/index';
/*  未启用 懒加载方式  end */


/**  使用 react.lazy 懒加载 start  */
import Loading from '../components/loadingcom/loadingcom';

// const logincom = lazy(() => import('../views/login/logincom') );

const MainCom = lazy(() => import('../views/main/maincom') );

const indexcom = lazy(() => import('../views/index/indexcom') );

/**  使用 react.lazy 懒加载 end  */

  /**  使用 react-loadable  懒加载 start  */
import Loadable from '../uitls/loadable/loadable';

const logincom = Loadable(() => import('../views/login/login') );

/**  使用 react-loadable  懒加载 end  */


class RouterConfig extends React.Component{
    render(){
        return(
            <Suspense fallback={ Loading() }>
                <Switch>


                <Route path='/'  exact  component={ MainCom } />

                    <Route path='/'  exact component={MainCom}/>
                    // main嵌套路由 ，不使用可以去掉
                        <Route path="/main" render={() =>
                            <MainCom>
                                <Route exact path="/main" component={indexcom} />
                                <Route path="/main/Page2" component={logincom} /> 
            
                            </MainCom>
                        }/>
                    <Route path='/login'  exact component={logincom}/>




                </Switch>
            </Suspense>
        )
    }
}
export default RouterConfig;