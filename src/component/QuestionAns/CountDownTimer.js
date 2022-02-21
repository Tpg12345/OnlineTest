import React, { useEffect, useState } from 'react';

export const CountDownTimer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(props.time);
      
    function updateTime() {
        if (minutes === 0 && seconds === 0) {
            //reset
            setSeconds(0);
            setMinutes(0);
        }
        else {
            if (seconds === 0) {  
                setMinutes(minutes => minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds => seconds - 1);
            } if(seconds===9){
                setSeconds(seconds=> '0'+seconds);
            }
        }
    }



    useEffect(() => {
        // use set timeout and be confident because updateTime will cause rerender
        // rerender mean re call this effect => then it will be similar to how setinterval works
        // but with easy to understand logic
        const token = setTimeout(updateTime, 1000)

        return function cleanUp() {
            clearTimeout(token);
        }
    })

    return (
        <div className='timer'>
           <span> Time left<br/>
          {minutes}:{seconds}</span>
        </div>
    )
};
