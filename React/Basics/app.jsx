import React from 'react'

export default function App(){
    const [count,setcount] = React.useState(0)

    function onButtonClick(){
       setcount(count + 1);
    }

    return (
        <div>
            <button id="btn" onClick={onButtonClick}>Counter ${count}</button>
        </div>
    )
}



