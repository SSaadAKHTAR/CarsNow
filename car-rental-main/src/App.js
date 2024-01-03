import { Route, Routes } from "react-router-dom";
import Home from "./System";
import Renter from "./System/Renter/index";
import History from "./System/Renter/History";
import Transcript from "./System/Renter/components/Transcript";
import DetailCar from "./System/Renter/DetailCar";

function App() {
  return (
    <Routes>
      <Route path="/" element=<Home /> />

      {/* renter */}
      <Route path="/user" element=<Renter /> />
      <Route path="/user/history" element=<History /> />
      {/* car details */}

      <Route path="/user/booking-transcript/:id" element=<Transcript /> />
      <Route path="/user/details/:id" element=<DetailCar /> />
    </Routes>
  );
}

export default App;
