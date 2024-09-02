let user = document.querySelector("#user");
let search_btn = document.querySelector("#search_user");
let user_img = document.querySelector("#user_img");
let username = document.querySelector("#name");
let followers = document.querySelector("#follower");
let followings = document.querySelector("#following");
let repo = document.querySelector("#repo");
let create_account = document.querySelector("#create");
let last_update = document.querySelector("#last_update");
let detail_box = document.querySelector(".detail_box");
let loader = document.querySelector(".loader");
let error_box = document.querySelector(".error_box");

async function userData(user) {
  try {
    loader.style.display = "block";
    detail_box.style.display = "none";
    error_box.style.display = "none";
    
    let getData = await fetch(`https://api.github.com/users/${user}`);
    let data = await getData.json();

    if (getData.status === 404) {
      throw new Error("User not found");
    }

    setTimeout(() => {
      loader.style.display = "none";
      detail_box.style.display = "flex";
      user_img.src = data.avatar_url;
      username.textContent = data.login;
      followers.textContent = data.followers;
      followings.textContent = data.following;
      repo.textContent = data.public_repos;
      create_account.textContent = data.created_at.split("T")[0];
      last_update.textContent = data.updated_at.split("T")[0];
    }, 1200);
  } catch (err) {
    loader.style.display = "none";
    detail_box.style.display = "none";
    error_box.style.display = "flex";
  }
  document.querySelector("#user").value = "";
}

search_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (user.value === "") {
    alert("please enter username");
  } else {
    userData(user.value);
  }
});