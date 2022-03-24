let feed_div = document.getElementById("feed");
const user = document.getElementsByClassName("userId");
const mainContainer = document.getElementById("mainContainer");
let suggestionList = document.getElementById("suggestionList");
const ProfileDiv = document.getElementById("popup");

console.log(feed);


Array.from(user).forEach(element => {
    element.addEventListener('click', () => {
        popup.classList.remove("hidden");
        mainContainer.classList.add("blured");

        const PopupBtn = document.getElementById("popup-close");

        PopupBtn.addEventListener('click', () => {
            popup.classList.add("hidden");
            mainContainer.classList.remove("blured");
        })
    })
});




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
                <p class="likes_count">634 likes</p>
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
            console.log(element)

            element.children[0].children[0].children[0].setAttribute("src", `${data.posts[index].profilepic}`)
            element.children[0].children[1].innerHTML = `${data.posts[index].user_Id}`
            element.children[4].children[0].children[0].innerHTML = `${data.posts[index].user_name}`
            element.children[1].children[0].setAttribute("src", `${data.posts[index].postimg}`)
            element.children[3].innerHTML = `${data.posts[index].likes}` + " likes"
            element.children[4].children[0].children[1].innerHTML = `${data.posts[index].description}`

            let posttime = `${data.posts[index].post_time}`

            if(posttime >= 60 ) {
                posttime = Math.floor(posttime/60);
                element.children[4].children[2].innerHTML = posttime + " hours ago"
            }
            else{
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
                                    <button>Follow +</button>
                                </div>`


        for (let index2 = 0; index2 < 10; index2++) {

            suggestionList.innerHTML += suggestion_div;
            const SuggestionItemList = suggestionList.querySelectorAll(".suggestion-Item");


            const element2 = SuggestionItemList[index2];

            element2.children[0].children[0].setAttribute("src", `${data.suggetions[index2].profilepic}`)
            element2.children[1].innerHTML = `${data.suggetions[index2].user_Id}`
            element2.children[2].innerHTML = `${data.suggetions[index2].user_name}`
        }


        const likeBtns = document.querySelectorAll(".like");
        likeBtns.forEach(element => {
            element.addEventListener('click', (e) => {
                if (element.children[0].classList.contains("far")) {
                    element.children[0].classList.remove("far")
                    element.children[0].classList.add("fas")
                }
                else {
                    element.children[0].classList.remove("fas")
                    element.children[0].classList.add("far")
                }
            })
        });
        
        const saveBtns = document.querySelectorAll(".save");
        saveBtns.forEach(element => {
            element.addEventListener('click', (e) => {
                if (element.children[0].classList.contains("far")) {
                    element.children[0].classList.remove("far")
                    element.children[0].classList.add("fas")
                }
                else {
                    element.children[0].classList.remove("fas")
                    element.children[0].classList.add("far")
                }
            })
        });

    })

