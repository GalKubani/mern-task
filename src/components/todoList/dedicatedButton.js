import React from 'react'

const DedicatedButton = ({ children = 'Add', backgroundColor = 'yellow', color = 'black' }) => (
    <button type="submit" style={{ color, backgroundColor }}>{children}</button>
)

export default DedicatedButton