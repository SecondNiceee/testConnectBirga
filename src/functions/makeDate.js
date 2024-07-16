function formatDate(date) {
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
      return 'вчера, ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'завтра, ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else if (date.toDateString() === now.toDateString()) {
      return 'сегодня, ' + date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric', hour12: false });
    } else {
      return date.toLocaleString('ru-RU', options);
    }
  }

export default formatDate