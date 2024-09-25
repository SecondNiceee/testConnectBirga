import en from "../constants/language";
import translation from "./translate";

function formatDate(date , isCapitalize = false) {
  if (en){
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
  
    const options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false // используйте true, если хотите использовать 12-часовой формат времени
    };
  
    if (date.toDateString() === yesterday.toDateString()) {
      if (!isCapitalize){
        return 'yesterday at ' + date.toLocaleTimeString('en-EN', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return 'Вчера в ' + date.toLocaleTimeString('en-EN', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === tomorrow.toDateString()) {
      if (!isCapitalize){
        return 'tomorrow at ' + date.toLocaleTimeString('en-EN', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return 'Tomorrow at ' + date.toLocaleTimeString('en-EN', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === now.toDateString()) {
      if (!isCapitalize){
        return 'today at ' + date.toLocaleTimeString('en-EN', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return 'Today at ' + date.toLocaleTimeString('en-EN', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else {
      return date.toLocaleString('en-EN', options);
    }
  }
  else{
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
  
    const options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false // используйте true, если хотите использовать 12-часовой формат времени
    };
  
    if (date.toDateString() === yesterday.toDateString()) {
      if (!isCapitalize){
        return translation('вчера в ') + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return translation('Вчера в ') + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === tomorrow.toDateString()) {
      if (!isCapitalize){
        return translation('завтра в ') + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return translation('Завтра в ') + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === now.toDateString()) {
      if (!isCapitalize){
        return translation('сегодня в ') + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return translation('Cегодня в ') + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else {
      return date.toLocaleString('ru-RU', options);
    }
  }

  }

export default formatDate