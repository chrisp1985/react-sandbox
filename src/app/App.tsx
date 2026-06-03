import './App.css'
import MuiNavBar from '../components/nav/muinavbar.tsx'; 
import { MyRoutes } from './MyRoutes.tsx';

function App() {

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <MuiNavBar />
      <main style={{ minHeight: '100vh',  }} >
        <MyRoutes />
      </main>
    </div>
  )
}

export default App