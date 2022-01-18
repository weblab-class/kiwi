import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'heart', label: 'heart' },
  { value: 'brain', label: 'brain' },
  { value: 'lungs', label: 'lungs' },
  { value: 'hand', label: 'hand' },
  { value: 'legs', label: 'legs' },
  { value: 'eye', label: 'eye' },
  { value: 'core', label: 'core' },
  { value: 'biceps', label: 'biceps' },
  { value: 'misc', label: 'misc' },
]


const customStyles = {
  control: (base, state) => ({
  ...base,
  background: "#00000",
  // Overwrittes the different states of border
  borderColor: state.isFocused ? "black" : "black",
  // Removes weird border around container
  fontSize: 15,
  border: '1.5px solid black',
  borderRadius: '15px',
  boxShadow: state.isFocused ? null : null,
  "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#99D98C" : "#000000",
  },
  })
};

const Interests = (props) => {
    return <div>
        <Select closeMenuOnSelect={false} isMulti value = {props.value} onChange = {props.onChange} options={options} styles = {customStyles}/>
        </div>
}
export default Interests;
