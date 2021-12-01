import { useEffect, useState } from 'react';
import { RequestAPI } from '../../services/requestAPI';
import styles from './Home.module.css';
import { Window } from '../Window/Window';

export const Home = () => {
  const [urlImages, setUrlImages] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState('');

  const loadUrlImages = async () => {
    const data = await RequestAPI();
    if (data && data.length > 0) setUrlImages(data);
  };

  const handleOnClick = (author, id) => {
    setModalActive(true);
    setCurrentAuthor(author);
    setUrlImages(urlImages.filter(image => image.id !== id));
  };

  useEffect(() => {
    loadUrlImages();
  }, []);

  return (
    <div>
      <ul>{urlImages.map(image =>
        <li key={image.id}
            className={styles.list_images}
        >
          <img style={{ width: `${image.width / 5}px`, height: `${image.height / 5}px` }}
               src={image.download_url}
               alt={'images'}
               onClick={() => handleOnClick(image.author, image.id)}
          />
        </li>)}
      </ul>
      <div>
        <Window
          active={modalActive}
          setActive={setModalActive}
          author={currentAuthor}
        />
      </div>
    </div>
  );
};
