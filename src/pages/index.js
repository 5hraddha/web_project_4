// ********************************************************************************************* //
//                                Import Modules and Constants                                   //
// ********************************************************************************************* //
// Import main stylesheet
import "../pages/index.css";

// Import modules
import Card                 from "../components/Card.js";
import FormValidator        from "../components/FormValidator.js";
import PopupWithForm        from "../components/PopupWithForm.js";
import PopupWithImage       from "../components/PopupWithImage";
import Section              from "../components/Section.js";
import UserInfo             from "../components/UserInfo.js"

// Import Initial Card Data
import { initialCards }       from "../utils/constants.js";

// Import logo and profile picture
import pageLogoUrl          from "../images/logo.svg";
import profilePicUrl        from "../images/profile-avatar.jpeg";

// Import page logo and profile picture Elements
import {
  pageLogoElement,
  profilePicElement } from "../utils/constants.js";

// Import required constants from User Profile
import {
  editProfileBtn,
  profileTitle,
  profileSubtitle,
} from "../utils/constants.js";

// Import required constants from Edit User Profile Popup
import {
  editProfilePopupForm,
  editProfileNameInput,
  editProfileAboutInput
} from "../utils/constants.js";

// Import required constants needed for adding new Image
import { addImgBtn } from "../utils/constants.js";

// Import required constants from Add New Image Popup
import { addImgPopupForm } from "../utils/constants.js";

// Import Form Validation Settings
import { formValidationSettings } from "../utils/constants.js";

// ********************************************************************************************* //
//                              Setting pictures on the webpage                                  //
// ********************************************************************************************* //

// Set Logo and Profile Picture
pageLogoElement.src   = pageLogoUrl;
profilePicElement.src = profilePicUrl;


// ********************************************************************************************* //
//                                      Form Validations                                         //
// ********************************************************************************************* //
// Implement form validations for all the forms
const editProfileFormValidator  = new FormValidator(formValidationSettings, editProfilePopupForm);
const addImgFormValidator       = new FormValidator(formValidationSettings, addImgPopupForm);
editProfileFormValidator.enableValidation();
addImgFormValidator.enableValidation();

// ********************************************************************************************* //
//                            Add Intial Image Cards on Page Load                                //
// ********************************************************************************************* //
// Initialize Image Popup
const imgPopup = new PopupWithImage(".popup_rel_image");
imgPopup.setEventListeners();

// Function that returns new Image card
const getNewImgCard = item => {
  const newImgCardSetttings = {
    card: item,
    handleCardClick: (name, link) => {
      imgPopup.open(name, link);
    }
  };
  const newImg = new Card(newImgCardSetttings, "#element-template");
  return newImg;
}

// Function that renders each image card to the DOM
const renderImgCard = item => {
  const newImgCardElement = getNewImgCard(item).generateCard();
  imgCardsList.addItem(newImgCardElement);
}

// Add intial cards on page load
const imgCardsList = new Section({ items: initialCards, renderer: renderImgCard}, ".elements");
imgCardsList.renderItems();

// ********************************************************************************************* //
//                            Add Intial User Info on Page Load                                  //
// ********************************************************************************************* //

// Add user info on page load
const user = new UserInfo({
  userTitleSelector: ".profile__title",
  userSubtitleSelector: ".profile__subtitle"});
const currentUserTitle    = profileTitle.textContent;
const currentUserSubtitle = profileSubtitle.textContent;
user.setUserInfo(currentUserTitle, currentUserSubtitle);

// ********************************************************************************************* //
//                  Initialize all Popups and Set Event Listeners on them                        //
// ********************************************************************************************* //

// Initialize Edit Profile Popup
const handleEditProfileFormSubmit = ({title, subtitle}) =>{
  user.setUserInfo(title, subtitle);
  editProfilePopup.close();
  editProfileFormValidator.toggleButtonState();
}
const editProfilePopup = new PopupWithForm(".popup_rel_profile", handleEditProfileFormSubmit);
editProfilePopup.setEventListeners();

// Initialize Add Image Popup
const handleAddImgFormSubmit = ({name, link}) => {
  imgCardsList.addItem(getNewImgCard({name, link}).generateCard());
  addImgPopup.close();
  addImgFormValidator.toggleButtonState();
}
const addImgPopup = new PopupWithForm(".popup_rel_place", handleAddImgFormSubmit);
addImgPopup.setEventListeners();

// ********************************************************************************************* //
//                  Set Event Listeners on all the buttons on the webpage                        //
// ********************************************************************************************* //

// Add Event Listener to Profile Edit Button
const handleEditProfile = () => {
  const {title, subtitle} = user.getUserInfo();
  editProfileNameInput.value = title;
  editProfileAboutInput.value = subtitle;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}
editProfileBtn.addEventListener("click", handleEditProfile);

// Add Event Listener to Add Image Button
const handleAddImg = () => {
  addImgPopup.open();
  addImgFormValidator.toggleButtonState();
}
addImgBtn.addEventListener("click", handleAddImg);