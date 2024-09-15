import React, { useEffect, useState } from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup.js"
import AddPlacePopup from "./AddPlacePopup.js";
import { UserContext } from "../contexts/UserContext.js";
import api from "../utils/api";

import "../blocks/profile/profile.css"

export default function Profile() {
	const [user, setUser] = useState({});
	const imageStyle = { backgroundImage: `url(${user.avatar})` };
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	function closePopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
	}

	function handleUpdateAvatar(avatarUpdate) {
		api
			.setUserAvatar(avatarUpdate)
			.then((newUserData) => {
				setUser(newUserData);
				closePopups();
			})
			.catch((err) => console.log(err));
	}
	function handleUpdateUser(userUpdate) {
		console.log(userUpdate)
		api
			.setUserInfo(userUpdate)
			.then((newUserData) => {
				setUser(newUserData);
				closePopups();
			})
			.catch((err) => console.log(err));
	}
	function handleAddPlaceSubmit(newCard) {
		api
			.addCard(newCard)
			.then((newCard) => {
				dispatchEvent(new CustomEvent("card-add", { detail: newCard }));
				closePopups();
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		api
			.getUserInfo()
			.then((userData) => setUser(userData))
			.catch((err) => console.log(err))
	}, []);

	return (
		<UserContext.Provider value={user}>
			<section className="profile page__section">
				<div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onUpdateAvatar={handleUpdateAvatar}
					onClose={closePopups}
				/>

				<div className="profile__info">
					<h1 className="profile__title">{user.name}</h1>
					<button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
					<p className="profile__description">{user.about}</p>
				</div>
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					user={user}
					onUpdateUser={handleUpdateUser}
					onClose={closePopups}
				/>

				<button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onAddPlace={handleAddPlaceSubmit}
					onClose={closePopups}
				/>
			</section>
		</UserContext.Provider>
	);
}