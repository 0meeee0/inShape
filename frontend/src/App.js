import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Home from "./components/pages/Home";
import Event from "./components/events/Event";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateRoute>
                <Event />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
