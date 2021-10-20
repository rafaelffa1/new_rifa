import AsyncStorage from '@react-native-async-storage/async-storage';
import {context} from '../service/app.service';
import moment from 'moment';

export const getuserLogged = async () => {
  try {
    const userLoggedString = await AsyncStorage.getItem('@loginuser');
    return JSON.parse(userLoggedString);
  } catch (e) {
    return false;
  }
};

export const configImagens = itens => {
  return itens.split(';').map(e => e.split(','));
};

export const highlightImageRaffle = raffle => {
  return `${context}${raffle.imagem[0][0]}`;
};

export const getLinkImageRaffle = raffle => {
  return `${context}${raffle}`;
};

export const convertToSeconds = time => {
  return moment(`${time}`, 'HH:mm: A').diff(moment().startOf('day'), 'seconds');
};
