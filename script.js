const searchBtn = document.getElementById("searchBtn");
const profile = document.getElementById("profile");
//const reposContainer = document.getElementById("repos");

searchBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value;

  if (username === "") {
    alert("Please enter username");
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then(data => {
      displayProfile(data);
      //fetchRepos(username);
      //saveSearch(username);
      //showHistory();
    })
    .catch(error => {
      profile.innerHTML = `<p>${error.message}</p>`;
    });
});

function displayProfile(user) {
  profile.innerHTML = `
    <div class="profile-card">
      <img src="${user.avatar_url}" alt="Profile Image">

      <h2>${user.name || user.login}</h2>

      <p>${user.bio || "No bio available"}</p>

      <p><strong>Followers:</strong> ${user.followers}</p>

      <p><strong>Following:</strong> ${user.following}</p>

      <p><strong>Repositories:</strong> ${user.public_repos}</p>

      <a href="${user.html_url}" target="_blank">
        Visit Profile
      </a>
    </div>
  `;
}
/*function fetchRepos(username){
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
        reposContainer.innerHTML = "<h3>Repositories</h3>";
        repos.forEach(repo => {
            reposContainer.innerHTML += `
            <div class="repo">
              <a href="${repo.html_url}" target="_blank">
                ${repo.name}
              </a>
            </div>
            `;
        });
    });
}*/