import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Handle form submission to add a new employee
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const newEmployee = { name, department };

    try {
      const response = await fetch('http://localhost:8080/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        setMessage('Employee added successfully!');
        setTimeout(() => {
          navigate('/'); // Redirect to EmployeeList after successful addition
        }, 2000);
      } else {
        throw new Error('Failed to add employee');
      }
    } catch (error) {
      setMessage('Error adding employee');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Employee</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSave} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.saveButton} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Add Employee'}
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

export default AddEmployee;
