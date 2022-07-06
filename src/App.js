import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import CustomerPage from "./page/CustomerPage";
import CustomerPageID from "./page/CustomerPage/id";
import LoginPage from "./page/LoginPage";
import RoomPage from "./page/RoomsPage";
import RoomPageID from "./page/RoomsPage/id";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="customer" element={<CustomerPage />}>
          <Route path=":customerID" element={<CustomerPageID />} />
        </Route>
        <Route path="room" element={<RoomPage />}>
          <Route path=":roomID" element={<RoomPageID />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

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
