let template=document.getElementById('container-template').content;
let copyTemplate=document.importNode(template,true);
let main= document.getElementById('container-to-append')
let replyMain= document.querySelector('.reply-append')
let modal =document.querySelector('.background-modal')
let userImg= document.getElementById('main-form-img')
let mainForm=document.querySelector('.form')
let mainContainer= document.querySelector('.main-container')


let url= './data.json';
 fetch(url)
 .then((res)=>res.json())
 .then((data)=>{
    userImg.src=`${data.currentUser.image.webp }`
})


console.log(copyTemplate)


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
        comment(obj);

        data.replies.forEach((data)=>{
            let obj={
                name:data.user.username,
                date:data.createdAt,
                image:data.user.image.png,
                content:data.content
            }
            reply(obj);
        })
       
    })     
 
})


const comment=(obj)=>{
    let newCopy=copyTemplate.cloneNode(true);
    newCopy.querySelector('.username').textContent= `${obj.name}`
    newCopy.querySelector('.date').textContent= `${obj.date}`
    newCopy.querySelector('.img').innerHTML= ` <img src="${obj.image}" alt="">  `
    newCopy.querySelector('.comment-card-content').textContent= `${obj.content}`

    let replyForm=newCopy.getElementById('reply-form');

    let btn=newCopy.querySelector('.reply-button')
    btn.addEventListener('click',(e)=>{
       replyForm.classList.toggle('show')
    }) 
    main.append(newCopy)   
}


    const reply=obj=>{
        let newReplyCopy=copyTemplate.cloneNode(true);
    newReplyCopy.querySelector('.username').textContent= `${obj.name}`
    newReplyCopy.querySelector('.date').textContent= `${obj.date}`
    newReplyCopy.querySelector('.img').innerHTML= ` <img src="${obj.image}" alt="">  `
    newReplyCopy.querySelector('.comment-card-content').textContent= `${obj.content}`
    let footer= newReplyCopy.querySelector('.reply-button')

    let replyForm=newReplyCopy.getElementById('reply-form');
    if(obj.name=='juliusomo'){
            footer.innerHTML=`  <div class="user-delete-edit-card"> 
              <div class="delete-edit-btn">
                <div class="delete-btn" onclick='toggleModal(event)'>
                  <img src="./images/icon-delete.svg" alt="">
                  <span>DELETE</span>
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
        let btn=newReplyCopy.querySelector('.reply-button')
        btn.addEventListener('click',(e)=>{
           replyForm.classList.toggle('show')
        }) 
    }    
    replyMain.append(newReplyCopy)  
    }


 const toggleModal=(e)=>{
        modal.classList.toggle('show')
 }

 //creating a new comment
 const newComment=(obj)=>{

    let newFormCopy=copyTemplate.cloneNode(true);

    newFormCopy.querySelector('.username').textContent= `${obj.username}`
    newFormCopy.querySelector('.date').textContent= `${obj.date}`
    newFormCopy.querySelector('.img').innerHTML= ` <img src="${obj.image}" alt="">  `
    newFormCopy.querySelector('.comment-card-content').value
   
    let footer= newFormCopy.querySelector('.reply-button')
    if(obj.username=='juliusomo'){
            footer.innerHTML=`  <div class="user-delete-edit-card"> 
              <div class="delete-edit-btn">
                <div class="delete-btn" onclick='toggleModal(event)'>
                  <img src="./images/icon-delete.svg" alt="">
                  <span>DELETE</span>
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
 
 const addComment=(image,username,date,score)=>{
        allComments.push({
            image,
            username,
            date,
            score
        });
        localStorage.setItem("finalComm", JSON.stringify(allComments));

        return {image,username,date,score}
    
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
        0
    )

    let test= document.createElement('div')
    test.innerHTML=`hello world`

   
    mainContainer.insertBefore(newComment(newComments),mainForm)
}
    )}
