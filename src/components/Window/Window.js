import style from './Window.module.css';
import { useState } from 'react';

export const Window = ({ active, setActive, author }) => {
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
        });
      setActive(false);
      setInputValue('');
    } else {
      alert('Input your message!');
    }

  };

  return (
    <div className={active ? style.modal_active : style.modal} onClick={() => setActive(false)}>
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
