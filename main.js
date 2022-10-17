const url = "./data.json";

let userImg= document.getElementById('form-img')

 fetch(url)
 .then((res)=>res.json())
 .then((data)=>{
    userImg.src=`${data.currentUser.image.webp }`
   
})


let currentUser = {};
let comments = []

function fetchComments() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        currentUser = data.currentUser;
        comments = data.comments;
        setComments(comments);
        setCurrentUser(currentUser);
        renderComments();
       
    })
}


function setCurrentUser(user) {
    user = JSON.stringify(user);
    window.localStorage.setItem('currentUser', user);
}

function getCurrentUser() {
    let user  = window.localStorage.getItem('currentUser');
    return JSON.parse(user);
}

function setComments(comments) {
    comments = JSON.stringify(comments);
    window.localStorage.setItem('comments', comments);
}

function getComments() {
    let comments = window.localStorage.getItem('comments');
    if (comments) return JSON.parse(comments);
    
}


function hasLocalContent() {
    return window.localStorage.getItem('comments') &&
    window.localStorage.getItem('currentUser');
}

// for each individual comment from the comments array, call create comment filling it with it objects and picking the parent 
// id from each object. comnt is the comment object

function renderComments() {
    comments.forEach(comnt => {
        let comment = createComment(comnt, comnt.id);
        allComments.appendChild(comment);
        renderReplies(comnt);
    })
}

// this create a div which takes an id as replies + parent ID with a class 
// replies-container
function createRepliesContainer(parentId) {
    let container = document.createElement('div');
    container.classList.add('replies-container');
    container.id = "replies"+parentId; 
    return container;
}


function currentUserTag() {
    return `
        <span class="user-icon">you</span>
    `
}

// this is called in the replyComntText so that the comment to be replied with it user is tracked
function comntTextNode(content,replyUser) {
    let contentText = '';
    if (replyUser)
        contentText = `<span class="reply-user">@${replyUser}</span>&nbsp;`
    contentText += content;
    return contentText;
}


function replyComntText(comnt) {
    return comntTextNode(comnt.content, comnt.replyingTo);
}

//this function is called in the renderCommments. A new container is created which takes the createRepliesContainer
//which accepts a parent Id. The parentComnt here is the comnt in the renderComments forEach. The replies array is accessed
// from the main comment. A new comment is created from the create Comment
function renderReplies(parentComnt) {
    let container = createRepliesContainer(parentComnt.id);
    parentComnt.replies.forEach(reply => {
        let comment = createComment(reply, parentComnt.id);
        comment.querySelector(".comment-card-content").innerHTML = replyComntText(reply);
        container.appendChild(comment);
    })
    allComments.appendChild(container);
}


if (hasLocalContent()) {
    comments = getComments();
    currentUser = getCurrentUser();
    renderComments();
} else {
    fetchComments();
}


function addLocalComnt(comnt) {
    let comments = getComments();
    comments.push(comnt);
    setComments(comments);
}

function addLocalReply(comntId, reply) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === comntId);
    comments[cmntIndex].replies.push(reply);
    setComments(comments);
}


function replyComntText(comnt) {
    return comntTextNode(comnt.content, comnt.replyingTo);
}


function renderReplyComnt(replyObj, parentId) {
    const container = document.getElementById("replies" + parentId);
    let comnt = createComment(replyObj, parentId);
    comnt.querySelector(".card-content").innerHTML = replyComntText(replyObj);
    container.appendChild(comnt);
}