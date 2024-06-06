import React from 'react';
import Context from './context';
import { useState } from 'react';

const Provider = (props) => {
    const [endpointtocall, setendpointtocall] = useState('')
    const contextValue = { endpointtocall, setendpointtocall }
    return <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
}

export default Provider;
