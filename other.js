let userImg= document.getElementById('form-img')



 fetch(url)
 .then((res)=>res.json())
 .then((data)=>{
    userImg.src=`${data.currentUser.image.webp }`
   
})


 function replyCard( commentTarget){
    let reply=document.createElement('div')
    reply.classList.add('comment-reply-card','show','form-edit')
    reply.id=('comment-reply-card')
    reply.innerHTML =`
    
    <div class="addCommentForm replySubListener">
      <form class="form">
        <textarea class='text-area main-form-text-area' type="text" cols="2" rows="5" id="bodyText"  placeholder="Add a reply"></textarea>
        <div class="form-footer reply-form-footer">
        <button type="submit" class="form-btn reply-btn">REPLY</button>
        <img id='form-img' class='form-img' src="./images/avatars/image-juliusomo.png" alt="" />
        </div>
      </form>
    </div>
  </div>
    `
let replySubForm=reply.querySelectorAll('.replySubListener')
   
replySubForm.forEach((form)=>{

    

    form.addEventListener('submit',(e)=>{
        e.preventDefault()

        
        //let target=e.target.parentElement.parentElement.previousElementSibling
        let target=e.target.parentElement.parentElement
        let newTarget=e.target.parentElement.parentElement
        console.log(newTarget)
        let textSection=newTarget.querySelector('.text-area')

        fetch(url).then((res)=>res.json()).then((data)=>{
            let date =new Date().toLocaleDateString()

            const newComments= addComment(
                data.currentUser.image.png,
                data.currentUser.username,
                date,
                0,
                textSection.value
            )
        
            mainFormText.value=''



            commentTarget.append( newReply(newComments))
        })
       
       // newTarget.insertAdjacentElement('afterend',test())
        target.classList.toggle('show')
                
})
})

    return reply
 }

 
const newReply=(obj)=>{

    let newFormCopy=copyTemplate.cloneNode(true);
    let newRep=newFormCopy.querySelector('.reply-card')
    newFormCopy.querySelector('.comment-card').id= Math.random().toString(36).substring(2, 9);
  
    newFormCopy.querySelector('.username').textContent= `${obj.username}`
    newFormCopy.querySelector('.date').textContent= `${obj.date}`
    newFormCopy.querySelector('.comment-img').innerHTML= ` <img src="${obj.image}" alt="">  `
    newFormCopy.querySelector('.comment-card-content').textContent= `${obj.content}`
    let newScore=newFormCopy.getElementById('score')
    newScore.textContent= `${obj.score}`
  
    newFormCopy.querySelector(".plus").addEventListener('click',()=>{
      newScore.innerHTML=`${obj.score+=1}`
    })
    
    newFormCopy.querySelector(".minus").addEventListener('click',()=>{
      newScore.innerHTML=`${obj.score--}`
      if(obj.score<=0) obj.score = 0
    })
  
    let you= newFormCopy.querySelector('.you')
    let footer= newFormCopy.querySelector('.reply')
    if(obj.username=='juliusomo'){
            you.classList.remove('remove')
            footer.innerHTML=`  <div class="user-delete-edit-card swidth"> 
              <div class="delete-edit-btn">
                <div class="delete-btn" >
                  <img src="./images/icon-delete.svg" alt="">
                  <span class='delete-btn-check'  onclick='modalDelete(event);'>Delete</span>
                </div>
              </div>
              <div class="edit-btn">
                <img src="./images/icon-edit.svg" alt="">
                  <span class='edit'  onclick='edit(event);'>Edit</span>
              </div>
          </div> 
         
        `
    }
    
   
    return newFormCopy
  }
  

  
const allComments= JSON.parse(localStorage.getItem("finalComm")) || []
 
const addComment=(image,username,date,score,content)=>{
       allComments.push({
           image,
           username,
           date,
           score,
           content
       });
       localStorage.setItem("finalComm", JSON.stringify(allComments));

       return {image,username,date,score,content}
   
};


//main form 

function newComment(obj){
   newReply(obj)
 return mainContainer.insertBefore(newReply(obj), mainForm)

}

allComments.forEach(newComment)
mainForm.onsubmit=e=>{
    e.preventDefault();
    console.log('submit has been triggered')
    

    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      let date =new Date().toLocaleDateString()

    const newComments= addComment(
        data.currentUser.image.png,
        data.currentUser.username,
        date,
        0,
        mainFormText.value
    )

    mainFormText.value='';

      (newComment(newComments))
}
    )}


    // modal

    
const modalDelete=(e)=>{
    let target=e.target
  
    let modalContainer=document.getElementById('modal-container')
    modalContainer.classList.toggle('remove')
  
    modalContainer.querySelector('.cancel').addEventListener('click',(e)=>{
      e.preventDefault()
      modalContainer.classList.add('remove')
  
    })
  
    modalContainer.querySelector('.delete').addEventListener('click',(e)=>{
      e.preventDefault()
        console.log('hello')
        console.log(target)
        let testTarget=target.parentNode.parentNode.parentNode.parentNode.parentNode.parentElement
        if(target.classList[0] === 'delete-btn-check'){
            removeLocalStorageItem()
          testTarget.remove()
         
            }
           
    console.log(testTarget)
    console.log(testTarget)

    modalContainer.classList.add('remove')
  
    })
  }
  

  function removeLocalStorageItem(){
    let allComments
    if(localStorage.getItem("finalComm")===null){
      allComments=[]
    }
    else{
      allComments= JSON.parse(localStorage.getItem("finalComm"))
    }
    // allComments.splice(allComments.indexOf(newComment))
  
    allComments.splice(allComments.indexOf(newComment,1))
   
    localStorage.setItem("finalComm", JSON.stringify(allComments));
      
  }