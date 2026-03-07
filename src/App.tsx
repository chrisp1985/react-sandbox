import { useEffect } from 'react'
import './App.css'
import { FilmList } from './components/films/FilmList.tsx'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/home/Home.tsx';
import { Profile } from './components/profile/Profile.tsx';
import { NFLSearch } from './components/nfl/NFLSearch.tsx';
import { RandMRest } from './components/randmrest/RandMRest.tsx';
import ElexonBMRSPage from './components/elexon/ElexonBMRSPage';
import MuiNavBar from './nav/muinavbar.tsx'; 

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <div>
      <MuiNavBar />
      <main
        style={{
          background: 'linear-gradient(135deg, #e3ecfa 0%, #f5f7fa 100%)',
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects/films" element={<FilmList />} />
          <Route path="/projects/nfl" element={<NFLSearch />} />       
          <Route path="/projects/randmrest" element={<RandMRest />} />
          <Route path="/projects/elexon" element={<ElexonBMRSPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App