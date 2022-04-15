import './App.css';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import {adminRoutes} from './routes'
import Frame from './components/Frame'
import {isLogined } from './utils/auth'
import Login from './pages/Login';
import { FastBackwardFilled } from '@ant-design/icons';

function App() {
  return isLogined() ? (
    <Frame>
    </Frame>
  ) : (
    <Routes>
      <Route path='*' element={<Navigate to="/" replace='true' />}></Route>
    </Routes>
  )
}

export default App;
