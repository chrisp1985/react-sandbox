import './App.css'
import MuiNavBar from '../components/nav/muinavbar.tsx'; 
import { MyRoutes } from './MyRoutes.tsx';

function App() {

  return (
    <div>
      <MuiNavBar />
      <main style={{ minHeight: '100vh',  }} >
        <MyRoutes />
      </main>
    </div>
  )
}

export default App