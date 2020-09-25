import config from '../config/index';
import { VIEW_COUNT_FORMATS, response_type, access_type, prompt } from '../common/constants';
import moment from 'moment';

export const generateAuthUrl = () => {
   return `${config.BASE_AUTH_ENDPOINT}?redirect_uri=${encodeURIComponent(process.env.REACT_APP_CALLBACK_URL)}&prompt=${prompt}&response_type=${response_type}&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${config.API_SCOPES.map(s => encodeURIComponent(s)).join("+")}&access_type=${access_type}`;
};

export const generateUploadVideoUrl = (channelId: string) => {
  return `https://studio.youtube.com/channel/${channelId}/videos/upload?d=ud&filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D`;
}

export const viewCountFormatter = (count: string) => {
  let parsedCount = parseInt(count);

  if(parsedCount) {
    const format = VIEW_COUNT_FORMATS.find(format => (parsedCount < format.limit));

    parsedCount = (1000 * parsedCount / format.limit);
    parsedCount = Math.round(parsedCount * 10) / 10;

    return (parsedCount + format.letter);
  }
  
  return null;
}

const checkIfTwoDecimalPlaces = (val: number) => {
  if(val < 9) {
    return `0${val}`
  } else {
    return val;
  }
}

export const timeDurationFormatter = (time: string) => {
  let { _data }: any = moment.duration(time);

  if(_data.hours && _data.hours > 0) {
    return `${_data.hours}:${checkIfTwoDecimalPlaces(_data.minutes)}:${checkIfTwoDecimalPlaces(_data.seconds)}`;
  } else {
    return `${_data.minutes}:${checkIfTwoDecimalPlaces(_data.seconds)}`;
  }
}

export const relativeDateFormatter = (date: string) => {
  return moment(date).fromNow();
}

export const calendarTimeFormatter = (date: string) => {
  return moment(date).format("ll");
}