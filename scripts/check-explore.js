const assert = require("node:assert/strict");
const { selectPosts } = require("../assets/js/explore.js");

const posts = [
  { title: "Beta", date: "2026-01-02", categories: ["notes"], tags: ["ALMA"], content: "data" },
  { title: "Alpha", date: "2025-01-02", categories: ["research"], tags: [], content: "paper" }
];

assert.deepEqual(selectPosts(posts, "alma", "notes", "newest").map(post => post.title), ["Beta"]);
assert.deepEqual(selectPosts(posts, "", "", "oldest").map(post => post.title), ["Alpha", "Beta"]);
assert.deepEqual(selectPosts(posts, "", "", "title").map(post => post.title), ["Alpha", "Beta"]);

console.log("Content search and sorting checks passed.");
