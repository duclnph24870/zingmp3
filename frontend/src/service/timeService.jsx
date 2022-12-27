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

const time_distance_current = (time) => {
    const current = new Date();
    const time_count = new Date(time);

    if (!time) {
        return true;
    }
    
    const get_day_of_time = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (1000));
    };

    const late = get_day_of_time(time_count, current);
    console.log(late);

    return late >= 30 ? true : false;
}


const time_distance_current2 = (time) => {
    const current = new Date();
    const time_count = new Date(time);
    
    const get_day_of_time2 = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (1000*60));
    };

    const late = get_day_of_time2(time_count,current);

    let thoiGian;
    if (late <= 1) {
       thoiGian = 'Vừa xong';
    }else if (late > 1 && late < 60) {
       thoiGian = Math.floor(late)+' phút trước';
    }else if (late >= 60 && late< 1440) {
       thoiGian = Math.floor(late/60)+' giờ trước';
    }else if (late >= 1440 && late<43200) {
       thoiGian = Math.floor(late/1440)+' ngày trước';
    }else if (late >= 43200 && late<518400) {
       thoiGian = Math.floor(late/43200)+' tháng trước';
    }else if (late>=518400) {
       thoiGian = Math.floor(late/518400)+' năm trước';
    }
    return thoiGian;
}
export {
    convertTime,
    time_distance_current,
    time_distance_current2
}