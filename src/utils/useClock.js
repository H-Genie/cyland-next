export const useClock = () => {
    const hours = new Date().getHours();
    const clock =
        hours > 12 ?
            hours - 12 :
            hours === 0 ? 12 : hours;

    let comment;
    if (0 <= hours && hours < 6) {
        comment = '편안한 밤 되세요!';
    } else if (6 <= hours && hours < 12) {
        comment = '오늘도 힘찬 하루 되시길 바래요!';
    } else if (12 <= hours && hours < 14) {
        comment = '맛점하세요!';
    } else if (14 <= hours && hours < 18) {
        comment = '오후도 화이팅!';
    } else {
        comment = '오늘 하루도 고생 많았어요!';
    }

    let emoji;
    if (hours === 0 || hours === 12) {
        emoji = '🕛';
    } else if (hours === 1 || hours === 13) {
        emoji = '🕐';
    } else if (hours === 2 || hours === 14) {
        emoji = '🕑';
    } else if (hours === 3 || hours === 15) {
        emoji = '🕒';
    } else if (hours === 4 || hours === 16) {
        emoji = '🕓';
    } else if (hours === 5 || hours === 17) {
        emoji = '🕔';
    } else if (hours === 6 || hours === 18) {
        emoji = '🕕';
    } else if (hours === 7 || hours === 19) {
        emoji = '🕖';
    } else if (hours === 8 || hours === 20) {
        emoji = '🕗';
    } else if (hours === 9 || hours === 21) {
        emoji = '🕘';
    } else if (hours === 10 || hours === 22) {
        emoji = '🕙';
    } else {
        emoji = '🕚';
    }

    const message = `${clock}시네요 ${emoji}

${comment}`;

    return message;
}