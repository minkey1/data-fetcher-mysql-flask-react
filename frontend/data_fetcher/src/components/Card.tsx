// Card.tsx

interface Employee {
  city: string;
  department: string;
  employee_id: number;
  first_name: string;
  hire_date: string;
  last_name: string;
}

interface CardProps {
  employee: Employee;
}

function Card({ employee } : CardProps) {
  return (
    <div className="card flex py-5 justify-between">
      <div className="pr-20 text-left">
        <h2 className="text-2xl font-bold underline">
          {`${employee.first_name} ${employee.last_name}`}
        </h2>
        <p>ID: {employee.employee_id}</p>   
      </div>
      <div className="text-right">
        <p>Department: {employee.department}</p>
        <p>City: {employee.city}</p>
        <p>Hire Date: {new Date(employee.hire_date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Card;