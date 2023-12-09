import React, { useState } from 'react'

const Intersection_Observer = () => {

    const [postdata, setpostdata] = useState("")
    async function getpost() {
        await fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/post").then((result) => {
          result.json().then((resp) => {
           setpostdata(resp)
          })
        })
      }
 
    return (
        <div>
          Intersection_Observer
        </div>
    )
}

export default Intersection_Observer