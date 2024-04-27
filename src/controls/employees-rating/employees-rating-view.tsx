import React, { useEffect, useMemo, useState } from 'react';
import { EmployeeStatusEnum, IEmployeeRating, IEmployeeRatingDetaildEmployee } from './types';
import './employees-rating-view.css';
import EmployeesRatingProgressBar from './employees-rating-progress-bar';

interface IProps {
  entity: IEmployeeRating;
}

const EmployeesRatingView: React.FC<IProps> = ({ entity }) => {
  const [entityInstance, setEntityInstance] = useState(entity);

  const totalCount = useMemo(() => {
    let totalCount = 0;
    entityInstance.EmployeeRatingDetails?.forEach((detail) =>
      totalCount += detail.Employees?.length,
    );
    return totalCount;
  }, [entityInstance])

  const checkedCount = useMemo(() => {
    let checkedCount = 0;
    entityInstance.EmployeeRatingDetails?.forEach((detail) => {
      detail.Employees?.forEach((employee) => {
        if (employee.Status === EmployeeStatusEnum.Signed) {
          checkedCount++;
        }
      })
    })
    return checkedCount;
  }, [entityInstance]);

  function onChange(employee: IEmployeeRatingDetaildEmployee) {
    const entityCopy: IEmployeeRating = JSON.parse(JSON.stringify(entityInstance));

    const foundEmployee = entityCopy?.EmployeeRatingDetails
      ?.find((detail) => detail.Employees
        ?.find((employeeItem) => employeeItem.Id === employee.Id))
    const newEmployee = foundEmployee?.Employees?.find((employeeItem) => employeeItem.Id === employee.Id);

    if (!newEmployee) {
      return;
    }

    newEmployee.Status = employee.Status === EmployeeStatusEnum.RatingRequired ? EmployeeStatusEnum.Signed : EmployeeStatusEnum.RatingRequired;
    console.log(newEmployee, employee )
    setEntityInstance(entityCopy);
  }

  return (
    <div className='employees-rating'>
      <div className="employees-rating--header">
        <h1>{entityInstance?.DisplayValue}</h1>
        <EmployeesRatingProgressBar count={checkedCount} total={totalCount} />
      </div>
      { entityInstance?.EmployeeRatingDetails?.map((entityItem) =>
        <div
          className='employees-raing--item'
          key={entityItem.Id}
        >
          <div className='employees-rating--item__name'>
            { entityItem.DisplayValue }
          </div>
          <div className='employees-rating--item__employees'>
            {entityItem.Employees?.map((employee) =>
              <div
                key={employee.Id}
                className='employees-rating--item__employees--employee'
              >
                <span>
                  {employee.Name}
                </span>
                <input
                  type='checkbox'
                  checked={employee.Status === EmployeeStatusEnum.Signed}
                  onChange={() => onChange(employee)}
                />
              </div>)
            }
          </div>
        </div>)
      }
    </div>
  )
}

export default EmployeesRatingView;
