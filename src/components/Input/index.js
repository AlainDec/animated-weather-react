import { useState } from 'react';
import './styles.scss';

function Input({ handleInputValue }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleInputValue(inputValue);
  }
  const handleOnChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        type="text"
        placeholder="Entrez un code postal ou une ville"
        onChange={handleOnChangeInput}
        value={inputValue}
      />
    </form>
  );
}

export default Input;
