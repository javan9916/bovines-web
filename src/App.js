import { Routes, Route, Navigate } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import './index.css';
import Error from './components/Error';
import Header from './components/Header';
import Animals from './pages/Animals';
import Diets from './pages/Diets';
import Costs from './pages/Costs';
import CreateAnimal from './components/animals/animal/CreateAnimal';
import AnimalDetail from './components/animals/animal/AnimalDetail';
import AnimalList from './components/animals/animal/AnimalList';
import CreateGroup from './components/animals/group/CreateGroup';
import GroupDetail from './components/animals/group/GroupDetail';
import CreateSector from './components/animals/sector/CreateSector';
import SectorDetail from './components/animals/sector/SectorDetail';
import CreateInitialWeights from './components/animals/weight/CreateInitialWeights';
import CreateWeight from './components/animals/weight/CreateWeight';

import CreateSupplement from './components/diets/supplement/CreateSupplement';
import SupplementDetail from './components/diets/supplement/SupplementDetail';
import SupplementList from './components/diets/supplement/SupplementList';
import CreatePrice from './components/diets/supplement/CreatePrice';
import CreateDiet from './components/diets/diet/CreateDiet';
import DietDetail from './components/diets/diet/DietDetail';
import DietList from './components/diets/diet/DietList';

import SectorList from './components/animals/sector/SectorList';
import CreateCost from './components/costs/costs/CreateCost';
import CostDetail from './components/costs/costs/CostDetail';
import CostList from './components/costs/costs/CostList';
import CategoryList from './components/costs/category/CategoryList';
import CategoryDetail from './components/costs/category/CategoryDetail';
import CreateCategory from './components/costs/category/CreateCategory';
import Register from './pages/Register';
import Login from './pages/Login';

import { AuthProvider } from './context/AuthContext'


function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Toaster position='bottom-right' />
        <Header>
          <Routes>
            {/* Animal Routes */}
            <Route path='/animales' element={<Animals />} />
            <Route path='/animales/lista' element={<AnimalList />} />
            <Route path='/animales/sectores/lista' element={<SectorList />} />
            <Route path='/animales/:id' element={<AnimalDetail />} />
            <Route path='/animales/grupos/:id' element={<GroupDetail />} />
            <Route path='/animales/sectores/:id' element={<SectorDetail />}  />
            <Route path='/animales/agregar_grupo' element={<CreateGroup />} />
            <Route path='/animales/agregar_animal' element={<CreateAnimal />} />
            <Route path='/animales/agregar_sector' element={<CreateSector />} />
            <Route path='/animales/:id/pesajes_iniciales' element={<CreateInitialWeights />} />
            <Route path='/animales/:id/agregar_pesaje' element={<CreateWeight />} />

            {/* Diet Routes */}
            <Route path='/dietas' element={<Diets />} />
            <Route path='/dietas/lista' element={<DietList />} />
            <Route path='/dietas/suplementos/lista' element={<SupplementList />} />
            <Route path='/dietas/:id' element={<DietDetail />} />
            <Route path='/dietas/agregar_dieta' element={<CreateDiet />} />
            <Route path='/dietas/suplementos/agregar_suplemento' element={<CreateSupplement />} />
            <Route path='/dietas/suplementos/:id' element={<SupplementDetail />} />
            <Route path='/dietas/suplementos/:id/agregar_precio' element={<CreatePrice />} />

            {/* Cost Routes */}
            <Route path='/costos' element={<Costs />} />
            <Route path='/costos/lista' element={<CostList />} />
            <Route path='/costos/:id' element={<CostDetail />} />
            <Route path='/costos/agregar_costo' element={<CreateCost />} />
            <Route path='/costos/categorias/lista' element={<CategoryList />} />
            <Route path='/costos/categorias/:id' element={<CategoryDetail />} />
            <Route path='/costos/agregar_categoria' element={<CreateCategory />} />

            {/* General Routes */}
            <Route path='/' element={<Navigate to='/animales' />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/404' element={<Error code={404} />} />
            <Route path='*' element={<Error code={500} />} />
          </Routes>
        </Header>
      </AuthProvider>
    </div>
  );
}

export default App;
