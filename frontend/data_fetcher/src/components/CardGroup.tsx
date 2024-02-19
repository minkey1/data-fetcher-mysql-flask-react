// CardGroup.tsx
import Card from './Card';

interface Employee {
  city: string;
  department: string;
  employee_id: number;
  first_name: string;
  hire_date: string;
  last_name: string;
}

interface CardGroupProps {
  employees: Employee[];
}

function CardGroup({ employees }: CardGroupProps) {
  return (
    
    <div className="card-group h-96 overflow-y-scroll flex flex-col border rounded-xl p-1 border-black">
      {employees.map(employee => (
        <Card key={employee.employee_id} employee={employee} />
      ))}
    </div>
  );
}

export default CardGroup;
