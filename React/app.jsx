import React from 'react'

function App(){
    const [count,setcount] = React.useState(0)

    return <Button count={count} setcount={setcount}></Button>
}

function Button(props){
    function onButtonClick(){
        props.setcount(props.count + 1);
    }

    return <button onClick={onButtonClick}>Counter ${props.count}</button>
}

export default App



