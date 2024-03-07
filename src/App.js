import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComponent,
  toggleDisable,
  deleteComponent,
  saveFormData,
  editComponent, 
  resetComponents,
  deleteSavedFormData,
  editSavedFormData
} from './redux/formActions';
import FormComponent from './Component/FormComponent';

const App = () => {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.form?.components || []);
  const formData = useSelector((state) => state.form?.formData || []);

  const [newComponent, setNewComponent] = useState({
    type: '',
    label: '',
    value: '',
    disabled: false,
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleAddComponent = () => {
    if (newComponent.type !== '' && newComponent.label !== '') {
      if (newComponent.type === 'textbox' && !/^\d+$/.test(newComponent.value)) {
        alert('Please enter a numeric value for the "textbox" type.');
        return; // Don't proceed further if the value is not numeric for "textbox" type
      }

      if (editIndex !== null) {
        dispatch(editComponent(editIndex, { ...newComponent }));
        setEditIndex(null);
      } else {
        dispatch(addComponent(newComponent));
      }
      setNewComponent({ type: '', label: '', value: '', disabled: false });
    } else {
      alert('Please select a component type and label before adding.');
    }
  };

  const handleDeleteComponent = (index) => dispatch(deleteComponent(index));

  const handleToggleDisable = (index) => dispatch(toggleDisable(index));

  const handleEditComponent = (index) => {
    if (components && components.length > 0 && index >= 0 && index < components.length) {
      setEditIndex(index);
      setNewComponent({ ...components[index] });
    } else {
      console.error(`Component at index ${index} does not exist or components array is empty.`);
    }
  };

  const handleUpdateComponent = () => {
    if (editIndex !== null) {
      if (newComponent.type === 'textbox' && !/^\d+$/.test(newComponent.value)) {
        alert('Please enter a numeric value for the "textbox" type.');
        return; // Don't proceed further if the value is not numeric for "textbox" type
      }

      dispatch(editComponent(editIndex, { ...newComponent }));
      setEditIndex(null);
      setNewComponent({ type: '', label: '', value: '', disabled: false });
      alert("Components updated successfully. Please save the form and view changes in the saved form.");
    } else {
      console.error('No component selected for update.');
    }
  };

  const handleSaveForm = () => {
    if (components && components.length > 0) {
      const selectedComponents = components.filter(
        (component) =>
          !(component.type === 'checkbox' || component.type === 'radio') ||
          (component.type === 'checkbox' ? component.value : component.value !== '')
      );
  
      dispatch(saveFormData(selectedComponents));
      dispatch(resetComponents());
      setNewComponent({ type: '', label: '', value: '', disabled: false });
      setEditIndex(null);
    } else {
      alert('Cannot save form with no components. Add components to the form preview.');
    }
  };

  const handleEditSavedForm = (cardIndex, newFormData) => {
    dispatch(editSavedFormData(cardIndex, newFormData));
  };

  const handleDeleteSavedForm = (cardIndex) => {
    dispatch(deleteSavedFormData(cardIndex));
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Dynamic Form</h2>
      <div className="mb-4">
        <label className="mr-4">
          Component Type:
          <select
            className="ml-2 p-2 border rounded"
            name="type"
            value={newComponent.type}
            onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value })}
          >
            <option value="">Select Component Type</option>
            <option value="textbox">Textbox</option>
            <option value="textarea">Textarea</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio Button</option>
          </select>
        </label>
        <label className="mr-4">
          Label:
          <input
            className="ml-2 p-2 border rounded"
            type="text"
            name="label"
            value={newComponent.label}
            onChange={(e) => setNewComponent({ ...newComponent, label: e.target.value })}
          />
        </label>
        <label className="mr-4">
          Value:
          <input
            className="ml-2 p-2 border rounded"
            type="text"
            name="value"
            value={newComponent.value}
            onChange={(e) => setNewComponent({ ...newComponent, value: e.target.value })}
          />
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={editIndex !== null ? handleUpdateComponent : handleAddComponent}
        >
          {editIndex !== null ? 'Update Component' : 'Add Component'}
        </button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Form Preview</h3>
        {components && components.length > 0 ? (
          components.map((component, index) => (
            <FormComponent
  key={index}
  index={index}
  label={component.label}
  type={component.type}
  options={component.options || []}
  value={component.value}
  disabled={component.disabled}
  onToggleDisable={() => handleToggleDisable(index)}
  onEdit={() => handleEditComponent(index)}
  onDelete={() => handleDeleteComponent(index)}
/>

          ))
        ) : (
          <p>No components added yet.</p>
        )}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleSaveForm}
        >
          Save Form
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Saved Form Data</h3>
        {formData && formData.length > 0 ? (
          formData.map((data, cardIndex) => (
            <div key={cardIndex} className="mb-4 p-4 bg-white rounded shadow">
              <h4 className="text-lg font-bold mb-2">Card {cardIndex + 1}</h4>
              {data.map((item, itemIndex) => (
                <p key={itemIndex} className="mb-1">
                  <strong>{item.label}:</strong> {item.value}
                </p>
              ))}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleEditSavedForm(cardIndex, data)}
              >
                Edit Card
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteSavedForm(cardIndex)}
              >
                Delete Card
              </button>
            </div>
          ))
        ) : (
          <p>No saved form data.</p>
        )}
      </div>
    </div>
  );
};

export default App;
