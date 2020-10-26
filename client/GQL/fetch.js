function fetchUsers(){

    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ users { id name avatar posts } }' }),
        })
    .then(response => response.json())
    .then(data => {
        var users = data.data.users;
        console.log(data.data.users);
        const userHtml = users.map(user => {
            return `
                <div class="card" style="width: 18rem;">
                <figure class="figure">
                    <img src="${user.avatar}" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">
                </figure>
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">Number of posts: ${user.posts}</p>
                </div>
                </div><div>&nbsp;</div>
            `;
        });
        document.querySelector("#app").innerHTML = userHtml;
    });
}

fetchUsers();