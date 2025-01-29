import './App.css'
import { useLoadUsers } from './Users/useLoadUsers';
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
