import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
function App() {
  return (
    <div className="App">
      <Routes>

          <Route path={'/'} element={<MainLayout/>}>

              <Route path={'/'} element={<MainPage/>}/>

              <Route path={'login'} element={<LoginPage/>}/>
              <Route path={'register'} element={<RegisterPage/>}/>

          </Route>

      </Routes>
    </div>
  );
}

export default App;
