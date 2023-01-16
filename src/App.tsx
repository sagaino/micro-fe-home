import HomePage from './components';
import DetailPokemon from './components/detailPokemon';
import DetailPokemonItem from './components/detailPokemonItem';
import {
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className='text-white text-2xl'>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
