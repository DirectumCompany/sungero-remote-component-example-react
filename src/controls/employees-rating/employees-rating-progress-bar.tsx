import React, { useMemo } from 'react';

interface IProps {
  count: number;
  total: number;
}

const EmployeesRatingProgressBar: React.FC<IProps> = ({ count, total }) => {
  const style = useMemo(() => {
    return {
      width: count / total * 100 + '%',
    }
  }, [count, total])

  return (
    <div className='employees-rating--progress'>
      <div
        className='employees-rating--progress__bar'
        style={style}
      >
        { count / total * 100 } %

      </div>
    </div>
  )
}

export default EmployeesRatingProgressBar;
