let template=document.getElementById('container-template').content;
let copyTemplate=document.importNode(template,true);
let main= document.getElementById('comment-container')
let mainContainer=document.querySelector('.container')
let mainForm=document.querySelector('.main-form')
let mainFormText=document.querySelector('.main-form-text-area')

let url='./data.json'


function commentData(){
    
    fetch(url).then((res)=>res.json()).then((data)=>{
        data.comments.map((data)=>{
            let obj={
                id:data.id,
                name:data.user.username,
                date:data.createdAt,
                image:data.user.image.png,
                content:data.content,
                score:data.score,
            }
            

            cloneCopy=copyTemplate.cloneNode(true)
            let reply= cloneCopy.querySelector('.reply-card')
            let card=cloneCopy.querySelector('.comment-card')
            cloneCopy.querySelector('.username').textContent= `${obj.name}`
            cloneCopy.querySelector('.comment-card').id= `${obj.id}`
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
                
            let btn=cloneCopy.querySelector('.reply')
            card.insertAdjacentElement('afterend',replyCard(reply))
        
            let replyForm=cloneCopy.getElementById('comment-reply-card');
            btn.addEventListener('click',(e)=>{
            replyForm.classList.toggle('show')
        }) 
       
        
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
                
                let newReplyCopy=copyTemplate.cloneNode(true);
                let replyReply=newReplyCopy.querySelector('.comment-card')
                newReplyCopy.querySelector('.comment-card').id= `${obj.id}`
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
              
              
              let replyReplyForm=newReplyCopy.getElementById('comment-reply-card');
              let replybtn=newReplyCopy.querySelector('.reply')
              
              
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
                      <span class='edit' onclick='edit(event)' >Edit</span>
                  </div>
              </div> 
              
              `
              }
              else{
                replyReply.insertAdjacentElement('afterend',replyCard(reply))
                replybtn.addEventListener('click',(e)=>{
                    let target= e.target.parentElement.parentElement.parentElement.nextElementSibling
                    target.classList.toggle('show')
                   console.log(target)
                }) 
                

              }    
              
              
              return reply.append(newReplyCopy)
              
              }
              
              
            )
            return main.append(cloneCopy) 
    })
      
   
    }
)}


commentData()

