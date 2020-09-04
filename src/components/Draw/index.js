import React, {useEffect, useState} from "react";
import './Draw.css'
export default function Draw(props) {
    const [count,setCount] = useState(0);
    const { data,muve,endgame } = props;
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        let interval = null;
        if (!endgame) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                if(seconds === 60){
                    setSeconds(0)
                    setMinutes(minutes => minutes+1);
                }
            }, 1000);
        } else if (!endgame && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [endgame, seconds]);

    const countshow = ({target}) => {
        if(!endgame) {
            setCount(count + 1);
        }
    }

    return(
    <div>
        <table className="bigtable">
            <tbody>
            {
                data.map((el,i) => {
                    return  <tr key={i}>
                        {
                            el.map((e,j) => {
                                const classname = e !== 0  ? "thnumber" : "empty";
                                return <th key={j+i} id={i+""+j} onClick={(e) =>{ muve(e); countshow(e)}}
                                           className={classname}>{e !== 0 ? e : ""}</th>
                            })
                        }
                    </tr>
                })
            }
            </tbody>
        </table>
        <div>
            { endgame ? <h1>You win</h1> : null }
            <h1>click count: {count}</h1>
            <h1 className="time">
                {"Time " + minutes + " : " +seconds}
            </h1>
        </div>
    </div>
    )
}