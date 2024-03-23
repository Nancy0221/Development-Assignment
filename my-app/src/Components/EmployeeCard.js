export default function EmployeeCard(props) {
  return (
    <div className="EmployeeCard">
      <img src={props.emp.image} />
      <h1>{props.emp.name}</h1>
      <p>Sex: {props.emp.sex}</p>
      <p>Position: {props.emp.position}</p>
      <p>Salary: ${props.emp.salary}/hr</p>
      {props.addtoList && (
        <button
          onClick={() => {
            props.addtoList(props.emp);
            props.total();
          }}
        >
          {" "}
          Add to list
        </button>
      )}
      {props.removeFromList && (
        <button
          onClick={() => {
            props.removeFromList(props.emp);
            props.totalAfterRemove();
          }}
        >
          Remove from list
        </button>
      )}
    </div>
  );
}
