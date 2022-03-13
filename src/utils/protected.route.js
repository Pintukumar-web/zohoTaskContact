import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={() => {
          if (user) {
            return children
          } else {
            return <Redirect to='/signin' />
          }
        }}
      />
    </>
  )
}

export default ProtectedRoute