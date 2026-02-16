import { useEffect } from 'react'
import './App.css'
import { FilmList } from './components/films/FilmList.tsx'
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardSidebar from './components/nav/DashboardSidebar.tsx';
import { Home } from './components/home/Home.tsx';
import { Profile } from './components/profile/Profile.tsx';
import { NFLSearch } from './components/nfl/NFLSearch.tsx';
import { Marvel } from './components/marvel/Marvel.tsx';

function App() {

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <DashboardSidebar setExpanded={(expanded) => console.log('Sidebar expanded:', expanded)} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects/films" element={<FilmList />} />
          <Route path="/projects/nfl" element={<NFLSearch />} />       
          <Route path="/projects/marvel" element={<Marvel />} />                
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App