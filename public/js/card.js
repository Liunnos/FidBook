import axios from 'axios';
import { showAlert } from './alerts';

export const addNewCard = async (name, code) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/cards/mycard',
      data: {
        name,
        code,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'New card created succefully');
      window.setTimeout(() => {
        location.assign(`/card/${res.data.data.card.id}`);
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const editCard = async (name, code, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/cards/mycard/${id}`,
      data: {
        name,
        code,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Card modified succefully');
      window.setTimeout(() => {
        location.assign(`/card/${res.data.data.updatedCard.id}`);
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
