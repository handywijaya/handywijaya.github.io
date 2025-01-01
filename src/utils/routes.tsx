import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function withNavigate<T>(Component: React.ComponentType<T>) {
  return function Wrapper(props: T) {
    const navigate = useNavigate()
    
    // Pass `navigate` along with the original props
    return (<Component {...props} navigate={navigate} />)
  }
}

function withNavigateAndParams<T>(Component: React.ComponentType<T>) {
  return function Wrapper(props: T) {
    const navigate = useNavigate();
    const params = useParams();
    
    return <Component {...props} navigate={navigate} params={params} />;
  };
}

export {
  withNavigate,
  withNavigateAndParams
}