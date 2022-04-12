let feed_div = document.getElementById("feed");
const mainContainer = document.getElementById("mainContainer");
let suggestionList = document.getElementById("suggestionList");
const ProfileDiv = document.getElementById("popup");

// console.log(feed);

fetch("insta-clone.json")
    .then(response => response.json())
    .then(data => {
        // here we are popullating the post feed.

        const post_div =
            `<div class="post">
                <div class="user">
                    <div class="profilepic">
                        <img src="" alt="">
                    </div>
                    <span class="userId"></span>
                </div>
                <div class="postImg">
                    <img src="" alt="post1">
                </div>
                <section>
                    <ul>
                        <li class="like" id="like-Btn"><i class="far fa-heart"></i></li>
                        <li class="comment"><i class="far fa-comment"></i></li>
                        <li class="send"><i class="far fa-paper-plane"></i></li>
                        <li class="save"><i class="far fa-bookmark"></i></li>
                    </ul>
                </section>
                <p class="likes_count"><span id="like_count"></span><span> likes</span></p>
                <div class="postDetails">
                    <p>
                        <span class="userId">&nbsp;</span>
                        <span id="desc"></span>
                    </p>
                    <!-- <button>Read more</button> -->
                    <p class="comments">view all comments</p>
                    <p class="postTime">56 minustes ago</p>
                    <hr>
                    <div class="commentSection">
                        <input type="text" name="Mycomment" id="Mycomment" placeholder="Add a Comment...">
                        <button class="post_btn">Post</button>
                    </div>
                </div>
            </div>`

        for (let index = 0; index < 8; index++) {


            feed_div.innerHTML += post_div;
            const post_arr = feed_div.querySelectorAll(".post");
            const element = post_arr[index];
            // console.log(element)

            element.children[0].children[0].children[0].setAttribute("src", `${data.posts[index].profilepic}`)
            element.children[0].children[1].innerHTML = `${data.posts[index].user_Id}`
            element.children[4].children[0].children[0].innerHTML = `${data.posts[index].user_name}`
            element.children[1].children[0].setAttribute("src", `${data.posts[index].postimg}`)
            element.children[3].children[0].innerHTML = `${data.posts[index].likes}`;
            element.children[4].children[0].children[1].innerHTML = `${data.posts[index].description}`

            let posttime = `${data.posts[index].post_time}`

            if (posttime >= 60) {
                posttime = Math.floor(posttime / 60);
                element.children[4].children[2].innerHTML = posttime + " hours ago"
            }
            else {
                element.children[4].children[2].innerHTML = posttime + " minutes ago"
            }
        }

        // console.log(SuggestionItemList);
        // here we are popullating the suggestions list

        const suggestion_div = `<div class="suggestion-Item">
                                    <div class="profilepic">
                                        <img src="" alt="">
                                    </div>
                                    <span class="userId"></span>
                                    <span class="userName"></span>
                                    <button class="follow-btn">Follow +</button>
                                </div>`


        for (let index2 = 0; index2 < 10; index2++) {

            suggestionList.innerHTML += suggestion_div;
            const SuggestionItemList = suggestionList.querySelectorAll(".suggestion-Item");


            const element2 = SuggestionItemList[index2];

            element2.children[0].children[0].setAttribute("src", `${data.suggetions[index2].profilepic}`)
            element2.children[1].innerHTML = `${data.suggetions[index2].user_Id}`
            element2.children[2].innerHTML = `${data.suggetions[index2].user_name}`
        }

        const follow_btns = document.querySelectorAll(".follow-btn");
        

        follow_btns.forEach(element => {
            element.addEventListener('click', () => {
               element.classList.toggle("true");

               if(element.classList.contains("true")) {
                   element.innerText = `Unfollow -`;
               }
               else {
                    element.innerText = `Follow +`;
               }
            })
        });


        const likeBtns = document.querySelectorAll(".like");
        likeBtns.forEach(element => {
            element.addEventListener('click', (e) => {
                if (element.children[0].classList.contains("far")) {
                    element.children[0].classList.remove("far")
                    element.children[0].classList.add("fas")
                    element.children[0].classList.add("liked")
                    likes_counter();
                }
                else {
                    element.children[0].classList.remove("fas")
                    element.children[0].classList.remove("liked")
                    element.children[0].classList.add("far")
                    likes_counter();
                }
            })
        });

        const saveBtns = document.querySelectorAll(".save");
        saveBtns.forEach(element => {
            element.addEventListener('click', (e) => {
                if (element.children[0].classList.contains("far")) {
                    element.children[0].classList.remove("far")
                    element.children[0].classList.add("fas")
                    savePost(saved_posts, element.parentNode.parentNode.parentNode);
                }
                else {
                    element.children[0].classList.remove("fas")
                    element.children[0].classList.add("far")
                    saved_posts = UnsavePost(saved_posts, element.parentNode.parentNode.parentNode);
                }
            })
        });

        const user = document.getElementsByClassName("userId");
        const popup = document.getElementById("popup");

        Array.from(user).forEach(element => {
            element.addEventListener('click', () => {
                popup.classList.remove("hidden");

                let index = data.users.findIndex( function(object){
                    // console.log();
                    return object.userId === element.innerText;
                });
                console.log(index)
                if(index === -1) {
                    popup.innerHTML = `<i class="far fa-times-circle popup-close" id="popup-close"></i><span>No Details Avilable about user</span>`;
                    popup.classList.toggle("empty");
                }
                else {
                popup.innerHTML = `            <i class="far fa-times-circle popup-close" id="popup-close"></i>

                    <div class="profileHeader">
                        <div class="profile-pic-name">
                            <img src="${data.users[index].profilePic}" alt="ProfilePictureHere">
                        </div>
                        <div class="follower-follow-post">
                            <div class="userCredentials">
                                <span class="followers-count">${data.users[index].followers}</span>
                                <span>Followers</span>
                            </div>
                            <div class="userCredentials">
                                <span class="follows-count">${data.users[index].follows}</span>
                                <span>Follows</span>
                            </div>
                            <div class="userCredentials">
                                <span class="post-count">${data.users[index].posts}</span>
                                <span>Posts</span>
                            </div>
                        </div>
                    </div>
        
                    <div class="profile-description">
        
                        <ul>
                            <li>
                                <span class="userName">${data.users[index].userName}</span>
                            </li>
                            <li>
                                Actor
                            </li>
                            <li>
                                Animal lover
                            </li>
                            <li>
                                World Travellor
                            </li>
                            <li>
                                Emial: sd918782@gmail.com
                            </li>
                            <li>
                                linkin: Subham_dey@demoID
                            </li>
                            <li>
                                <b><center style="margin: 10px 0px 0px 0px">Hover to see enlarged image</center></b>
                            </li>
                        </ul> 
                            <div class="gallary">
                            </div>
                    </div>`;

                    let GallaryDiv = popup.getElementsByClassName("gallary")[0];
                    


                        for(let i=0; i<`${data.users[index].PostGallary.length}`; i++) {

                            GallaryDiv.innerHTML += `<img src="${data.users[index].PostGallary[i]}" alt="">`;
                        }

                    }

                mainContainer.classList.add("blured");

                const PopupBtn = document.getElementById("popup-close");

                PopupBtn.addEventListener('click', () => {
                    popup.classList.add("hidden");
                    popup.classList.remove("empty");
                    popup.innerHTML = ``;
                    mainContainer.classList.remove("blured");
                })
            })
        });

        saved_posts = [];
        function savePost(saved_posts, index) {
            saved_posts.push(index);
        }

        function UnsavePost(saved_posts, index) {
            return saved_posts.filter(function (ele) {
                return ele != index;
            });
        }

        function likes_counter() {
            postArr = feed_div.children;

            for (let index = 0; index < postArr.length; index++) {
                const element = postArr[index];
                if (element.children[2].children[0].children[0].children[0].classList.contains("liked")) {
                    element.children[3].children[0].innerHTML = Number(`${data.posts[index].likes}`) + 1;
                }
                else {
                    element.children[3].children[0].innerHTML = Number(`${data.posts[index].likes}`);
                }
            }
        }

    })




