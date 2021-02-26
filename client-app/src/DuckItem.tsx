import React from 'react'
import {Duck} from './demo'

interface Props{
    duck : Duck;
}

export default function DuckItem({duck} : Props){
    return(
        <div>
            <p>{duck.name}</p>
            <button onClick={() => {duck.MakeSound(duck.name + ' Qwuak')}}>Make sound</button>
        </div>
    )
}