const CREATE_OFFER = 'offer/CREATE_OFFER';
const SET_NEAR_OFFERS = 'offer/SET_NEAR_OFFERS';
const EDIT_OFFER = 'offer/EDIT_OFFER';
const REMOVE_OFFER = 'offer/REMOVE_OFFER';

const initialState = { nearOffers: null };

export const addOffer = (newOffer) => async (dispatch) => {
    const res = await fetch('/api/offers/new')
}
