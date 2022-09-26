let template=document.getElementById('container-template').content;
let copyTemplate=document.importNode(template,true);
let main= document.getElementById('comment-container')
let mainContainer=document.querySelector('.container')
let mainForm=document.querySelector('.main-form')
let mainFormText=document.querySelector('.main-form-text-area')
let userImg= document.getElementById('form-img')
let modal =document.querySelector('.background-modal')





let url= './data.json';
 fetch(url)
 .then((res)=>res.json())
 .then((data)=>{
    userImg.src=`${data.currentUser.image.webp }`
})



fetch(url)
.then((res)=>res.json())
.then((data)=>{
    data.comments.map((data)=>{
        let obj={
            name:data.user.username,
            date:data.createdAt,
            image:data.user.image.png,
            content:data.content

        }

        comments(obj);
        data.replies.forEach((data)=>{
          let obj={
              name:data.user.username,
              date:data.createdAt,
              image:data.user.image.png,
              content:data.content
          }
          console.log(obj)
         replyAppend.append(reply(obj))
         
      })

       
      })
    })

let cloneCopy;
let replyAppend;
let replyBtnForm;
function comments(obj){
  cloneCopy=copyTemplate.cloneNode(true)
 
  cloneCopy.querySelector('.username').textContent= `${obj.name}`
  cloneCopy.querySelector('.date').textContent= `${obj.date}`
  cloneCopy.querySelector('.comment-img').innerHTML= ` <img src="${obj.image}" alt="">  `
  cloneCopy.querySelector('.comment-card-content').textContent= `${obj.content}`
 replyAppend=cloneCopy.querySelector('.reply-card')

 let replyForm=cloneCopy.getElementById('comment-reply-card');
 let btn=cloneCopy.querySelector('.reply')

 btn.addEventListener('click',(e)=>{
  replyForm.classList.toggle('show')
}) 

  main.append(cloneCopy)   

   
    mainFormText.value=''

   
    
}
    




const reply=obj=>{
  let newReplyCopy=copyTemplate.cloneNode(true);
newReplyCopy.querySelector('.username').textContent= `${obj.name}`
newReplyCopy.querySelector('.date').textContent= `${obj.date}`
newReplyCopy.querySelector('.comment-img').innerHTML= ` <img src="${obj.image}" alt="">  `
newReplyCopy.querySelector('.comment-card-content').textContent= `${obj.content}`

let replyForm=newReplyCopy.getElementById('comment-reply-card');
let btn=newReplyCopy.querySelector('.reply')



let footerRelpy= newReplyCopy.querySelector('.reply')
if(obj.name=='juliusomo'){
  footerRelpy.innerHTML=`  <div class="user-delete-edit-card"> 
    <div class="delete-edit-btn">
      <div class="delete-btn" onclick='toggleModal(event)'>
        <img src="./images/icon-delete.svg" alt="">
        <span>Delete</span>
      </div>
    </div>
    <div class="edit-btn">
      <img src="./images/icon-edit.svg" alt="">
        <span>Edit</span>
    </div>
</div> 
`
}
else{
  btn.addEventListener('click',(e)=>{
     replyForm.classList.toggle('show')
  }) 
}    

return newReplyCopy


}


//creating a new comment
const newComment=(obj)=>{

  let newFormCopy=copyTemplate.cloneNode(true);

  newFormCopy.querySelector('.username').textContent= `${obj.username}`
  newFormCopy.querySelector('.date').textContent= `${obj.date}`
  newFormCopy.querySelector('.comment-img').innerHTML= ` <img src="${obj.image}" alt="">  `
  newFormCopy.querySelector('.comment-card-content').textContent= `${obj.content}`
  let replyForm=newFormCopy.getElementById('comment-reply-card');
 
  let footer= newFormCopy.querySelector('.reply')
  if(obj.username=='juliusomo'){
          footer.innerHTML=`  <div class="user-delete-edit-card"> 
            <div class="delete-edit-btn" onclick='toggleModal(event)'>
              <div class="delete-btn" >
                <img src="./images/icon-delete.svg" alt="">
                <span>Delete</span>
              </div>
            </div>
            <div class="edit-btn">
              <img src="./images/icon-edit.svg" alt="">
                <span>Edit</span>
            </div>
        </div> 
      `
  }
 

  mainContainer.insertBefore(newFormCopy,mainForm)
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

   
    mainFormText.value=''

   
    mainContainer.insertBefore(newComment(newComments),mainForm)
}
    )}


    const toggleModal=(e)=>{
      modal.classList.toggle('remove')
}
    
