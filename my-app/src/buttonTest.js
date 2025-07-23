import { useState } from "react"

function Click({count,onClick}) {
    return <button onClick={onclick}>Clicked {count} times</button>
}

export default Click;