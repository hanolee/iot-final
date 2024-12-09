import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import FestivalCreatePage from './pages/festival/FestivalCreatePage'
import FestivalDetailPage from './pages/festival/FestivalDetailPage'
import FestivalFacilityCreatePage from './pages/festival/FestivalFacilityCreatePage'
import FestivalPage from './pages/festival/FestivalPage'
import FestivalParticipatorCreatePage from './pages/festival/FestivalParticipatorCreatePage'
import FestivalRevisePage from './pages/festival/FestivalRevisePage'
import MainPage from './pages/main/MainPage'
import NotificationMainPage from './pages/notification/NotificationMainPage'
import PostFilterCreatePage from './pages/post/PostFilterCreatePage'
import PostFilterPage from './pages/post/PostFilterPage'
import PostMainPage from './pages/post/PostMainPage'
import BrandCreatePage from './pages/shopping/BrandCreatePage'
import BrandMainPage from './pages/shopping/BrandMainPage'
import ProductCreatePage from './pages/shopping/ProductCreatePage'
import ProductDetailPage from './pages/shopping/ProductDetailPage'
import ProductMainPage from './pages/shopping/ProductMainPage'
import ShopCreatePage from './pages/shopping/ShopCreatePage'
import ShopDetailPage from './pages/shopping/ShopDetailPage'
import ShoppingMainPage from './pages/shopping/ShoppingMainPage'
import ShopRevisePage from './pages/shopping/ShopRevisePage'
import TeaTogetherAdminPage from './pages/tea-together/TeaTogetherAdminPage'
import TeahouseAdminPage from './pages/teahouse/TeahouseAdminPage'
import TeahouseFilterCreatePage from './pages/teahouse/TeahouseFilterCreatePage'
import TeahouseFilterPage from './pages/teahouse/TeahouseFilterPage'
import UserPage from './pages/user/UserPage'
import { ROUTER } from './router'

const { MAIN, TEAHOUSE, TEATOGETHER, POST, NOTIFICATION, FESTIVAL, SHOPPING } = ROUTER
function PageRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/user'>
          <Route
            index
            element={<UserPage />}
          />
        </Route>
        <Route path={MAIN}>
          <Route
            index
            element={<FestivalParticipatorCreatePage />}
          />
        </Route>
        <Route path={TEAHOUSE}>
          <Route
            index
            element={<TeahouseAdminPage />}
          />
          <Route path='filter'>
            <Route
              index
              element={<TeahouseFilterPage />}
            />
            <Route path='create'>
              <Route
                index
                element={<TeahouseFilterCreatePage />}
              />
            </Route>
          </Route>
        </Route>
        <Route path={TEATOGETHER}>
          <Route
            index
            element={<TeaTogetherAdminPage />}
          />
        </Route>
        <Route path={POST}>
          <Route
            index
            element={<PostMainPage />}
          />
          <Route path='filter'>
            <Route
              index
              element={<PostFilterPage />}
            />
            <Route path='create'>
              <Route
                index
                element={<PostFilterCreatePage />}
              />
            </Route>
          </Route>
        </Route>
        <Route path={NOTIFICATION}>
          <Route
            index
            element={<NotificationMainPage />}
          />
        </Route>
        <Route path={SHOPPING}>
          <Route
            index
            element={<ShoppingMainPage />}
          />
          <Route
            path='product'
            element={<ProductMainPage />}
          />
          <Route
            path='product/:id'
            element={<ProductDetailPage />}
          />
          <Route
            path='shop/create'
            element={<ShopCreatePage />}
          />
          <Route
            path='shop/:id'
            element={<ShopDetailPage />}
          />
          <Route
            path='shop/:id/edit'
            element={<ShopRevisePage />}
          />
          <Route
            path='shop/:id/product/create'
            element={<ProductCreatePage />}
          />
          <Route
            path='brand/create'
            element={<BrandCreatePage />}
          />
          <Route
            path='brand'
            element={<BrandMainPage />}
          />
        </Route>
        <Route path={FESTIVAL}>
          <Route
            index
            element={<FestivalPage />}
          />
          <Route
            path='create'
            element={<FestivalCreatePage />}>
          </Route>
          <Route
            path=':id'
            element={<FestivalDetailPage />}>
          </Route>
          <Route
            path=':id/revise'
            element={<FestivalRevisePage />}>
          </Route>
          <Route
            path=':id/facility/create'
            element={<FestivalFacilityCreatePage />}>
          </Route>
          <Route
            path=':id/participator/create'
            element={<FestivalParticipatorCreatePage />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default PageRouter
