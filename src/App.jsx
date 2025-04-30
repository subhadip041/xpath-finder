import { useState } from 'react'

import { Button } from './components/Button'
import { Verify } from './pages/Verify'


function App() {
  const [verify, setVerify] = useState(false)

  return (

    <div className='min-w-3xs rounded-2xl gap-2.5 p-2 justify-items-center'>
      <div className='flex'>
        <Button onClick={() => { setVerify(false) }} child={'Verify Xpath'} />
        <Button onClick={() => { setVerify(true) }} child={'Find Xpath'} />
      </div>
      <div className='mt-3'>
        {verify ? <div><Verify /></div> : <div>Verify Xpath</div>}
      </div>
    </div>
  )
}

export default App
