import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Employee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch employee data based on ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employee/${id}`); // Replace with your actual API endpoint
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submission to save edited employee data
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
        method: 'POST', // Use PUT or PATCH depending on your backend setup
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        setMessage('Employee data updated successfully!');
        setTimeout(() => {
          navigate('/'); // Redirect to EmployeeList after successful update
        }, 2000);
      } else {
        throw new Error('Failed to update employee data');
      }
    } catch (error) {
      setMessage('Error updating employee data');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!employee) return <p>Loading employee data...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Employee</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSave} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Department:</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.saveButton} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: '50%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  message: {
    textAlign: 'center',
    color: 'green',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  saveButton: {
    padding: '10px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default Employee;
