const allComments = document.getElementById("comments");
const mainFormSubmit = document.querySelector('.main-form')
const main = document.querySelector('main')
const commentTemplate = document.getElementById("comment-template");



function newDate(){
    let date =new Date().toLocaleDateString()
    return date
}

function createComment(obj, parentId) {
    let clone = commentTemplate.content.cloneNode(true);
    clone.querySelector("img").src = obj.user.image.png;
    clone.querySelector("img").alt = obj.user.username;
    clone.querySelector(".comment-card").id = 'comnt' + obj.id;
    clone.querySelector(".comment-username").innerText = obj.user.username;
    clone.querySelector(".card-content").innerText = obj.content;
   
    clone.querySelector(".comment-card-date").innerText = obj.createdAt;
    let actionBtns = clone.querySelector(".comment-action");

    let score=clone.getElementById("score").innerText=obj.score || 0;
    let newScore=clone.getElementById("score")
    if (obj.user.username === currentUser.username) {
        clone.querySelector(".comment-username").innerHTML += currentUserTag();
        actionBtns.innerHTML = userBtns(obj.id, parentId);
    } else {
        actionBtns.innerHTML = replyBtn(obj.id, parentId);
    }

    console.log(parentId)
    clone.querySelector('.plus-icon').addEventListener('click',()=>{
      newScore.innerText=score+=1
    })

    clone.querySelector('.minus-icon').addEventListener('click',()=>{
        newScore.innerText=score--
        if(score<=0) score = 0
      })
  
    return clone;
}


function replyBtn(comntId, parentId) {
    return `
        <button class="btn reply-btn" onclick=" replyBtnClick(event)">
            <img src="images/icon-reply.svg" alt="">&nbsp; Reply
        </button>
        
    `
}

function replyBtnClick(e){
    e.preventDefault()
    let target= e.target
    console.log(target)
    console.log(target.parentElement.parentElement.nextElementSibling)
    let toBeToggled=target.parentElement.parentElement.nextElementSibling
    if(toBeToggled){
      toBeToggled.classList.toggle('show')
    }
    
    
}

function userBtns(comntId, parentId) {
    return `
        <button class="delete-btn" 
            onclick="showModal(${comntId}, ${parentId})">
            <img src="images/icon-delete.svg" alt="">&nbsp; Delete
        </button>
        <button class="edit-btn"
            onclick="editUserComnt(this, ${comntId}, ${parentId})">
            <img src="images/icon-edit.svg" alt="">&nbsp; Edit
        </button>
    `
}

function replyBox(comntId, parentId, reUser) {
    return `
        <div class="reply-box show" id="box${comntId}" >
            <textarea class='main-form-text-area' placeholder="Add a comment..." rows="3"></textarea>
            <div class="reply-box-footer">
                <img src="${currentUser.image.png}" 
                    width="34" height="34" class="mobile-only">
                <button class="reply-box-footer-btn" data-reuser="${reUser}"
                    onclick="sendReply(this, ${comntId}, ${parentId})" >
                    REPLY</button>
            </div>
        </div>

        <style>
        .show{
            display:none
        }
        </style>
    `
}

function replyingTo(comntId, parentId) {
    let comnt = getCommt(comntId, parentId);
    const comntElem = document.getElementById('comnt' + comntId);
    let boxElem = replyBox(comntId, parentId, comnt.user.username);
    comntElem.insertAdjacentHTML("afterend", boxElem);
    document.querySelector('#box'+comntId).
        querySelector('textarea').focus();
        document.querySelector('#box'+comntId)
       

        
        
}


function getCommt(id, parentId) {
    let comments = getComments();
    let comnt = comments.find(cmnt => cmnt.id === parentId);
    if (id === parentId)
        return comnt;
    let replies = comnt.replies;
    return replies.find(reply => reply.id === id);
}


function genID() {
    let lastId = window.localStorage.getItem('last-id');
    if (!lastId) lastId = 13;
    window.localStorage.setItem('last-id', ++lastId);
    return lastId;
}



function replyObject(replyText, reUser, user) {
    return {
        id: genID(),
        content: replyText,
        createdAt:newDate(),
        vote: {
            score: 0,
            detail: []
        },
        replyingTo: reUser,
        user: user
    }
}


function sendReply(btnElem, id, parentId) {
    const boxElem = document.getElementById('box' + id);
    let replyText = boxElem.querySelector('textarea').value;
    let reUser = btnElem.dataset.reuser;
    let replyObj = replyObject(replyText, reUser, currentUser);
    addLocalReply(parentId, replyObj);
    renderReplyComnt(replyObj, parentId);
    boxElem.classList.add('show')
}

