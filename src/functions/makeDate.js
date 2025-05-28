import en from "../constants/language";

function formatDate(date, isCapitalize = false, isYearOnly = false) {
  // Если нужно вернуть только год
  if (isYearOnly) {
    return date.getFullYear().toString();
  }

  const locale = en ? 'en-EN' : 'ru-RU';

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
    hour12: false
  };

  if (date.toDateString() === yesterday.toDateString()) {
    const time = date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: false });
    if (!isCapitalize) {
      return en ? `yesterday at ${time}` : `вчера в ${time}`;
    }
    return en ? `Yesterday at ${time}` : `Вчера в ${time}`;
  } else if (date.toDateString() === tomorrow.toDateString()) {
    const time = date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: false });
    if (!isCapitalize) {
      return en ? `tomorrow at ${time}` : `завтра в ${time}`;
    }
    return en ? `Tomorrow at ${time}` : `Завтра в ${time}`;
  } else if (date.toDateString() === now.toDateString()) {
    const time = date.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: false });
    if (!isCapitalize) {
      return en ? `today at ${time}` : `сегодня в ${time}`;
    }
    return en ? `Today at ${time}` : `Сегодня в ${time}`;
  } else {
    return date.toLocaleString(locale, options);
  }
}

export default formatDate;