import React, { useState, useEffect } from 'react';

const FormComponent = ({ index, label, type, value, disabled, onToggleDisable, onEdit, onDelete }) => {
  const [editedValue, setEditedValue] = useState(value);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleChange = (e) => {
    let newValue;  

    if (type === 'textbox') {
      // Allow only numeric values in the "textbox" type
      newValue = e.target.value.replace(/[^0-9]/g, '');
    } else {
      newValue = type === 'checkbox' ? e.target.checked : e.target.value;
    }

    setEditedValue(newValue);
  };

  const handleEdit = () => {
    onEdit(index, { ...{ label, type, value: editedValue, disabled } });
  };
  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <label className="block mb-2">
        <span className="font-bold">{label}:</span>
        {type === 'textbox' && <input type="number" className="ml-2 p-2 border rounded" value={editedValue} disabled={disabled} onChange={handleChange} />}
        {type === 'textarea' && <textarea className="ml-2 p-2 border rounded" value={editedValue} disabled={disabled} onChange={handleChange} />}
        {type === 'checkbox' && <input type="checkbox" className="ml-2" checked={editedValue} disabled={disabled} onChange={handleChange} />}
        {type === 'radio' && <input type="radio" className="ml-2" checked={editedValue} disabled={disabled} onChange={handleChange} />}
      </label>
      <div className="flex items-center">
        <button
          className={`bg-${disabled ? 'green' : 'red'}-500 text-white px-4 py-2 rounded mr-2 hover:bg-${disabled ? 'green' : 'red'}-600 focus:outline-none focus:shadow-outline-${disabled ? 'green' : 'red'}`}
          onClick={onToggleDisable}
        >
          {disabled ? 'Enable' : 'Disable'}
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
