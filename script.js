"use strict";

const userList = document.getElementById("user-list");

let firstTime = true;

async function renderGetApi(page) {
  const limit = 10;
  const skip = (page - 1) * limit;

  const allUsersResponse = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  const rawData = await allUsersResponse.json();
  const usersData = rawData.users;
  console.log(usersData);
  for (let i = usersData.length - 1; i >= usersData.length - 10; i--) {
    const currentData = usersData[i];
    userList.insertAdjacentHTML(
      "afterBegin",
      `<div class="user" id="${usersData.length - 1}">
    <button class="user-button"></button>
    <img class="pfp" src=${currentData.image} alt="#" />
    <div class="user-info-text">
      <!-- NAME & GENDER -->
      <div class="name-and-gender">
        <span>${currentData.firstName} ${currentData.lastName}</span>
        <span class="material-symbols-sharp ${currentData.gender}-gender"> ${
        currentData.gender
      } </span>
      </div>
      <!-- EMAIL -->
      <div class="email">${currentData.email}</div>
    </div>
    <span class="material-symbols-sharp chevron"> chevron_right </span>
  </div>`
    );
  }
  const user = document.getElementsByClassName("user");
  const userButton = document.getElementsByClassName("user-button");
  const rightSide = document.getElementById("user-details-empty");

  let currentData = [];

  let currentSelectedUser = [];

  for (let i = usersData.length - 1; i >= usersData.length - 10; i--) {
    const userPostsResponse = await fetch(
      `https://dummyjson.com/posts/user/${i + 1}`
    );
    const userPosts = await userPostsResponse.json();
    console.log(userPosts);
    const currentData = usersData[i];

    function handleUserClick() {
      if (firstTime === true) {
        rightSide.classList.remove("user-details-empty");
        rightSide.classList.add("user-details-filled");
        rightSide.innerHTML = "";
        rightSide.innerHTML += `<div class="user-info">
          <div class="user-profile">
            <img class="pfp" src=${currentData.image} alt="#" />
            <div class="user-info-text">
              <div class="name-and-gender">
                <span>${currentData.firstName} ${currentData.lastName}</span>
                <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
              </div>
              <div class="email">email@provider.com</div>
            </div>
          </div>
          <div class="user-background">
            <div>
              <span class="mini-header">Education</span>
              <br />
              <span class="education mini-content" id="education"
                >${currentData.university}</span
              >
            </div>
            <div>
              <span class="mini-header">Address</span>
              <br />
              <span class="address mini-content" id="address"
                >${currentData.address.address}</span
              >
            </div>
            <div>
              <span class="mini-header">Occupation</span>
              <br />
              <span class="occupation mini-content" id="occupation"
                >${currentData.company.title}</span
              >
            </div>
            <div>
              <span class="mini-header">Company Name</span>
              <br />
              <span class="company-name mini-content" id="company-name"
                >${currentData.company.name}</span
              >
            </div>
          </div>
        </div>
        <div class="user-posts">
          <h1>${currentData.firstName}'s Posts</h1>
          <div class="post-list" id="post-list">
          </div>
        </div>`;
        firstTime = false;
        const postList = document.getElementById("post-list");
        for (let p = 0; p < userPosts.posts.length; p++) {
          let currentPost = userPosts.posts[p];
          postList.innerHTML += `<div class="posts">
        <span class="post-header">${currentPost.title}</span>
        <p>
           ${currentPost.body}
        </p>
        <div class="post-tags" id="post-tags-${p}">
        </div>
      </div>`;
          let postTags = document.getElementById(`post-tags-${p}`);
          for (let m = 0; m < currentPost.tags.length; m++) {
            postTags.innerHTML += `<span>${currentPost.tags[m]}</span>`;
          }
        }

        currentSelectedUser = user[i];
        currentSelectedUser.classList.toggle("active");
      } else {
        rightSide.innerHTML = "";
        rightSide.innerHTML += `<div class="user-info">
        <div class="user-profile">
          <img class="pfp" src=${currentData.image} alt="#" />
          <div class="user-info-text">
            <div class="name-and-gender">
              <span>${currentData.firstName} ${currentData.lastName}</span>
              <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
            </div>
            <div class="email">email@provider.com</div>
          </div>
        </div>
        <div class="user-background">
          <div>
            <span class="mini-header">Education</span>
            <br />
            <span class="education mini-content" id="education"
              >${currentData.university}</span
            >
          </div>
          <div>
            <span class="mini-header">Address</span>
            <br />
            <span class="address mini-content" id="address"
              >${currentData.address.address}</span
            >
          </div>
          <div>
            <span class="mini-header">Occupation</span>
            <br />
            <span class="occupation mini-content" id="occupation"
              >${currentData.company.title}</span
            >
          </div>
          <div>
            <span class="mini-header">Company Name</span>
            <br />
            <span class="company-name mini-content" id="company-name"
              >${currentData.company.name}</span
            >
          </div>
        </div>
      </div>
      <div class="user-posts">
        <h1>${currentData.firstName}'s Posts</h1>
        <div class="post-list" id="post-list">
        </div>
      </div>`;
        const postList = document.getElementById("post-list");
        for (let p = 0; p < userPosts.posts.length; p++) {
          let currentPost = userPosts.posts[p];
          postList.innerHTML += `<div class="posts">
        <span class="post-header">${currentPost.title}</span>
        <p>
           ${currentPost.body}
        </p>
        <div class="post-tags" id="post-tags-${p}">
        </div>
      </div>`;
          let postTags = document.getElementById(`post-tags-${p}`);
          for (let m = 0; m < currentPost.tags.length; m++) {
            postTags.innerHTML += `<span>${currentPost.tags[m]}</span>`;
          }
        }
        currentSelectedUser.classList.toggle("active");
        currentSelectedUser = user[i];
        currentSelectedUser.classList.toggle("active");
      }
    }
    userButton[i].addEventListener("click", handleUserClick);
  }
}

renderGetApi(1);

const prevButton = document.getElementById("prev");

const nextButton = document.getElementById("next");
