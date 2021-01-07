const defaultState = {
    inputValue : '默认',
  
}

export default (state = defaultState,action)=>{  //就是一个方法函数

    if(action.type === 'editinputValue' ){
        let newState = JSON.parse(JSON.stringify(state))
         newState.inputValue = '修改'
        return newState
    }  // 触发dispatch 事件，这里可以修改数据，删除。

    return state
}
