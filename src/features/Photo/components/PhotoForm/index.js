import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import Images from 'constants/images';
import PHOTO_CATEGORY_OPTIONS from 'constants/global';
import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as Yup from 'yup';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};
PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm(props) {
  const { initialValues, isAddMore } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required.'),
    categoryId: Yup.number().required('This field is required.').nullable(),
    photo: Yup.string().required('This field is required.'),
    // photo: Yup.string().when('categoryId', {
    //   is: 1,
    //   then: Yup.string().required('This field is required.'),
    //   otherwise: Yup.string().notRequired(),
    // }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        // do something here

        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });
        return (
          <Form>
            {/* FastField: chỉ re-render khi ta tác động lên chính field của nó còn field khác thì không re-render --- Còn Field là khi thay đổi nó hoặc thay đổi field khác thì vẫn re-render như bình thường ->> nên dùng FastField */}

            <FastField
              // props: của FastField
              name="title"
              component={InputField}
              // props: truyền vào InputField
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              // props: của FastField
              name="categoryId"
              component={SelectField}
              // props: truyền vào SelectField
              label="Category"
              placeholder="What 's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              // props: của FastField
              name="photo"
              component={RandomPhotoField}
              // props: truyền vào SelectField
              label="Photo"
            />

            <FormGroup>
              <Button type="submit" color={isAddMore ? 'primary' : 'success'}>
                {isSubmitting && <Spinner size="sm" />}
                {isAddMore ? 'Add to album' : 'Update your photo'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
