import './App.css';
import TripFrom from './component/TripFrom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Expenses from './component/Expenses';
import { useState } from 'react';

function App() {
  const [id,setId] = useState("");
  const [member,setMember] = useState([])
  const navigate = useNavigate();
  
  const getId = (uid,mem) => {
    navigate(`/expenses`);
    console.log(uid);
    setId(uid)
    setMember(mem)
    console.log(mem);
      return uid;
  }
  const generateId = () => {
    let uid = (Math.random()*100000).toFixed(0);
    console.log(uid);
    return uid;
}

  return (
    <div>
        <Routes>
          <Route exact path="/" element={<TripFrom getId={getId} generateId={generateId}/>}></Route>
          <Route exact path="/expenses" element={<Expenses id ={id} member={member} setMember={setMember}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
