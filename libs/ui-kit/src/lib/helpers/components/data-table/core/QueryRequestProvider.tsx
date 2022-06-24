import {createContext, FC, PropsWithChildren, useContext, useState} from 'react'
import {initialQueryRequest, QueryRequestContextProps, QueryState} from '../../../crud-helper/models';

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const QueryRequestProvider: FC<PropsWithChildren<any>> = ({children}) => {
  const [state, setState] = useState<QueryState>(initialQueryRequest.state)

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = {...state, ...updates} as QueryState;
    setState(updatedState);
  }

  return (
    <QueryRequestContext.Provider value={{state, updateState}}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export {QueryRequestProvider, useQueryRequest}
