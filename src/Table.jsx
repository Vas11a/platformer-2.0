import React from 'react';
import { field } from './field';

export default function Table({ fieldHook, setFieldHook }) {
  const [tableField, setTableField] = React.useState(fieldHook);

  const changeValue = (rowI, colI, newValue) => {
    const updatedField = [...tableField];
    updatedField[rowI][colI] = newValue;
    // setTableField(updatedField);
    setFieldHook(updatedField)
  };

  return (
    <div className="container" style={{ background: 'white' }}>
      {tableField.map((row, rowI) =>
        row.map((col, colI) => (
          <div key={[rowI, colI]} className="pixel" style={{ top: `${rowI * 20}px`, left: `${colI * 20}px` }}>
            <input
              onChange={(e) => changeValue(rowI, colI, e.target.value)}
              value={col}
              style={{ width: '20px' , fontWeight: 'bold'}}
              type="text"
            />
          </div>
        ))
      )}
    </div>
  );
}

