import { useEffect } from 'react'
import './App.css'
import { FilmList } from './components/films/FilmList.tsx'
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardSidebar from './components/nav/DashboardSidebar.tsx';
import { Home } from './components/home/Home.tsx';
import { Profile } from './components/profile/Profile.tsx';
import { NFLSearch } from './components/nfl/NFLSearch.tsx';
import { RandMRest } from './components/randmrest/RandMRest.tsx';
import ElexonBMRSPage from './components/elexon/ElexonBMRSPage';

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <div>
      <DashboardSidebar setExpanded={(expanded) => console.log('Sidebar expanded:', expanded)} />
      <main
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #e3ecfa 0%, #f5f7fa 100%)',
          minHeight: '100vh',
          padding: '24px 16px',
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