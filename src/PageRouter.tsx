import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import { ROUTER } from './router'
import MapPage from './pages/map/MapPage'

const { MAIN } = ROUTER
function PageRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={MAIN}>
          <Route
            index
            element={<MapPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default PageRouter
