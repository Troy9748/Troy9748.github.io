(function () {
  var labels = {
    research: "科研成果",
    notes: "科研笔记",
    essay: "随笔",
    photography: "摄影",
    music: "音乐"
  };

  function normalize(value) {
    return String(value || "").toLocaleLowerCase("zh-CN");
  }

  function selectPosts(posts, query, selectedType, sortValue) {
    query = normalize(query).trim();
    return posts.filter(function (post) {
      var categories = post.categories || [];
      var haystack = normalize([
        post.title,
        post.subtitle,
        post.content,
        categories.join(" "),
        (post.tags || []).join(" ")
      ].join(" "));
      return (!selectedType || categories.indexOf(selectedType) !== -1) &&
        (!query || haystack.indexOf(query) !== -1);
    }).sort(function (a, b) {
      if (sortValue === "title") return a.title.localeCompare(b.title, "zh-CN");
      var direction = sortValue === "oldest" ? 1 : -1;
      return direction * (new Date(a.date) - new Date(b.date));
    });
  }

  if (typeof module !== "undefined") module.exports = { selectPosts: selectPosts };
  if (typeof document === "undefined") return;

  var root = document.querySelector("[data-content-explorer]");
  if (!root) return;

  var posts = JSON.parse(root.querySelector("[data-posts]").textContent);
  var search = root.querySelector("[data-search]");
  var type = root.querySelector("[data-type]");
  var sort = root.querySelector("[data-sort]");
  var results = root.querySelector("[data-results]");
  var count = root.querySelector("[data-count]");
  var empty = root.querySelector("[data-empty]");

  function escapeHtml(value) {
    var node = document.createElement("span");
    node.textContent = value || "";
    return node.innerHTML;
  }

  function render() {
    var filtered = selectPosts(posts, search.value, type.value, sort.value);

    results.innerHTML = filtered.map(function (post) {
      var category = (post.categories || [])[0];
      var date = new Intl.DateTimeFormat("zh-CN", {
        year: "numeric", month: "2-digit", day: "2-digit"
      }).format(new Date(post.date));
      return '<article class="explorer-card">' +
        '<p><span class="content-type">' + escapeHtml(labels[category] || category || "文章") + '</span>' +
        '<time datetime="' + escapeHtml(post.date) + '">' + date + '</time></p>' +
        '<h2><a href="' + escapeHtml(post.url) + '">' + escapeHtml(post.title) + '</a></h2>' +
        (post.subtitle ? '<p class="summary">' + escapeHtml(post.subtitle) + '</p>' : '') +
        '</article>';
    }).join("");

    count.textContent = "找到 " + filtered.length + " 篇内容";
    empty.hidden = filtered.length !== 0;
  }

  var requestedType = new URLSearchParams(window.location.search).get("type");
  if (requestedType && labels[requestedType]) type.value = requestedType;

  [search, type, sort].forEach(function (control) {
    control.addEventListener(control === search ? "input" : "change", render);
  });
  render();
})();
