import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import IndexApp from "./page";
import CustomerPage from "./page/CustomerPage";
import CustomerCreatePageID from "./page/CustomerPage/create";
import CustomerPageID from "./page/CustomerPage/id";
import LoginPage from "./page/LoginPage";
import RoomPage from "./page/RoomsPage";
import RoomCreatePage from "./page/RoomsPage/create";
import RoomUpdatePageID from "./page/RoomsPage/id";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customer/create" element={<CustomerCreatePageID />} />
        <Route path="/customer/update/:id" element={<CustomerPageID />} />
        <Route path="/customer" element={<CustomerPage />} />

        <Route path="/room" element={<RoomPage />} />
        <Route path="/room/create" element={<RoomCreatePage />} />
        <Route path="/room/update/:id" element={<RoomUpdatePageID />} />
        
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<IndexApp />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
