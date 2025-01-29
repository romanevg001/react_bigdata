import './App.css'
import { useLoadUsers } from './Users/users-hooks';
import Users from './Users/Users';
function App() {
  useLoadUsers()

  return (
    <>
    
      <Users />
    </>
  )
}

export default App
