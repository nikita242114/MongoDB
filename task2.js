db.posts.insertMany([
    {
        creation_date: new Date(),
        author: "skbx@example.com",
        topics: ["mongodb"]
    },
    {
        creation_date: new Date("2024-04-28"),
        author: "skbx@example.ru"
    }
]);