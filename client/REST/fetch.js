function fetchUsers(){
    fetch('http://localhost:8080/wp/wp-json/wp/v2/users').then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        const userHtml = data.map(user => {
            fetch('http://localhost:8080/wp/wp-json/wp/v2/posts?author='+user.id).then (response => {
                return response.json();
            }).then(d => {
                console.log(d);
                var content = `
                    <div class="card" style="width: 18rem;">
                    <figure class="figure">
                        <img src="${user.simple_local_avatar["full"]}" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">
                    </figure>
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <p class="card-text">Number of posts: ${d.length}</p>
                    </div>
                    </div><div>&nbsp;</div>
                `;
                document.querySelector("#app").insertAdjacentHTML("afterbegin", content);
            });            
        });
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
}

fetchUsers();