import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name'); // default filter type
  const navigate = useNavigate();

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employee'); // Replace with actual API endpoint
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on selected filter type and search query
  useEffect(() => {
    const filterData = () => {
      const filtered = employees.filter(employee => {
        if (filterType === 'name') {
          return employee.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (filterType === 'department') {
          return employee.department.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      });
      setFilteredEmployees(filtered);
    };

    filterData();
  }, [searchQuery, filterType, employees]);

  // redirect to employee component
   const handleEdit = (employee) => {
    navigate(`/employee/${employee.id}`);
   };  

   const handleDelete = async (employee) => {
    try {
        const response = await fetch(`http://localhost:8080/api/employee/${employee.id}`, {
          method: 'DELETE', // Use PUT or PATCH depending on your backend setup
        });
  
        if (response.ok) {
           alert('Employee removed');
          setTimeout(() => {
            navigate('/'); // Redirect to EmployeeList after successful update
          }, 1000);
        } else {
          throw new Error('Failed to Remove Employee');
        }
      } catch (error) {
        
        console.error(error);
      } 
   }; 
   
   const handleAdd = () =>{
      navigate('/employee')
   }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employee List</h2>

      {/* Filter Section */}
      <div style={styles.filterContainer}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={styles.dropdown}
        >
          <option value="name">Filter by Name</option>
          <option value="department">Filter by Department</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${filterType}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.AddButton} onClick={() => handleAdd()}>Add New Employee</button>
      </div>

      {/* Employee Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Emp ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Department</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee.empId} style={styles.tableRow}>
                <td style={styles.tableCell}>{employee.id}</td>
                <td style={styles.tableCell}>{employee.name}</td>
                <td style={styles.tableCell}>{employee.department}</td>
                <td style={styles.tableCell}>
                  <button style={styles.editButton} onClick={() => handleEdit(employee)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(employee)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.noData}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};



// Styles
const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  dropdown: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    padding: '10px',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f3f3f3',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
  },
  editButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton :{
    margin: '5px',
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: 'rgb(255 0 42)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  AddButton: {
    margin : 'auto 10px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noData: {
    textAlign: 'center',
    padding: '10px',
    color: '#888',
  },
};

export default EmployeeList;
