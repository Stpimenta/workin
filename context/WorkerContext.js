import {createContext, useState} from 'react'

const WorkerContext = createContext({})

export function WorkerProvider({children}) {

   const[worker, setWorker] = useState({
      receiver:{},
      sender:{},
      date:'',
      descricao:'',
      count: 1
   })

  return (
    <WorkerContext.Provider value={{
        ...worker, setWorker: (data)=> setWorker({...worker, ...data})
      }}
    >
      {children}
    </WorkerContext.Provider>
  )
}

export default WorkerContext