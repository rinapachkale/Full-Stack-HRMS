import React, { useState, useEffect } from "react";
import "./Employees.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // State for Add Employee
  const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", email: "" }); // New Employee data

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((response) => response.json())
      .then((data) =>
        setEmployees(data.sort((a, b) => a.firstName.localeCompare(b.firstName)))
      );
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:8080/api/employees/${searchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Employee not found");
        }
        return response.json();
      })
      .then((employee) => setSelectedEmployee(employee))
      .catch(() => alert("Enter valid Employee Id in search box"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:8080/api/employees/${id}`, { method: "DELETE" })
        .then(() => {
          setEmployees(employees.filter((emp) => emp.id !== id));
          alert("Employee deleted successfully");
        })
        .catch(() => alert("Error deleting employee"));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedEmployee({ ...selectedEmployee });
  };

  const handleSave = () => {
    fetch("http://localhost:8080/api/employees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update employee");
        }
        return response.json();
      })
      .then((updatedEmployee) => {
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
        setSelectedEmployee(updatedEmployee);
        setIsEditing(false);
        alert("Employee updated successfully");
      })
      .catch(() => alert("Error updating employee"));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEmployee = () => {
    setIsAdding(true);
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNewEmployee = () => {
    fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add employee");
        }
        return response.json();
      })
      .then((addedEmployee) => {
        setEmployees((prev) => [...prev, addedEmployee]);
        setIsAdding(false);
        setNewEmployee({ firstName: "", lastName: "", email: "" });
        alert(`Employee added successfully! New Employee ID: ${addedEmployee.id}`);
      })
      .catch(() => alert("Error adding employee"));
  };  

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewEmployee({ firstName: "", lastName: "", email: "" });
  };

  return (
    <div className="employees-page">
      <div className="background-image-employees-page"></div>
      <div>
        <h1>Human Resource Management System</h1>
        <h5>
          Empowering Your Workforce with Efficient Tools, Streamlining Success
          and Driving Growth for Your Organization.
        </h5>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Employee by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="header-button" onClick={handleSearch}>
            Search
          </button>
          <button className="header-button" onClick={handleAddEmployee}>
            Add Employee
          </button>
          <button
            className="header-button"
            onClick={() => (window.location.href = "/")}
          >
            Logout
          </button>
        </div>

        {isAdding && (
          <div className="search-container">
            <h3>Add New Employee</h3>
            <div>
              <p>
                First Name:{" "}
                <input
                  className="input-field-edit"
                  type="text"
                  name="firstName"
                  value={newEmployee.firstName}
                  onChange={handleNewEmployeeChange}
                />
              </p>
              <p>
                Last Name:{" "}
                <input
                  className="input-field-edit"
                  type="text"
                  name="lastName"
                  value={newEmployee.lastName}
                  onChange={handleNewEmployeeChange}
                />
              </p>
              <p>
                Email:{" "}
                <input
                  className="input-field-edit"
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleNewEmployeeChange}
                />
              </p>
              <button className="header-button" onClick={handleSaveNewEmployee}>
                Save
              </button>
              <button className="header-button" onClick={handleCancelAdd}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {selectedEmployee && !isEditing && (
          <div className="search-container">
            <h3>Employee Details</h3>
            <div>
              <p>
                Employee ID:{" "}
                <input
                  className="input-field-details"
                  type="text"
                  value={selectedEmployee.id}
                  readOnly
                />
              </p>
              <p>
                First Name:{" "}
                <input
                  className="input-field-details"
                  type="text"
                  value={selectedEmployee.firstName}
                  readOnly
                />
              </p>
              <p>
                Last Name:{" "}
                <input
                  className="input-field-details"
                  type="text"
                  value={selectedEmployee.lastName}
                  readOnly
                />
              </p>
              <p>
                Email:{" "}
                <input
                  className="input-field-details"
                  type="email"
                  value={selectedEmployee.email}
                  readOnly
                />
              </p>
              <button className="header-button" onClick={handleEdit}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedEmployee.id)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                className="header-button"
                onClick={() => setSelectedEmployee(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {isEditing && editedEmployee && (
          <div className="search-container">
            <h3>Edit Employee Details</h3>
            <div>
              <p>
                Employee ID:{" "}
                <input
                  className="input-field-details"
                  type="text"
                  name="id"
                  value={editedEmployee.id}
                  readOnly
                />
              </p>
              <p>
                First Name:{" "}
                <input
                  className="input-field-edit"
                  type="text"
                  name="firstName"
                  value={editedEmployee.firstName || ""}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                Last Name:{" "}
                <input
                  className="input-field-edit"
                  type="text"
                  name="lastName"
                  value={editedEmployee.lastName || ""}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                Email:{" "}
                <input
                  className="input-field-edit"
                  type="email"
                  name="email"
                  value={editedEmployee.email || ""}
                  onChange={handleInputChange}
                />
              </p>
              <button className="header-button" onClick={handleSave}>
                Save
              </button>
              <button className="header-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="employee-list">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="employee-card"
              onClick={() => setSelectedEmployee(employee)}
            >
              <h4>
                {employee.firstName} {employee.lastName}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Employees;
