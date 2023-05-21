import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PostCarPage from "./pages/PostCarPage/PostCarPage";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
import UsedAutosPage from "./pages/UsedAutosPage/UsedAutosPage";
import NewAutosPage from "./pages/NewAutosPage/NewAutosPage";
function App() {
  return (
    <div className="App">
      <Routes>

          <Route path={'/'} element={<MainLayout/>}>

              <Route path={'/'} element={<MainPage/>}/>
              <Route path={'/:carId'} element={<CarDetailsPage/>}/>
              <Route path={'/cars/used'} element={<UsedAutosPage/>}/>
              <Route path={'/cars/new'} element={<NewAutosPage/>}/>

              <Route path={'login'} element={<LoginPage/>}/>
              <Route path={'register'} element={<RegisterPage/>}/>

              <Route path={'postcar'} element={<PostCarPage/>}/>

          </Route>

      </Routes>
    </div>
  );
}

export default App;
