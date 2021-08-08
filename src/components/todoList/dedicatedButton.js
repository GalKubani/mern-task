import React from 'react'

const DedicatedButton = ({ content, backgroundColor = 'yellow', color = 'black' }) => (
    <button type="submit" style={{ color, backgroundColor }}>Add</button>
)

export default DedicatedButton