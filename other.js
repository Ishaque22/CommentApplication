 /*   // modal
const showModal=(comntId, parentId)=>{
   
    let modalContainer=document.getElementById('modal-container')
    modalContainer.classList.toggle('remove')
  
    modalContainer.querySelector('.cancel').addEventListener('click',(e)=>{
      e.preventDefault()
      modalContainer.classList.add('remove')
  
    })
  
    modalContainer.querySelector('.delete').addEventListener('click',(e)=>{
      e.preventDefault()
        console.log('hello')
        try{
        deleteUserComnt(comntId, parentId)
        }
        catch(err){
                console.log(err+'i am a test')
        }

    modalContainer.classList.add('remove')
  
    })
  }
  

  function deleteLocalComnt(id, parentId) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === parentId);
    if (!comments[cmntIndex]) return;
    if (id === parentId) {
        comments.splice(cmntIndex, 1);
    } else {
        let replies = comments[cmntIndex].replies;
        let replyIndex = replies.findIndex(reply => reply.id === id);
        comments[cmntIndex].replies.splice(replyIndex, 1);
    }
    setComments(comments);
}


  function deleteUserComnt(comntId, parentId) {
    document.getElementById('comnt' + comntId).remove();
    deleteLocalComnt(comntId, parentId);
} */

  //edit and update

  
  function editUserComnt(btnElem, comntId, parentId) {
    btnElem.disabled = true;
    const comntElem = document.getElementById('comnt' + comntId);
    const comntArea = comntElem.querySelector('.comment-card-content');
    let comnt = getCommt(comntId, parentId);
    comntArea.textContent = '';
    comntArea.innerHTML = editBox(comnt, parentId);
    comntArea.querySelector('textarea').focus();
}


function editBox(comnt, parentId) {
    let inReply = comnt.replyingTo ? `data-reuser="${comnt.replyingTo}"` : '';
    return `
        <textarea class='main-form-text-area' placeholder="Add a comment..." rows="4"
            >${comnt.content}</textarea>
        <button class="btn  " ${inReply}
            onclick="updateUserComnt(this, ${comnt.id}, ${parentId})">
        UPDATE</button>
    `
}


function editLocalComnt(id, parentId, comntText) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === parentId);
    if (id === parentId) {
        comments[cmntIndex].content = comntText;
    } else {
        let replies = comments[cmntIndex].replies;
        let replyIndex = replies.findIndex(reply => reply.id === id);
        comments[cmntIndex].replies[replyIndex].content = comntText;
    }
    setComments(comments);
}

function updateUserComnt(btnElem, comntId, parentId) {
    const comnt = document.getElementById('comnt' + comntId);
    const comntArea = comnt.querySelector('.comment-card-content');
    let content = comntArea.querySelector('textarea').value;
    if (content === '') return;
    comntArea.textContent = '';
    editLocalComnt(comntId, parentId, content)
    let textElem = document.createElement('p');
    textElem.classList.add('comnt-txt');
    textElem.innerHTML = comntTextNode(content, btnElem.dataset.reuser);
    comntArea.appendChild(textElem);
    comnt.querySelector('.edit-btn').disabled = false;
}


//main form commment


function comntObject(comntText, user) {
    return {
        id: genID(),
        content: comntText,
        createdAt:newDate() ,
        vote: {
            score: 0,
            detail: []
        },
        user: user,
        replies: []
    }
}


function  sendComent(e){
    e.preventDefault()
    console.log('I am working')
    const comntArea = mainFormSubmit.querySelector('textarea');
    let comntText = comntArea.value;
    if (!comntText) return;
    let comntObj = comntObject(comntText, currentUser);
    addLocalComnt(comntObj);
    let comment = createComment(comntObj, comntObj.id);
    allComments.appendChild(comment);
    comntArea.value = "";
}
