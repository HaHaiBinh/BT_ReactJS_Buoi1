import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import PhotoForm from 'features/Photo/components/PhotoForm';
import Banner from 'components/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from 'utils/common';

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  {
    /*
    Dựa vào route để xác định /add: thêm còn /photoId: edit 
    <Route path={`${match.url}/add`} component={AddEditPage} />
    <Route path={`${match.url}/:photoId`} component={AddEditPage} />
  */
  }

  const isAddMore = !photoId; // nếu thêm thì k có photoId

  const editedPhoto = useSelector(
    (state) => state.photos.find((item) => item.id === +photoId) // convert photoId từ 'string' -> number
  );
  console.log('editedPhoto: ', editedPhoto);

  const initialValues = isAddMore
    ? {
        title: '',
        categoryId: null,
        photo: '',
      }
    : editedPhoto;

  const handleObSubmit = (values) => {
    return new Promise((resolve) => {
      console.log('Submit form: ', values);

      setTimeout(() => {
        if (isAddMore) {
          // add photo
          const newPhoto = {
            ...values,
            id: randomNumber(10000, 99999),
          };
          const action = addPhoto(newPhoto);
          console.log('action: ', action);
          dispatch(action);
        } else {
          // update photo
          const action = updatePhoto(values);
          dispatch(action);
        }

        history.push('/photos');
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />
      <div className="photo-edit__form">
        <PhotoForm
          isAddMore={isAddMore}
          initialValues={initialValues}
          onSubmit={handleObSubmit}
        />
      </div>
    </div>
  );
}

AddEditPage.propTypes = {};

export default AddEditPage;
