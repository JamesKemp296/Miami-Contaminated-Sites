import React from 'react'

const SingleResult = ({ site }) => (
  <div className="single-list">
    <h1>This is the SingleResult Page</h1>
    <p>{site.attributes.CLASSIFCTN}</p>
  </div>
)

export default SingleResult
