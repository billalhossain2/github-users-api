
const setText = (id, text) => (document.getElementById(id).innerText = text);

const getFollowersApi = async (user) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/ProgrammingHero1/followers?per_page=2`
    );
    const followers = await response.json();
    displayUsers(user, followers);
  } catch (error) {
    console.log("Users Api has some error", error);
  }
};

const getUsersApi = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/programminghero1`
    );
    const user = await response.json();
    getFollowersApi(user);
  } catch (error) {
    console.log("Users Api has some error", error);
  }
};

const displayUsers = (user, followers) => {
  const {avatar_url, login, blog, bio, created_at, public_repos, followers:usersFlower, following, location, url, twitter_username, type, } = user;
  // https://avatars.githubusercontent.com/u/53802153?v=4
  const avatarImg = document.getElementById("avatar-img");
  avatarImg.setAttribute("src", avatar_url);
  
  setText("user-name", login);
  setText("blog-name", blog);
  setText("bio-data", bio ? bio : "This profile has no bio");

  setText("join-date", created_at);
  setText("repos-field", public_repos);
  setText("followers", usersFlower);
  setText("following", following);

  setText("location", location ? location : "Location is not available");

  setText("github-link", url);

  setText(
    "twitter",
    twitter_username ? twitter_username : "Not Found"
  );

  setText("agithub", type);

  const [follower1, follower2] = followers;
  const {login:follower1Login, avatar_url:follower1AvatarUrl, repos_url:follower1ReposUrl} = follower1;
  const {login:follower2Login, avatar_url:follower2AvatarUrl, repos_url:follower2ReposUrl} = follower2;

  document.getElementById("followers-wrapper").innerHTML = `
    <h1>Followers Informations</h1>
    <div class="followers">
        <div>
            <img src="${follower1AvatarUrl}" alt="...">
            <h3>${follower1Login}</h3>
            <p>${follower1ReposUrl}</p>
        </div>

        <div>
            <img src="${follower2AvatarUrl}" alt="...">
            <h3>${follower2Login}</h3>
            <p>${follower2ReposUrl}</p>
        </div>
    </div>
    `;
};
getUsersApi();
