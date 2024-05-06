db.posts.find({
    topics: "as",
    author_id: /example\.ru/,
    score: { $gt: 100 }
});