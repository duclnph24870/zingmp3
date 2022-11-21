const convertTime = timeS => {
    const time = Number(timeS);
    const minute = Math.floor(time / 60);
    let second = null;
    if (time > 0) {
        second = Math.floor(time) - 60*minute;
    }else {
        second = Math.floor(time);
    }

    return `${minute < 10 ? ("0"+minute) : minute}:${second < 10 ? ("0"+second) : second}`;
}

export {
    convertTime,
}