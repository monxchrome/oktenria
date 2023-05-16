import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>

          <Route path={'/'} element={<MainLayout/>}>

              <Route path={'/'} element={<MainPage/>}/>

          </Route>

      </Routes>
    </div>
  );
}

export default App;
