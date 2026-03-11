import { FilmList } from '../features/films/FilmList.tsx'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../features/home/Home.tsx';
import { Profile } from '../features/profile/Profile.tsx';
import { NFLSearch } from '../features/nfl/NFLSearch.tsx';
import { RandMRest } from '../features/rickmorty/RandMRest.tsx';
import ElexonBMRSPage from '../features/energy/ElexonBMRSPage.tsx';

export const MyRoutes = () => {
    return (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects/films" element={<FilmList />} />
            <Route path="/projects/nfl" element={<NFLSearch />} />       
            <Route path="/projects/randmrest" element={<RandMRest />} />
            <Route path="/projects/elexon" element={<ElexonBMRSPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
    )};