const likeBtns = document.querySelectorAll(".like");
const saveBtns = document.querySelectorAll(".save");
const post_arr = document.getElementsByClassName("post");
const user = document.getElementsByClassName("userId");
const mainContainer = document.getElementById("mainContainer");
const SuggestionItemList = document.querySelectorAll(".suggestion-Item");
const ProfileDiv = document.getElementById("popup");

console.log(mainContainer);

Array.from(user).forEach(element => {
    element.addEventListener('click', ()=> {
        popup.classList.remove("hidden");
        mainContainer.classList.add("blured");

        const PopupBtn = document.getElementById("popup-close");

        PopupBtn.addEventListener('click', ()=> {
            popup.classList.add("hidden");
            mainContainer.classList.remove("blured");
        })
    })
});




fetch("insta-clone.json")
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < post_arr.length; index++) {
            const element = post_arr[index];

            element.children[0].children[0].children[0].setAttribute( "src", `${data.posts[index].profilepic}` )
            element.children[0].children[1].innerHTML = `${data.posts[index].user_name}`
            element.children[4].children[0].children[0].innerHTML = `${data.posts[index].user_name}`
            element.children[1].children[0].setAttribute("src", `${data.posts[index].postimg}`)
            element.children[4].children[0].children[1].innerHTML = `${data.posts[index].description}`
        }
            
            // console.log(SuggestionItemList);
            
            for (let index2 = 0; index2 < 7; index2++) {
                const element2 = SuggestionItemList[index2];
                
                element2.children[0].children[0].setAttribute("src", `${data.posts[index2].profilepic}`)
                element2.children[1].innerHTML = `${data.posts[index2].user_Id}`
            }
    })
            
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