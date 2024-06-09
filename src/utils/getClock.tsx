export const getClock = () => {
  const hours = new Date().getHours();
  const clock = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  let emoji;
  let comment;

  switch (hours) {
    case 1:
    case 13:
      emoji = "🕛";
      break;
    case 2:
    case 14:
      emoji = "🕐";
      break;
    case 3:
    case 15:
      emoji = "🕒";
      break;
    case 4:
    case 16:
      emoji = "🕓";
      break;
    case 5:
    case 17:
      emoji = "🕔";
      break;
    case 6:
    case 18:
      emoji = "🕕";
      break;
    case 7:
    case 19:
      emoji = "🕖";
      break;
    case 8:
    case 20:
      emoji = "🕗";
      break;
    case 9:
    case 21:
      emoji = "🕘";
      break;
    case 10:
    case 22:
      emoji = "🕙";
      break;
    default:
      emoji = "🕚";
  }

  if (0 <= hours && hours < 6) {
    comment = "편안한 밤 되세요!";
  } else if (6 <= hours && hours < 12) {
    comment = "오늘도 힘찬 하루 되시길 바래요!";
  } else if (12 <= hours && hours < 14) {
    comment = "맛점하세요!";
  } else if (14 <= hours && hours < 18) {
    comment = "오후도 화이팅!";
  } else {
    comment = "오늘 하루도 고생 많았어요!";
  }

  const message = `${clock}시네요 ${emoji}
  
  ${comment}`;

  return message;
};
