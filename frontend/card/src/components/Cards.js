import React from "react"
import Card from "./Card"
import ImagePopup from "./ImagePopup";
import api from "../utils/api";

import "../blocks/places/places.css";

export default function Cards() {
	const [userID, setUserID] = React.useState("")
	const [cards, setCards] = React.useState([]);
	const [selectedCard, setSelectedCard] = React.useState(null);

	function closeImagePopup() {
		setSelectedCard(null);
	}
	function handleCardClick(card) {
		setSelectedCard(card);
	}
	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === userID);
		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((cards) =>
					cards.map((c) => (c._id === card._id ? newCard : c))
				);
			})
			.catch((err) => console.log(err));
	}
	function handleCardDelete(card) {
		api
			.removeCard(card._id)
			.then(() => {
				setCards((cards) => cards.filter((c) => c._id !== card._id));
			})
			.catch((err) => console.log(err));
	}
	React.useEffect(() => {
		api
			.getCardList()
			.then((cardData) => {
				setCards(cardData);
			})
			.catch((err) => console.log(err));
	}, [history]);
	React.useEffect(() => {
		const handleAddCard = ({ detail: card }) => {
			setCards((cards) => [card, ...cards]);
		}
		addEventListener("card-add", handleAddCard);
		return () => removeEventListener("card-add", handleAddCard)
	}, []);
	React.useEffect(() => {
		api
			.getUserInfo()
			.then((userData) => setUserID(userData._id))
			.catch((err) => console.log(err))
	}, []);
	return (
		<section className="places page__section">
			<ul className="places__list">
				{cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						currentUserID={userID}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
					/>
				))}
			</ul>
			<ImagePopup card={selectedCard} onClose={closeImagePopup} />
		</section>
	)
}