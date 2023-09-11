"use strict";

const header = document.getElementById("header");
const userList = document.getElementById("user-list");
const logoButton = document.getElementById("logo-button");

function reloadPage() {
  location.reload();
}
logoButton.addEventListener("click", reloadPage);

let userCustomId = 1;
let currentPage = 1;
let differentPage = true;
let isSearch = false;
let renderedSearchedCount = 0;

let currentSearchQuery = "";
let allSearchLength = 0;

let firstTime = true;
let firstTimeLoad = true;

let currentSelectedUser = [];

async function renderGetApi(page) {
  const limit = 10;
  const skip = (page - 1) * limit;

  const allUsersResponse = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  const rawData = await allUsersResponse.json();

  const usersData = rawData.users;
  let usersIds = [];

  const listInfo = document.getElementById("page-info");
  listInfo.innerHTML = "";
  listInfo.innerHTML += `<span>Showing ${(currentPage - 1) * 10 + 1}-${
    currentPage * 10
  }</span>
  <span>from 100 results</span>`;

  for (let i = 0; i < usersData.length; i++) {
    usersIds[i] = usersData[i].id;
  }

  for (let i = usersData.length - 1; i >= usersData.length - 10; i--) {
    const currentData = usersData[i];
    userList.insertAdjacentHTML(
      "afterBegin",
      `<div class="user" id="${userCustomId}">
    <button class="user-button"></button>
    <img class="pfp" src=${currentData.image} alt="#" />
    <div class="user-info-text">
      <!-- NAME & GENDER -->
      <div class="name-and-gender">
        <span>${currentData.firstName} ${currentData.lastName}</span>
        <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
      </div>
      <!-- EMAIL -->
      <div class="email">${currentData.email}</div>
    </div>
    <span class="material-symbols-sharp chevron"> chevron_right </span>
  </div>`
    );
    userCustomId++;
  }
  userCustomId = 1;
  const user = document.getElementsByClassName("user");
  const userButton = document.getElementsByClassName("user-button");
  const rightSide = document.getElementById("user-details-empty");

  for (let i = usersData.length - 1; i >= usersData.length - 10; i--) {
    async function handleUserClick() {
      rightSide.innerHTML = "";
      if (rightSide.classList.contains("user-details-filled") === true) {
        rightSide.classList.remove("user-details-filled");
        rightSide.classList.add("user-details-empty");
      }
      rightSide.innerHTML += `<span class="right-loading"
      >Loading . . .</span>`;

      if (differentPage === true) {
        currentSelectedUser = user[i];
        currentSelectedUser.classList.toggle("active");
        differentPage = false;
      } else {
        currentSelectedUser.classList.toggle("active");
        currentSelectedUser = user[i];
        currentSelectedUser.classList.toggle("active");
      }
      const userPostsResponse = await fetch(
        `https://dummyjson.com/posts/user/${usersData[i].id}`
      );

      const userPosts = await userPostsResponse.json();
      // console.log(userPosts);
      const currentData = usersData[i];
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
              <div class="email">${currentData.email}</div>
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

        if (userPosts.posts.length === 0) {
          postList.innerHTML += `<span class="no-posts">This user doesn't have any posts</span>`;
        }
      } else {
        if (rightSide.classList.contains("user-details-empty") === true) {
          rightSide.classList.remove("user-details-empty");
          rightSide.classList.add("user-details-filled");
        }
        rightSide.innerHTML = "";
        rightSide.innerHTML += `<div class="user-info">
        <div class="user-profile">
          <img class="pfp" src=${currentData.image} alt="#" />
          <div class="user-info-text">
            <div class="name-and-gender">
              <span>${currentData.firstName} ${currentData.lastName}</span>
              <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
            </div>
            <div class="email">${currentData.email}</div>
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

        if (userPosts.posts.length === 0) {
          postList.innerHTML += `<span class="no-posts">This user doesn't have any posts</span>`;
        }

        if (differentPage === true) {
          currentSelectedUser = user[i];
          currentSelectedUser.classList.toggle("active");
          differentPage = false;
        } else {
          currentSelectedUser.classList.toggle("active");
          currentSelectedUser = user[i];
          currentSelectedUser.classList.toggle("active");
        }
      }
    }

    userButton[i].addEventListener("click", handleUserClick);
  }
  const buttonBlocker = document.getElementById("button-blocker");
  buttonBlocker.remove();
  if (firstTimeLoad === true) {
    const pageInfo = document.getElementById("page-info");
    pageInfo.innerHTML = "";
    pageInfo.innerHTML += `<span>Showing ${(currentPage - 1) * 10 + 1}-${
      currentPage * 10
    }</span>
   <span>from 100 results</span>`;
    firstTimeLoad = false;
  }
  const enablePrevButton = document.getElementById("prev");
  const enableNextButton = document.getElementById("next");
  if (currentPage !== 1) {
    enablePrevButton.classList.toggle("inactive-button");
    enablePrevButton.classList.toggle("active-button");
  }
  if (currentPage !== 10) {
    enableNextButton.classList.toggle("inactive-button");
    enableNextButton.classList.toggle("active-button");
  }
}

renderGetApi(1);

let currentSearchPage = 1;

async function searchUser(page, searchQuery) {
  const searchResultsResponse = await fetch(
    `https://dummyjson.com/users/search?q=${searchQuery}&limit=0`
  );

  const searchResults = await searchResultsResponse.json();
  // console.log(searchResults);
  allSearchLength = searchResults.users.length;
  // console.log(`allSearchLength: ${allSearchLength}`);
  let maxPages = Math.floor(allSearchLength / 10) + 1;

  const listInfo = document.getElementById("page-info");
  if (allSearchLength === 0) {
    listInfo.innerHTML = "";
    listInfo.innerHTML += `<span>No results found :(</span>
    <span>Try another keyword!</span>`;
  } else if (currentPage === maxPages) {
    listInfo.innerHTML = "";
    listInfo.innerHTML += `<span>Showing ${
      (currentPage - 1) * 10 + 1
    }-${allSearchLength}</span>
        <span>from ${allSearchLength} results</span>`;
  } else {
    listInfo.innerHTML = "";
    listInfo.innerHTML += `<span>Showing ${(currentPage - 1) * 10 + 1}-${
      currentPage * 10
    }</span>
    <span>from ${allSearchLength} results</span>`;
  }

  const limit = 10;
  const skip = (page - 1) * limit;
  const limitedSearchResultsResponse = await fetch(
    `https://dummyjson.com/users/search?q=${searchQuery}&limit=10&skip=${skip}`
  );
  const limitedSearchResults = await limitedSearchResultsResponse.json();
  // console.log(limitedSearchResults);
  // console.log(limitedSearchResults.users.length);

  let searchedUserIds = [];
  let usersData = [];

  for (let g = 0; g < limitedSearchResults.users.length; g++) {
    searchedUserIds[g] = limitedSearchResults.users[g].id;
    // console.log(`Found Id: ${searchedUserIds[g]}`);
    let tempUsersDataResponse = await fetch(
      `https://dummyjson.com/users/${searchedUserIds[g]}`
    );
    usersData[g] = await tempUsersDataResponse.json();
  }

  if (limitedSearchResults.users.length === 10) {
    renderedSearchedCount = 10;
    for (
      let i = limitedSearchResults.users.length - 1;
      i >= limitedSearchResults.users.length - 10;
      i--
    ) {
      const currentData = limitedSearchResults.users[i];
      userList.insertAdjacentHTML(
        "afterBegin",
        `<div class="user" id="${userCustomId}">
      <button class="user-button"></button>
      <img class="pfp" src=${currentData.image} alt="#" />
      <div class="user-info-text">
        <!-- NAME & GENDER -->
        <div class="name-and-gender">
          <span>${currentData.firstName} ${currentData.lastName}</span>
          <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
        </div>
        <!-- EMAIL -->
        <div class="email">${currentData.email}</div>
      </div>
      <span class="material-symbols-sharp chevron"> chevron_right </span>
    </div>`
      );
      userCustomId++;
    }
    userCustomId = 1;

    const user = document.getElementsByClassName("user");
    const userButton = document.getElementsByClassName("user-button");
    // console.log(userButton);
    const rightSide = document.getElementById("user-details-empty");

    for (
      let i = limitedSearchResults.users.length - 1;
      i >= limitedSearchResults.users.length - 10;
      i--
    ) {
      async function handleUserClick() {
        rightSide.innerHTML = "";
        if (rightSide.classList.contains("user-details-filled") === true) {
          rightSide.classList.remove("user-details-filled");
          rightSide.classList.add("user-details-empty");
        }
        rightSide.innerHTML += `<span class="right-loading"
         >Loading . . .</span>`;
        if (differentPage === true) {
          currentSelectedUser = user[i];
          currentSelectedUser.classList.toggle("active");
          differentPage = false;
        } else {
          currentSelectedUser.classList.toggle("active");
          currentSelectedUser = user[i];
          currentSelectedUser.classList.toggle("active");
        }
        const userPostsResponse = await fetch(
          `https://dummyjson.com/posts/user/${searchedUserIds[i]}`
        );

        const userPosts = await userPostsResponse.json();
        // console.log(userPosts);
        const currentData = usersData[i];
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
              <div class="email">${currentData.email}</div>
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

          if (userPosts.posts.length === 0) {
            postList.innerHTML += `<span class="no-posts">This user doesn't have any posts</span>`;
          }
        } else {
          if (rightSide.classList.contains("user-details-empty") === true) {
            rightSide.classList.remove("user-details-empty");
            rightSide.classList.add("user-details-filled");
          }
          rightSide.innerHTML = "";
          rightSide.innerHTML += `<div class="user-info">
        <div class="user-profile">
          <img class="pfp" src=${currentData.image} alt="#" />
          <div class="user-info-text">
            <div class="name-and-gender">
              <span>${currentData.firstName} ${currentData.lastName}</span>
              <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
            </div>
            <div class="email">${currentData.email}</div>
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

          if (userPosts.posts.length === 0) {
            postList.innerHTML += `<span class="no-posts">This user doesn't have any posts</span>`;
          }

          if (differentPage === true) {
            currentSelectedUser = user[i];
            currentSelectedUser.classList.toggle("active");
            differentPage = false;
          } else {
            currentSelectedUser.classList.toggle("active");
            currentSelectedUser = user[i];
            currentSelectedUser.classList.toggle("active");
          }
        }
      }

      userButton[i].addEventListener("click", handleUserClick);
    }

    const buttonBlocker = document.getElementById("button-blocker");
    buttonBlocker.remove();
    const enablePrevButton = document.getElementById("prev");
    const enableNextButton = document.getElementById("next");
    if (currentPage !== 1) {
      enablePrevButton.classList.toggle("inactive-button");
      enablePrevButton.classList.toggle("active-button");
    }
    if (currentPage !== Math.floor(allSearchLength / 10 + 1)) {
      enableNextButton.classList.toggle("inactive-button");
      enableNextButton.classList.toggle("active-button");
    }
  } else if (
    limitedSearchResults.users.length >= 1 &&
    limitedSearchResults.users.length < 10
  ) {
    renderedSearchedCount = limitedSearchResults.users.length;
    for (let i = limitedSearchResults.users.length - 1; i >= 0; i--) {
      const currentData = limitedSearchResults.users[i];
      userList.insertAdjacentHTML(
        "afterBegin",
        `<div class="user" id="${userCustomId}">
      <button class="user-button"></button>
      <img class="pfp" src=${currentData.image} alt="#" />
      <div class="user-info-text">
        <!-- NAME & GENDER -->
        <div class="name-and-gender">
          <span>${currentData.firstName} ${currentData.lastName}</span>
          <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
        </div>
        <!-- EMAIL -->
        <div class="email">${currentData.email}</div>
      </div>
      <span class="material-symbols-sharp chevron"> chevron_right </span>
    </div>`
      );
      userCustomId++;
    }
    userCustomId = 1;

    const user = document.getElementsByClassName("user");
    const userButton = document.getElementsByClassName("user-button");
    // console.log(userButton);
    const rightSide = document.getElementById("user-details-empty");

    // console.log(`Length: ${limitedSearchResults.users.length}`);

    for (let i = limitedSearchResults.users.length - 1; i >= 0; i--) {
      async function handleUserClick() {
        rightSide.innerHTML = "";
        if (rightSide.classList.contains("user-details-filled") === true) {
          rightSide.classList.remove("user-details-filled");
          rightSide.classList.add("user-details-empty");
        }
        rightSide.innerHTML += `<span class="right-loading"
         >Loading . . .</span>`;
        if (differentPage === true) {
          currentSelectedUser = user[i];
          currentSelectedUser.classList.toggle("active");
          differentPage = false;
        } else {
          currentSelectedUser.classList.toggle("active");
          currentSelectedUser = user[i];
          currentSelectedUser.classList.toggle("active");
        }
        const userPostsResponse = await fetch(
          `https://dummyjson.com/posts/user/${searchedUserIds[i]}`
        );
        // console.log(`https://dummyjson.com/posts/user/${searchedUserIds[i]}`);
        const userPosts = await userPostsResponse.json();
        // console.log(userPosts);
        const currentData = usersData[i];
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
              <div class="email">${currentData.email}</div>
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

          if (userPosts.posts.length === 0) {
            postList.innerHTML += `<span class="no-posts">This user doesn't have any posts</span>`;
          }
        } else {
          if (rightSide.classList.contains("user-details-empty") === true) {
            rightSide.classList.remove("user-details-empty");
            rightSide.classList.add("user-details-filled");
          }
          rightSide.innerHTML = "";
          rightSide.innerHTML += `<div class="user-info">
        <div class="user-profile">
          <img class="pfp" src=${currentData.image} alt="#" />
          <div class="user-info-text">
            <div class="name-and-gender">
              <span>${currentData.firstName} ${currentData.lastName}</span>
              <span class="material-symbols-sharp ${currentData.gender}-gender"> ${currentData.gender} </span>
            </div>
            <div class="email">${currentData.email}</div>
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

          if (userPosts.posts.length === 0) {
            postList.innerHTML += `<span class="no-posts">This user doesn't have any posts</span>`;
          }

          if (differentPage === true) {
            currentSelectedUser = user[i];
            currentSelectedUser.classList.toggle("active");
            differentPage = false;
          } else {
            currentSelectedUser.classList.toggle("active");
            currentSelectedUser = user[i];
            currentSelectedUser.classList.toggle("active");
          }
        }
      }

      userButton[i].addEventListener("click", handleUserClick);
    }

    const buttonBlocker = document.getElementById("button-blocker");
    buttonBlocker.remove();
    const enablePrevButton = document.getElementById("prev");
    const enableNextButton = document.getElementById("next");
    if (currentPage !== 1) {
      enablePrevButton.classList.toggle("inactive-button");
      enablePrevButton.classList.toggle("active-button");
    }
    if (currentPage !== Math.floor(allSearchLength / 10 + 1)) {
      enableNextButton.classList.toggle("inactive-button");
      enableNextButton.classList.toggle("active-button");
    }
  } else if (limitedSearchResults.users.length === 0) {
    renderedSearchedCount = 0;
    const buttonBlocker = document.getElementById("button-blocker");
    buttonBlocker.remove();
  }
}

const prevButton = document.getElementById("prev");

const nextButton = document.getElementById("next");

function handleNext() {
  if (isSearch === false) {
    if (
      currentPage === 10 ||
      nextButton.classList.contains("inactive-button") === true
    ) {
      return;
    } else {
      header.insertAdjacentHTML(
        "afterbegin",
        `<button class="button-blocker" id="button-blocker">
        Loading . . .<br />Please wait a moment
      </button>`
      );
      nextButton.classList.toggle("active-button");
      nextButton.classList.toggle("inactive-button");
      if (prevButton.classList.contains("active-button") === true) {
        prevButton.classList.toggle("active-button");
        prevButton.classList.toggle("inactive-button");
      }
      currentPage++;

      for (let i = 1; i <= 10; i++) {
        const userForRemoval = document.getElementById(`${i}`);
        userForRemoval.remove();
      }
      differentPage = true;
      renderGetApi(currentPage);
    }
  } else {
    if (
      currentPage === Math.floor(allSearchLength / 10) + 1 ||
      nextButton.classList.contains("inactive-button") === true
    ) {
      return;
    } else {
      header.insertAdjacentHTML(
        "afterbegin",
        `<button class="button-blocker" id="button-blocker">
        Loading . . .<br />Please wait a moment
      </button>`
      );
      nextButton.classList.toggle("active-button");
      nextButton.classList.toggle("inactive-button");
      if (prevButton.classList.contains("active-button") === true) {
        prevButton.classList.toggle("active-button");
        prevButton.classList.toggle("inactive-button");
      }
      currentPage++;
      for (let i = 1; i <= 10; i++) {
        const userForRemoval = document.getElementById(`${i}`);
        userForRemoval.remove();
      }
      differentPage = true;
      searchUser(currentPage, currentSearchQuery);
    }
  }
}

function handlePrev() {
  if (isSearch === false) {
    if (
      currentPage === 1 ||
      prevButton.classList.contains("inactive-button") === true
    ) {
      return;
    } else {
      header.insertAdjacentHTML(
        "afterbegin",
        `<button class="button-blocker" id="button-blocker">
          Loading . . .<br />Please wait a moment
        </button>`
      );
      prevButton.classList.toggle("active-button");
      prevButton.classList.toggle("inactive-button");
      if (nextButton.classList.contains("active-button") === true) {
        nextButton.classList.toggle("active-button");
        nextButton.classList.toggle("inactive-button");
      }
      currentPage--;
      for (let i = 1; i <= 10; i++) {
        const userForRemoval = document.getElementById(`${i}`);
        userForRemoval.remove();
      }
      differentPage = true;
      renderGetApi(currentPage);
    }
  } else {
    if (
      currentPage === 1 ||
      prevButton.classList.contains("inactive-button") === true
    ) {
      return;
    } else {
      header.insertAdjacentHTML(
        "afterbegin",
        `<button class="button-blocker" id="button-blocker">
        Loading . . .<br />Please wait a moment
      </button>`
      );
      prevButton.classList.toggle("active-button");
      prevButton.classList.toggle("inactive-button");
      if (nextButton.classList.contains("active-button") === true) {
        nextButton.classList.toggle("active-button");
        nextButton.classList.toggle("inactive-button");
      }
      currentPage--;
      for (let i = 1; i <= 10; i++) {
        const userForRemoval = document.getElementById(`${i}`);
        userForRemoval.remove();
      }
      differentPage = true;
      searchUser(currentPage, currentSearchQuery);
    }
  }
}

prevButton.addEventListener("click", handlePrev);
nextButton.addEventListener("click", handleNext);

const searchInput = document.getElementById("search-bar");

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (nextButton.classList.contains("active-button") === true) {
      nextButton.classList.toggle("active-button");
      nextButton.classList.toggle("inactive-button");
    }
    if (prevButton.classList.contains("active-button") === true) {
      prevButton.classList.toggle("active-button");
      prevButton.classList.toggle("inactive-button");
    }
    // console.log(`Search Value = ${searchInput.value}`);

    if (searchInput.value === "") {
      header.insertAdjacentHTML(
        "afterbegin",
        `<button class="button-blocker" id="button-blocker">
        Loading . . .<br />Please wait a moment
      </button>`
      );
      if (prevButton.classList.contains("active-button") === true) {
        prevButton.classList.toggle("active-button");
        prevButton.classList.toggle("inactive-button");
      }

      if (nextButton.classList.contains("active-button") === true) {
        nextButton.classList.toggle("active-button");
        nextButton.classList.toggle("inactive-button");
      }
      currentPage = 1;
      const listInfo = document.getElementById("page-info");
      listInfo.innerHTML = "";
      listInfo.innerHTML += `<span>Showing ${(currentPage - 1) * 10 + 1}-${
        currentPage * 10
      }</span>
        <span>from 100 results</span>`;
      if (isSearch === false) {
        for (let i = 1; i <= 10; i++) {
          const userForRemoval = document.getElementById(`${i}`);
          userForRemoval.remove();
        }
      } else if (renderedSearchedCount >= 0) {
        for (let i = 1; i <= renderedSearchedCount; i++) {
          const userForRemoval = document.getElementById(`${i}`);
          userForRemoval.remove();
        }
      }
      differentPage = true;
      isSearch = false;
      renderGetApi(1);
    } else {
      currentPage = 1;
      header.insertAdjacentHTML(
        "afterbegin",
        `<button class="button-blocker" id="button-blocker">
        Loading . . .<br />Please wait a moment
      </button>`
      );
      if (isSearch === false) {
        for (let i = 1; i <= 10; i++) {
          const userForRemoval = document.getElementById(`${i}`);
          userForRemoval.remove();
        }
      } else if (renderedSearchedCount >= 0) {
        for (let i = 1; i <= renderedSearchedCount; i++) {
          const userForRemoval = document.getElementById(`${i}`);
          userForRemoval.remove();
        }
      }
      isSearch = true;
      currentSearchQuery = searchInput.value;
      currentPage = 1;
      differentPage = true;

      searchUser(1, searchInput.value);
    }
  }
});
