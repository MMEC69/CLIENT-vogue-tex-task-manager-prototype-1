import React, { useState } from 'react'
import styles from "../ComponentCSS/ComponentCSS.module.css";
import Select from "react-dropdown-select"; 
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../ComponentCSS/other.css";
import { formErrMsgHandler } from "../../Functions/FormValidation";

export function Field1(props) {
  const [focused, setFocused] = useState(false);
  const {
      labelName,
      type,
      placeholder,
      autoComplete,
      name,
      value,
      onChange,
      required,
      pattern
  } = props

  const errMsg = formErrMsgHandler(name);

  const handleFocus = () => {
    setFocused(true);
  }
  return (
    <div className = {styles.fieldS1} >
        <label htmlFor={name}>{labelName}: </label>
        <input 
          type = {type}
          placeholder = {placeholder}
          autoComplete = {autoComplete}
          name = {name}
          value = {value}
          onChange = {onChange} 
          required = {required}
          pattern={pattern}
          onBlur={handleFocus}
          onFocus={(e) => name === "confirmPassword" && setFocused(true)}
          focused = {focused.toString()} 
        />
        <span>{errMsg}</span>
    </div>
  );
}

export function Field2(props) {
  const [focused, setFocused] = useState(false);
  const {
      labelName,
      type,
      placeholder,
      autoComplete,
      name,
      value,
      onChange,
      required,
      pattern
  } = props;
  const errMsg = formErrMsgHandler(name);

  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className = {styles.fieldS1} >
      <label htmlFor={name}>{labelName}: </label>
      {/* Need to change this into input -> textare, use css to convert input look like text area */}
      <input 
        type = {type}
        placeholder = {placeholder}
        autoComplete = {autoComplete}
        name = {name}
        value = {value}
        onChange = {onChange} 
        required = {required}
        pattern={pattern}
        onBlur={handleFocus}
        onFocus={(e) => name === "confirmPassword" && setFocused(true)}
        focused = {focused.toString()} 
      />
      <span>{errMsg}</span>
    </div>
  );
}

export function Field3(props) {
  const [focused, setFocused] = useState(false);
  const {
      labelName,
      type,
      placeholder,
      autoComplete,
      name,
      value,
      onChange,
      required,
      pattern
  } = props;
  const errMsg = formErrMsgHandler(name);

  const handleFocus = () => {
    setFocused(true);
  };
return (
  <div className = {styles.fieldS1}>
      <label htmlFor={name}>{labelName}: </label>
      <input
          style={{textAlign:'center'}}
          type = {type}
          placeholder = {placeholder}
          autoComplete = {autoComplete}
          name = {name}
          value = {value}
          onChange = {onChange}  
          required = {required}
          pattern={pattern}
          onBlur={handleFocus}
          onFocus={(e) => name === "confirmPassword" && setFocused(true)}
          focused = {focused.toString()}
      />
      <span>{errMsg}</span>
  </div>
);
}

//For date picker
export function DField1(props) {
    const {
        labelName,
        placeholder,
        value,
        min,
        max,
        onChange
    } = props
  return (
    <div className = {styles.fieldS1} >
        <label>{labelName}: </label>
        <DatePickerComponent 
            placeholder = {placeholder}
            min={min}
            max={max}
            value = {value}
            onChange = {onChange}  
        />
    </div>
  )
}

//for multi selections
export function MSField1(props) {
    const {
        alert,
        labelName,
        name,
        options,
        labelField,
        valueField,
        onChange,
        onBlur
    } = props
  return (
    <div className = {styles.fieldS2} >
        <p>{alert}</p>
        <label htmlFor={name}>{labelName}: </label>
        <Select
            name = {name}
            options = {options}
            labelField= {labelField}
            valueField= {valueField}
            multi
            searchable = "true"
            onChange= {onChange}
            placeholder=""
            onBlur = {onBlur}
        />
    </div>
  )
}

//for single selections
export function SSField1(props) {
    const {
        labelName,
        name,
        options,
        labelField,
        valueField,
        onChange
    } = props
  return (
    <div className = {styles.fieldS2} >
        <label htmlFor={name}>{labelName}: </label>
        <Select
            name = {name}
            options = {options}
            labelField= {labelField}
            valueField= {valueField}
            searchable = "true"
            onChange= {onChange}
            placeholder=""
        />
    </div>
  )
}

//button
export function SubmitBtn1(props) {
    const {
      buttonName,
      type,
      onClick
    } = props;
  return (
    <div className = {styles.sButton1} >
        <button 
          type = {type} 
          onClick = {onClick}
        >{buttonName}</button>
    </div>
  )
}

export function SubmitBtn2(props) {
  const {
    buttonName,
    type,
    onClick
  } = props;
return (
  <div className = {styles.sButton2} >
      <button 
        type = {type} 
        onClick = {onClick}
      >{buttonName}</button>
  </div>
)
}

export function SubmitBtn3(props) {
  const {
    buttonName,
    type,
    onClick
  } = props;
return (
  <div className = {styles.sButton3} >
      <button 
        type = {type} 
        onClick = {onClick}
      >{buttonName}</button>
  </div>
)
}

//radio btn
export function Radio1(props) {
  const {
    labelName,
    name,
    value,
    checked,
    onChange,
    id
  } = props;
return (
  <div className = {styles.radio1} key={id+name+value}>
    <label htmlFor={id+name+value}>{labelName}</label>
    <input 
        type="radio" 
        name={name}
        value={value}
        checked = {checked}
        onChange={onChange}
        id={id+name+value}
    />
  </div>
)
}
