fetchAllPosts();

async function fetchAllPosts() {
    try {
        let response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        let posts = await response.json();

        let postListHTML = "";
        for (let post of posts) {
            let postDate = new Date(post.date);


            let words = post.content.split(/\s+/);
            let reducedContent = words.slice(0, 100).join(' ');

            postListHTML += `
                <li class="list-group">
                    
                        <h2>${post.title}</h2> <br>
                    <p> <strong>${post.author}</strong> <br>
                        ${reducedContent} <a id="read-more" href="post.html?id=${post._id}">Read more</a> <br> 
                        ${post.tags} <br>
                        <span class="date">- ${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()} ${postDate.toLocaleTimeString()}</span>
                    </p>
                    <a id="update" href="admin/update-post.html?id=${post._id}">Update</a>
                </li>
            `;
        }
        document.getElementById('post-list').innerHTML = postListHTML;

    } catch (error) {
        console.log(error);
    }
}