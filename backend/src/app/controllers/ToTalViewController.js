const TotalViewModule = require('../modules/TotalViewModule');

class TotalViewController {
    async counterTotalView (req,res) {
        // lấy ra tháng và năm của hiện tại
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const dayNumber = new Date().getDate();

        try {
            const check = await TotalViewModule.findOne({ year});

            if (check) {
                // nếu tồn tại rồi
                const viewDay = check.totalView[month-1][dayNumber-1] + 1;
                const key = `totalView.${month - 1}.${dayNumber-1}`;
                const totalUpdate = await TotalViewModule.findOneAndUpdate({year: year},{ 
                    $set: { [key]: viewDay }
                },{ new: true });

                return res.json({
                    message: 'đã tồn tại',
                    key,
                    totalUpdate,
                });
            }else {
                // nếu chưa tồn tại
                const newToTal = await new TotalViewModule({
                    year: year,
                }).save();

                return res.json({
                    newToTal
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server',
            });
        }

    }
}

module.exports = new TotalViewController;