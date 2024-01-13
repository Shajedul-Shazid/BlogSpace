let postsArray = []

const inputTitle = document.getElementById("post-title")
const inputBody = document.getElementById("post-body")

const form = document.getElementById("new-post")

function renderPosts() {
    let html = ""
    for(let post of postsArray) {
        html += `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <hr />
        `
    }
    document.getElementById("blog-list").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })

    form.addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = inputTitle.value
    const postBody = inputBody.value
    const data = {
        title: postTitle,
        body: postBody
    }
    
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post)      
            renderPosts()
            // inputTitle.value = ""
            // inputBody.value = ""
            form.reset()
        })
})