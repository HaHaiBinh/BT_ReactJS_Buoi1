import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import Banner from 'components/Banner';
import Images from 'constants/images';
import { useDispatch, useSelector } from 'react-redux';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';
import { useHistory } from 'react-router-dom';

function MainPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const photos = useSelector((state) => state.photos);
  // console.log('photos_redux', photos);
  const handleOnPhotoEditClick = (photo) => {
    console.log('edit', photo);
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  };
  const handleOnPhotoRemoveClick = (photo) => {
    // console.log('remove', photo);
    const removePhotoId = photo.id;
    const action = removePhoto(removePhotoId);
    dispatch(action);
  };
  return (
    <div className="photo-main">
      <Banner title="Your awesome photos" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>
      </Container>

      <PhotoList
        photoList={photos}
        onPhotoEditClick={handleOnPhotoEditClick}
        onPhotoRemoveClick={handleOnPhotoRemoveClick}
      />
    </div>
  );
}

MainPage.propTypes = {};

export default MainPage;
