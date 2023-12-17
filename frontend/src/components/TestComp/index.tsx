// ToDo: Remove this component

import { useEffect, useState } from 'react'
import axios from 'axios'

const handleClick = () => {
  console.log("Button clicked")
  console.log(document.cookie)
    // Redirect the user to the GitHub OAuth screen
  window.location.href = "http://localhost:3001/test1";
}
    

export default function TestComp() {
  console.log("Render count in src/TestComponent/index.tsx: ", window.renderCount++)

  const [ isLogged, setIsLogged ] = useState(false)
  const [ val, setVal] = useState(0)
  console.log("val: ", val)

  useEffect(() => {
    console.log("useEffect called")
    
    if (!isLogged) {
      axios.get('http://localhost:3001/test2', { withCredentials: true })
      .then((res) => {
        // console.log(res.data)
        setVal(prev => prev + 1)
        console.log("val inside axios.get: ", val)
        setIsLogged(prev => prev===res.data.isLoggedin ? prev : res.data.isLoggedin)
      })
      .catch((err) => {
        console.log(err)
        setIsLogged(false)
      })    
    }
    
    if(isLogged) {
      console.log("Logged in")
    }
    
  }, [isLogged]);
  
  return (
      <div className="text-center pt-10">
      {
        !isLogged ? (<button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
                onClick={handleClick}
          >
            Button
      </button>) : (<div className="border-l-black">Logged in</div>)
      }
      </div>
  )
}
