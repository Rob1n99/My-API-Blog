let queryParams = new URLSearchParams(location.search);
let postId = queryParams.get('id');



fetchPostById();


async function fetchPostById() {
    try {
        let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        console.log(response)
        let post = await response.json();





        const postsListHTML = `
            <h2>${post.title}</h2>
            <p><strong>${post.author}</strong></p>
            <p>${post.content}</p>
            <p>${post.tags}</p>
            <p class="date">- ${post.date}</p>
        `;

        document.getElementById('post-detail').innerHTML = postsListHTML;

    } catch (error) {
        console.log(error);
    }
}