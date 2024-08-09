function formatDate(date , isCapitalize = false) {
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
        return 'вчера в ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return 'Вчера в ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === tomorrow.toDateString()) {
      if (!isCapitalize){
        return 'завтра в ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return 'Завтра в ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === now.toDateString()) {
      if (!isCapitalize){
        return 'сегодня в ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
      }
      return 'Cегодня в ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else {
      return date.toLocaleString('ru-RU', options);
    }
  }

export default formatDate