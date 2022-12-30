// lấy ra số ngày của 1 năm từ tháng 1 đến tháng 12
function get_day_of_month (year) {
    const dayArr = [];
    for (let i = 1;i <= 12 ;i++) {
        // lấy ra số ngày của tháng 1 đến tháng 12
        dayArr.push(new Date(year, i, 0).getDate());
    }
    return dayArr;
}

// lấy ra số ngày của 1 tháng năm bất kỳ
function getDayOfMonth (month,year) {
    return new Date(year, month, 0).getDate();
}

function createCouter (autoView = false) {
    let result = [];
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const year = new Date().getFullYear();
    for (let i = 1; i <= 12;i++) {
        const numberDay = getDayOfMonth(i,year);
        let monthArr = []; 
        for (let j = 1; j <= numberDay; j++) {
            monthArr.push(0);
        }

        result.push(monthArr);
    }

    if (autoView === true) {
        result[month - 1][day - 1] = 1
        return result;
    }

    return result;
}

module.exports = {
    getDayOfMonth,
    get_day_of_month,
    createCouter
}