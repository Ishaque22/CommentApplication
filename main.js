let template=document.getElementById('container-template').content;
let copyTemplate=document.importNode(template,true);
let main= document.getElementById('comment-container')
let mainContainer=document.querySelector('.container')
let mainForm=document.querySelector('.main-form')
let mainFormText=document.querySelector('.main-form-text-area')
let userImg= document.getElementById('form-img')




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
            id:data.id,
            name:data.user.username,
            date:data.createdAt,
            image:data.user.image.png,
            content:data.content,
            score:data.score,
            

        }

        comments(obj);
       
       
        data.replies.forEach((data)=>{
          let obj={
              id:data.id,
              name:data.user.username,
              date:data.createdAt,
              image:data.user.image.png,
              content:data.content,
              score:data.score,
              replyTo:data.replyingTo
          }
          console.log(obj.replyTo)
          console.log(obj)
          reply(obj);
        
         
      })
       
      })
    })

let cloneCopy;
let replyAppend;
let replyBtnForm;
let replyNewAppend;
function comments(obj){
  cloneCopy=copyTemplate.cloneNode(true)

  cloneCopy.querySelector('.username').textContent= `${obj.name}`
  cloneCopy.querySelector('.date').textContent= `${obj.date}`
  cloneCopy.querySelector('.comment-img').innerHTML= ` <img src="${obj.image}" alt="">  `
  cloneCopy.querySelector('.comment-card-content').textContent= `${obj.content}`
let newScore= cloneCopy.getElementById('score');
newScore.textContent= `${obj.score}`

  cloneCopy.querySelector(".plus").addEventListener('click',()=>{
    newScore.innerHTML=`${obj.score+=1}`
  })

  cloneCopy.querySelector(".minus").addEventListener('click',()=>{
    newScore.innerHTML=`${obj.score--}`
    if(obj.score<=0) obj.score = 0
  })

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
newReplyCopy.querySelector('.comment-card-content').innerHTML= `<strong class='replyTo'>@${obj.replyTo}</strong>  ${obj.content}`

let newScore=newReplyCopy.getElementById('score')


newScore.textContent= `${obj.score}`
newReplyCopy.querySelector(".plus").addEventListener('click',()=>{
  newScore.innerHTML=`${obj.score+=1}`
})

newReplyCopy.querySelector(".minus").addEventListener('click',()=>{
  newScore.innerHTML=`${obj.score--}`
  if(obj.score<=0) obj.score = 0
})


let replyForm=newReplyCopy.getElementById('comment-reply-card');
let btn=newReplyCopy.querySelector('.reply')


let you= newReplyCopy.querySelector('.you')
let footerRelpy= newReplyCopy.querySelector('.reply')
if(obj.name=='juliusomo'){
  you.classList.remove('remove')
  footerRelpy.innerHTML=`  <div class="user-delete-edit-card"> 
    <div class="delete-edit-btn">
      <div class="delete-btn" >   
        <img class='btn-test' src="./images/icon-delete.svg" alt="">
        <span class='delete-btn-check' onclick='modalDelete(event);'>Delete</span>
      </div>
    </div>
    <div class="edit-btn">
      <img class='edit-test'  src="./images/icon-edit.svg" alt="">
        <span >Edit</span>
    </div>
</div> 
`
}
else{
  btn.addEventListener('click',(e)=>{
     replyForm.classList.toggle('show')
  }) 
}    
replyAppend.append(newReplyCopy)

}

const newComment=(obj)=>{

  let newFormCopy=copyTemplate.cloneNode(true);

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
          footer.innerHTML=`  <div class="user-delete-edit-card"> 
            <div class="delete-edit-btn">
              <div class="delete-btn" >
                <img src="./images/icon-delete.svg" alt="">
                <span class='delete-btn-check'  onclick='modalDelete(event);'>Delete</span>
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

  allComments.splice(allComments.indexOf(newComment,0))
 
  localStorage.setItem("finalComm", JSON.stringify(allComments));
    
}

function replySubmit(e){
  e.preventDefault()
  console.log('hello testing me')
 let target=e.target.parentElement.parentElement.parentElement.parentElement
 console.log(target)
  target.classList.add('show')
}
