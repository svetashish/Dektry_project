import style from './Window.module.css';

import { useState } from 'react';

export const Window = ({ isActive, setIsActive, author, deleteImage, setDelete }) => {
  const [inputValue, setInputValue] = useState('');


  const handleButtonClick = (value) => {
    if (value) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'new notice',
          message: value,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          alert('Request has been sent');
        })
        .catch(error => console.log(error));
      setIsActive(false);
      setInputValue('');
      setDelete(!deleteImage);
    } else {
      alert('Input your message!');
    }
  };

  return (
    <div className={isActive ? style.modal_active : style.modal} onClick={() => setIsActive(false)}>
      <div className={style.modal_content} onClick={event => event.stopPropagation()}>
        Author: {author}
        <input
          className={style.input}
          type='text'
          placeholder='add text'
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <button
          className={style.button}
          onClick={() => handleButtonClick(inputValue)}
        >
          Submit
        </button>
      </div>

    </div>
  );
};
