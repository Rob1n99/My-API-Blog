let queryParams = new URLSearchParams(location.search);
let postId = queryParams.get('id');

updatePost()


async function updatePost() {
    try {
        let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);

        let post = await response.json();




        const updatePostListFormHTML = `
        <label for="title">Title</label>
        <input type="text" id="title" name="title" value="${post.title}">

        <label for="author">Author</label>
        <input type="text" id="author" name="author" value="${post.author}">

        <label for="content">Content</label>
        <textarea id="content" name="content" cols="50" rows="20">${post.content}</textarea>

        <label for="tags">Tags</label>
        <select id="tag" name="tag">
            ${generateTagOptions(post.tags)}
        </select> 
        <input id="submit" type="submit" value="Create">
    `;
        document.getElementById('update-post-form').innerHTML = updatePostListFormHTML;

    } catch (error) {
        console.log(error);
    }
}
function generateTagOptions(tags) {
    if (!tags) return;
    let optionsHTML = tags[0].split(',')
    for (const option of optionsHTML) {
        optionsHTML += `<option value="${option}">${option}</option>`;
    }
    return optionsHTML;
}


document.getElementById('update-post-form').addEventListener('submit', submitPost);

async function submitPost(e) {
    e.preventDefault();
    let form = e.target;

    try {
        let formData = new FormData(form);
        let data = {
            "title": formData.get('title'),
            "author": formData.get('author'),
            "content": formData.get('content')
        };

        await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(data)
        });
        location.href = '../index.html';
    } catch (error) {
        console.log(error)
    }
}
