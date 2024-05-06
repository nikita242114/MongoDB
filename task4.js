db.users.aggregate([
    { $match: { visits: { $gt: 300 } } },
    { $group: { _id: { $substr: ["$first_name", 0, 1] }, total_karma: { $sum: "$karma" } } }
]);