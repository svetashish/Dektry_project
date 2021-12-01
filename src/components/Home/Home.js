import { useEffect, useState } from 'react';
import { RequestAPI } from '../../services/requestAPI';
import styles from './Home.module.css';
import { Window } from '../Window/Window';

export const Home = () => {
  const [urlImages, setUrlImages] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [deleteImage, setDeleteImage] = useState('false');
  const [deleteId, setDeleteId] = useState(0);

  const loadUrlImages = async () => {
    const data = await RequestAPI();
    if (data && data.length > 0) setUrlImages(data);
  };

  const handleOnClick = (author, id) => {
    setIsModalActive(true);
    setCurrentAuthor(author);
    setDeleteId(id);
  };

  useEffect(() => {
    loadUrlImages();
  }, []);


  useEffect(() => {
    setUrlImages(urlImages.filter(image => image.id !== deleteId));
  }, [deleteImage]);


  return (
    <div>
      <ul>{urlImages.map(image =>
        <li key={image.id}
            className={styles.list_images}
        >
          <img style={{ width: `${image.width / 5}px`, height: `${image.height / 5}px` }}
               src={image.download_url}
               alt={image.author}
               onClick={() => handleOnClick(image.author, image.id)}
          />
        </li>)}
      </ul>
      <div>
        <Window
          isActive={isModalActive}
          setIsActive={setIsModalActive}
          author={currentAuthor}
          deleteImage={deleteImage}
          setDelete={setDeleteImage}
        />
      </div>
    </div>
  );
};
