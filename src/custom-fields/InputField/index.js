import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

InputField.propTypes = {
  // props của formik
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  // props mình định nghĩa thêm cho InputField
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};
InputField.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
};

function InputField(props) {
  const {
    // props của FastField (formik)
    field,
    form,
    // props của mình tự định nghĩa thêm
    label,
    type,
    placeholder,
    disabled,
  } = props;

  const { name, value, onChange, onBlur } = field; // field: luôn có 4 props như này

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={name}
        // có thể dùng: {...field} vì {name, value, onChange, onBlur} có trong field
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        // các props mình tự định nghĩa
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        invalid={showError} // phải có invalid mới dùng được FormFeedback
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
