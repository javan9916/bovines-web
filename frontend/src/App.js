import './index.css';
import Header from './components/Header';
import CreateGroup from './components/animals/CreateGroup';
import CreateAnimal from './components/animals/CreateAnimal';
import Error from './components/Error';
import Animals from './pages/Animals';
import Diets from './pages/Diets';
import Costs from './pages/Costs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header>
          <Routes>
            {/* Animal Routes */}
            <Route path='/animales' element={<Animals />} />
            <Route path='/agregar_grupo' element={<CreateGroup />} />
            <Route path='/agregar_animal' element={<CreateAnimal />} />

            {/* Diet Routes */}
            <Route path='/dietas' element={<Diets />} />

            {/* Cost Routes */}
            <Route path='/costos' element={<Costs />} />

            {/* General Routes */}
            <Route path='/404' element={<Error code={404} />} />
            <Route path='*' element={<Error code={500} />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
