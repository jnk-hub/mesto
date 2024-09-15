import React from 'react';
import PopupWithForm from './PopupWithForm';
import { UserContext } from "../contexts/UserContext";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setAbout(e.target.value);
  }

  const user = React.useContext(UserContext);
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setAbout(user.about);
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Редактировать профиль" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
          className="popup__input popup__input_type_name" placeholder="Имя"
          required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
          value={name || ''} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
          className="popup__input popup__input_type_description" placeholder="Занятие"
          required minLength="2" maxLength="200"
          value={about || ''} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
