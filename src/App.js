import logo from './logo.svg';
import './App.css';
import EmployeeList from './component/EmployeeList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './component/Employee';
import AddEmployee from './component/AddEmployee';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeeList />} ></Route>
          <Route path='/employee/:id' element={<Employee />} ></Route>
          <Route path='/employee' element={<AddEmployee />}></Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
