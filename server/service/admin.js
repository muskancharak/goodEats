import Model from "../model/index.js";
import { CONSTANTS } from "../utils/constants.js";
import mongoose from "mongoose";

//get all user count
export const getAllData = async () => {
    try {

        const date = new Date(); // today
        const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday

        const firstDayOfWeeks = new Date(date); // copy
        firstDayOfWeeks.setDate(date.getDate() - dayOfWeek); // go back to Sunday
        firstDayOfWeeks.setHours(0, 0, 0, 0); // start of the day

        //lastday of weel
        const lastDayOfWeek = new Date(firstDayOfWeeks);
        lastDayOfWeek.setDate(firstDayOfWeeks.getDate() + 6);
        lastDayOfWeek.setHours(23, 59, 59, 999);

        const now = new Date();

        // First day of month
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        firstDayOfMonth.setHours(0, 0, 0, 0);

        // Last day of first week = 7th day of month
        const lastDayOfFirstWeek = new Date(now.getFullYear(), now.getMonth(), 7);
        lastDayOfFirstWeek.setHours(23, 59, 59, 999);

        const dailyCounts = await Model.User.aggregate([
            {
                $match: { createdAt: { $gte: firstDayOfWeeks, $lte: lastDayOfWeek } }
            },
            {
                $addFields: { dayOfWeek: { $dayOfWeek: "$createdAt" } } // 1=Sunday ... 7=Saturday
            },
            {
                $group: {
                    _id: "$dayOfWeek",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Array of day names 
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


        const completeDaysCounts = Array.from({ length: 7 }, (_, i) => {
            const found = dailyCounts.find(item => item._id === i + 1);
            return {
                day: dayNames[i],
                count: found ? found.count : 0
            };
        });

        console.log(completeDaysCounts);


        //weekly     
        const year = now.getFullYear();
        const month = now.getMonth(); // 0=Jan, 11=Dec


        // Total days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Day of week of first day of month (0=Sun, 6=Sat)
        const firstDayOfWeek = new Date(year, month, 1).getDay();


        const weeklyCounts = await Model.User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(now.getFullYear(), now.getMonth(), 1),
                        $lte: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                    }
                }
            },
            {
                $addFields: {
                    weekOfMonth: {
                        $add: [
                            { $floor: { $divide: [{ $subtract: [{ $dayOfMonth: "$createdAt" }, 1] }, 7] } },
                            1
                        ]
                    }
                }
            },

            {
                $group: {
                    _id: "$weekOfMonth",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        // Total  weeks in month
        const totalWeeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
        const completeWeeklyCounts = Array.from({ length: totalWeeks }, (_, i) => {
            const found = weeklyCounts.find(item => item._id === i + 1);
            return {
                week: `Week ${i + 1}`,     // map 1->Sunday, 2->Monday...
                count: found ? found.count : 0
            };
        });
        console.log(completeWeeklyCounts)


        //monthly

        const startYear = now.getFullYear();
        const endYear = now.getFullYear();
        const monthlyCount = await Model.User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(now.getFullYear(), 0, 1),
                        $lte: new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
                    }
                }
            },
            {
                $addFields: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    count: { $sum: 1 }
                }
            },
        ]);
        const totalMonths = ["January", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const completeMonthsCounts = Array.from({ length: 12 }, (_, i) => {
            const found = monthlyCount.find(item => item._id === i + 1);
            return {
                month: totalMonths[i],
                count: found ? found.count : 0
            };
        });
        console.log(completeMonthsCounts);

        //yearly based
        const currentYear = new Date().getFullYear();
        const startCountingYear = currentYear - 2;
        const endCountingYear = currentYear;
        const yearlyCounts = await Model.User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startCountingYear, 0, 1),           // Jan 1 of the year you want
                        $lte: new Date(endCountingYear, 11, 31, 23, 59, 59, 999) // Dec 31 of that year
                    }
                }
            },
            {
                $addFields: {
                    year: { $year: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$year",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const allYears = Array.from({ length: 3 }, (_, i) => currentYear - i);

        const completeYearlyCounts = allYears.map(year => {
            const found = yearlyCounts.find(item => item._id === year);
            return {
                year,
                count: found ? found.count : 0
            };
        });

        console.log(completeYearlyCounts);

        return {
            weeklyCounts: completeWeeklyCounts,
            monthlyCount: completeMonthsCounts,
            yearlyCounts: completeYearlyCounts,
            dailyCounts: completeDaysCounts
        };


    } catch (error) {
        console.log("error in fetching data", error);
        throw error;
    }
};

//approved req
export const userRequest = async (_id, status, reason) => {
  console.log("Incoming status:", status);
  try {
    const request = await Model.SellerRequest.findById(_id);
    if (!request) {
      throw new Error("Invalid request ID");
    }

    if (!Object.values(CONSTANTS.STATUS).includes(status)) {
      throw new Error("Invalid status value");
    }

    // Reject requires reason
    if (status === CONSTANTS.STATUS.REJECTED && !reason) {
      throw new Error("Reason is required for rejection");
    }

    // Update seller request status and reason
    const updatedRequest = await Model.SellerRequest.findByIdAndUpdate(
      _id,
      { status, reason: reason || null },
      { new: true }
    );

    // If approved, update user's role to SELLER
    if (status === CONSTANTS.STATUS.ACCEPTED) {
      await Model.User.findByIdAndUpdate(
        request.userId,
        { role: "SELLER" },
        { new: true }
      );
    }

    console.log("Updated Request:", updatedRequest);
    return updatedRequest;
  } catch (error) {
    console.log("Error in approving/rejecting request:", error);
    throw error;
  }
};


//get all req status
export const getAllStatus = async () => {
    try {
        const getStatus = await Model.SellerRequest.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails",
                }
            },
            { $unwind: "$userDetails" },

            {
                $project: {
                    _id: 1,
                    restaurantName: 1,
                    address: 1,
                    note: 1,
                    status: 1,
                    createdAt: 1,
                    user: {
                        _id: "$userDetails._id",
                        userName: "$userDetails.userName",
                        email: "$userDetails.email",
                        phoneNumber: "$userDetails.phoneNumber"
                    }
                }
            }


        ]);
        console.log(getStatus);
        return getStatus;

    } catch (error) {
        console.error("Error in getAllStatus:", error);
        throw error;
    }
};


//get status by id
export const getByIdStatus = async ({_id,userId}) => {
  try {
    console.log("Received ID:", _id);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid seller ID");
    }

    const objectId = new mongoose.Types.ObjectId(_id);

    const getStatus = await Model.SellerRequest.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 1,
          restaurantName: 1,
          address: 1,
          note: 1,
          status: 1,
          createdAt: 1,
          user: {
            _id: "$userDetails._id",
            userName: "$userDetails.userName",
            email: "$userDetails.email",
            phoneNumber: "$userDetails.phoneNumber",
          },
        },
      },
    ]);

    console.log(getStatus);
    return getStatus[0] || null;

  } catch (error) {
    console.error("Error in getByIdStatus:", error);
    throw error;
  }
};

