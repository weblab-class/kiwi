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

const styles={
  select:{
      width:'25%',
      maxWidth:200,
      maxHeight:300
  }
}

const Interests = (props) => {
    return <div>
        <Select closeMenuOnSelect={false} isMulti value = {props.value} onChange = {props.onChange} options={options} styles = {styles}/>
        </div>
}
export default Interests;
