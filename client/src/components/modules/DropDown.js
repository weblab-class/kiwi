import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'heart', label: 'heart' },
  { value: 'brain', label: 'brain' },
  { value: 'lungs', label: 'lungs' },
  { value: 'hand', label: 'hand' },
  { value: 'legs', label: 'legs' },
  { value: 'eyes', label: 'eyes' },
  { value: 'core', label: 'core' },
  { value: 'biceps', label: 'biceps' },
  { value: 'misc', label: 'misc' }
]

const options2 = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' }
  ]

const DropDownTag = (props, {styles, label}) => {
    return <div>
        <h1>{label}</h1>
        <Select 
            styles={props.styles} 
            closeMenuOnSelect={false} isMulti 
            options={options} 
            //value={props.value}
            minMenuHeight={500}
            value={props.value}
            onChange={props.onChange}/>
        </div>
}

const DropDownFrequency = (props, {styles, label}) => {
    return <div>
        <h1>{label}</h1>
        <Select 
            styles={props.styles} 
            closeMenuOnSelect={false} 
            options={options2} 
            minMenuHeight={500}
            value={props.value}
            onChange={props.onChange}/>
        </div>
}

const DropDownMinimum = (props, {styles, label}) => {
    return <div>
        <h1>{label}</h1>
        <Select 
            styles={props.styles} 
            closeMenuOnSelect={false} 
            options={options2} 
            minMenuHeight={500}
            value={props.value}
            onChange={props.onChange}
            />
        </div>
}
export { DropDownFrequency, DropDownTag, DropDownMinimum } ;