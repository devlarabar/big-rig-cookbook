import { useEffect, useState } from "react"
import Stretch from "../features/stretch/Stretch"

const StretchIndex = () => {
    const [stretches, setStretches] = useState([])

    useEffect(() => {
        (async function() {
            const stretchData = await fetch('http://localhost:4000/stretch')
            const stretchDataJSON = await stretchData.json()
            setStretches(stretchDataJSON)
        }())
    }, [])

    return (
        <div>
            {stretches.length > 0 && stretches.map((x, i) => {
                return (
                    <div key={i}>
                        <Stretch stretch={x} />
                    </div>
                )
            })}
        </div>
    )
}

export default StretchIndex