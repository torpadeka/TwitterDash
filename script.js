"use strict";

const userList = document.getElementById("user-list");

async function getApi() {
  const allUsersResponse = await fetch("https://dummyjson.com/users");
  const rawData = await allUsersResponse.json();
  const usersData = rawData.users;
  console.log(usersData);
  for (let i = 0; i < 10; i++) {
    const currentData = usersData[i];
    // found this method in google :D
    userList.insertAdjacentHTML(
      "afterBegin",
      `<div class="user">
    <button class="user-button"></button>
    <img class="pfp" src=${currentData.image} alt="#" />
    <div class="user-info-text">
      <!-- NAME & GENDER -->
      <div class="name-and-gender">
        <span>${currentData.firstName} ${currentData.lastName}</span>
        <span class="material-symbols-sharp male-gender"> male </span>
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

  let firstTime = true;
  let currentData = [];

  let currentSelectedUser = [];
  for (let i = 0; i < user.length; i++) {
    function handleUserClick() {
      if (firstTime === true) {
        rightSide.classList.remove("user-details-empty");
        rightSide.classList.add("user-details-filled");
        rightSide.innerHTML = "";
        rightSide.innerHTML += `<div class="user-info">
          <div class="user-profile">
            <img class="pfp" src="./assets/dummy_pfp.png" alt="#" />
            <div class="user-info-text">
              <div class="name-and-gender">
                <span>Darren Kent</span>
                <span class="material-symbols-sharp male-gender"> male </span>
              </div>
              <div class="email">email@provider.com</div>
            </div>
          </div>
          <div class="user-background">
            <div>
              <span class="mini-header">Education</span>
              <br />
              <span class="education mini-content" id="education"
                >BINUS University</span
              >
            </div>
            <div>
              <span class="mini-header">Address</span>
              <br />
              <span class="address mini-content" id="address"
                >1745 T Street Southeast, Washington</span
              >
            </div>
            <div>
              <span class="mini-header">Occupation</span>
              <br />
              <span class="occupation mini-content" id="occupation"
                >Grim Reaper</span
              >
            </div>
            <div>
              <span class="mini-header">Company Name</span>
              <br />
              <span class="company-name mini-content" id="company-name"
                >Deathly Fantasies O' Fee</span
              >
            </div>
          </div>
        </div>
        <div class="user-posts">
          <h1>Darren's Posts</h1>
          <div class="post-list">
            <div class="posts">
              <span class="post-header">They rushed out the door.</span>
              <p>
                The Dragoon is one of the core units in the Protoss army.
                Whereas normally their ground units cannot engage enemies that
                are in the air, the Dragoon can make quick work of almost
                anything, on the ground or in the air.
              </p>
              <div class="post-tags">
                <span>fiction</span>
                <span>game</span>
                <span>lore</span>
              </div>
            </div>
            <div class="posts">
              <span class="post-header">They rushed out the door.</span>
              <p>
                The Dragoon is one of the core units in the Protoss army.
                Whereas normally their ground units cannot engage enemies that
                are in the air, the Dragoon can make quick work of almost
                anything, on the ground or in the air.
              </p>
              <div class="post-tags">
                <span>fiction</span>
                <span>game</span>
                <span>lore</span>
              </div>
            </div>
            <div class="posts">
              <span class="post-header">They rushed out the door.</span>
              <p>
                The Dragoon is one of the core units in the Protoss army.
                Whereas normally their ground units cannot engage enemies that
                are in the air, the Dragoon can make quick work of almost
                anything, on the ground or in the air.
              </p>
              <div class="post-tags">
                <span>fiction</span>
                <span>game</span>
                <span>lore</span>
              </div>
            </div>
          </div>
        </div>`;
        firstTime = false;
        currentSelectedUser = user[i];
        currentSelectedUser.classList.toggle("active");
      } else {
        rightSide.innerHTML = "";
        rightSide.innerHTML += `<div class="user-info">
          <div class="user-profile">
            <img class="pfp" src="./assets/dummy_pfp.png" alt="#" />
            <div class="user-info-text">
              <div class="name-and-gender">
                <span>torpadeka</span>
                <span class="material-symbols-sharp male-gender"> male </span>
              </div>
              <div class="email">email@provider.com</div>
            </div>
          </div>
          <div class="user-background">
            <div>
              <span class="mini-header">Education</span>
              <br />
              <span class="education mini-content" id="education"
                >BINUS University</span
              >
            </div>
            <div>
              <span class="mini-header">Address</span>
              <br />
              <span class="address mini-content" id="address"
                >1745 T Street Southeast, Washington</span
              >
            </div>
            <div>
              <span class="mini-header">Occupation</span>
              <br />
              <span class="occupation mini-content" id="occupation"
                >Grim Reaper</span
              >
            </div>
            <div>
              <span class="mini-header">Company Name</span>
              <br />
              <span class="company-name mini-content" id="company-name"
                >Deathly Fantasies O' Fee</span
              >
            </div>
          </div>
        </div>
        <div class="user-posts">
          <h1>Darren's Posts</h1>
          <div class="post-list">
            <div class="posts">
              <span class="post-header">They rushed out the door.</span>
              <p>
                The Dragoon is one of the core units in the Protoss army.
                Whereas normally their ground units cannot engage enemies that
                are in the air, the Dragoon can make quick work of almost
                anything, on the ground or in the air.
              </p>
              <div class="post-tags">
                <span>fiction</span>
                <span>game</span>
                <span>lore</span>
              </div>
            </div>
            <div class="posts">
              <span class="post-header">They rushed out the door.</span>
              <p>
                The Dragoon is one of the core units in the Protoss army.
                Whereas normally their ground units cannot engage enemies that
                are in the air, the Dragoon can make quick work of almost
                anything, on the ground or in the air.
              </p>
              <div class="post-tags">
                <span>fiction</span>
                <span>game</span>
                <span>lore</span>
              </div>
            </div>
            <div class="posts">
              <span class="post-header">They rushed out the door.</span>
              <p>
                The Dragoon is one of the core units in the Protoss army.
                Whereas normally their ground units cannot engage enemies that
                are in the air, the Dragoon can make quick work of almost
                anything, on the ground or in the air.
              </p>
              <div class="post-tags">
                <span>fiction</span>
                <span>game</span>
                <span>lore</span>
              </div>
            </div>
          </div>
        </div>`;
        currentSelectedUser.classList.toggle("active");
        currentSelectedUser = user[i];
        currentSelectedUser.classList.toggle("active");
      }
    }
    userButton[i].addEventListener("click", handleUserClick);
  }
}

getApi();
