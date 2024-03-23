import "./App.css";
import { useState } from "react";
import employeeData from "./assets/employee-data.json";
import EmployeeCard from "./Components/EmployeeCard.js";

employeeData.forEach((emp) => {
  emp.image = process.env.PUBLIC_URL + "/" + emp.image;
});

function App() {
  const [listItems, setListItems] = useState([]);
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState({ sex: "", position: "" });
  const [sortedBySalary, setSortedBySalary] = useState(false);

  function addtoList(emp) {
    setListItems([...listItems, emp]);
  }

  function removeFromList(emp) {
    const newList = listItems.filter((e) => e.name != emp.name);
    setListItems(newList);
  }

  function total() {
    setNumber(number + 1);
  }

  function totalAfterRemove() {
    setNumber(number - 1);
  }

  // Filter employees based on the provided criteria
  const filteredEmployees = employeeData.filter((emp) => {
    const { sex, position } = filters;
    return (
      (sex === "" || emp.sex === sex) &&
      (position === "" || emp.position === position)
    );
  });

  // Sort employees by salary
  function sortEmployeesBySalary() {
    const sortedEmployees = [...filteredEmployees].sort(
      (a, b) => a.salary - b.salary
    );
    return sortedEmployees;
  }

  // Toggle sorting order and re-sort the employees
  function toggleSortOrder() {
    setSortedBySalary(!sortedBySalary);
    return filteredEmployees;
  }

  function toggleReset() {
    setSortedBySalary(false);
    setFilters({ sex: "", position: "" });
  }

  // Check if an employee is in the list
  function isInList(employee) {
    return listItems.some((emp) => emp.name === employee.name);
  }

  return (
    <div className="App">
      <h1>Employee Information</h1>
      <hr></hr>
      {/* Introduction */}
      <p>
        Include a few sentences about the intention of your app and how you are
        incorporating filter, sort, and aggregation using your theme: I want to
        make a website about employee information. On the home page, employees
        can be filtered by job title and gender. In addition, user can also sort
        by employee salary. For the aggregation part, I want to assume that the
        user is the boss, and the boss can choose the employees they like for
        promotion and salary increase. In this section, the name, position, and
        salary of the selected employee will be displayed. At the same time, the
        total number of selected employees is also displayed in the bottom of
        the webpage. Finally, user can clean all searching conditions by
        clicking the reset button.
      </p>
      {/* filters, sort, and clear all conditions */}
      <div className="filters">
        <label>
          Sex:&nbsp;
          <select
            value={filters.sex}
            onChange={(e) => setFilters({ ...filters, sex: e.target.value })}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Position:&nbsp;
          <select
            value={filters.position}
            onChange={(e) =>
              setFilters({ ...filters, position: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="Front-end developer">Front-end developer</option>
            <option value="Back-end developer">Back-end developer</option>
            <option value="Full-stack developer">Full-stack developer</option>
          </select>
        </label>
        <button onClick={() => toggleSortOrder()}>
          {sortedBySalary ? "Clear sorting" : "Sort employees by salary"}
        </button>
        <button onClick={() => toggleReset()}>Reset filters and sort</button>
      </div>

      {/* list employee: sorted or unsorted? in list or not in list? */}
      {/* <div className="listItem"> */}
      {(sortedBySalary ? sortEmployeesBySalary() : filteredEmployees).map(
        (emp, index) => (
          <div key={index} className="listItem">
            {isInList(emp) ? (
              <EmployeeCard
                key={index}
                emp={emp}
                removeFromList={removeFromList}
                totalAfterRemove={totalAfterRemove}
              />
            ) : (
              <EmployeeCard
                key={index}
                emp={emp}
                addtoList={addtoList}
                total={total}
              />
            )}
          </div>
        )
      )}
      {/* </div> */}

      {/* update cart */}
      <div className="listPart">
        <br></br>
        <br></br>
        <hr></hr>
        <h2>List</h2>
        {listItems.map((emp, index) => (
          <div className="list">
            <p>Name: {emp.name}</p>
            {/* <p>:</p> &nbsp; */}
            <p>Position: {emp.position}</p>
            <p>Salary: ${emp.salary}/hr</p>
          </div>
        ))}
        <h4>Total: {number}</h4>
      </div>
    </div>
  );
}

export default App;
