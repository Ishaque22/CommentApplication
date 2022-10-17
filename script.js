
function edit(e){
    e.preventDefault()
    let target=e.target
    let formEdit =e.target.parentElement.parentElement.parentElement.parentElement.parentElement
    let btnUpdateShow=formEdit.querySelector('.update-btn')
    btnUpdateShow.classList.remove('remove')
  
    console.log(target)
    console.log('i am edit btn')
    if(target.classList.contains('edit')){
        console.log('hi')
        console.log(formEdit.children[1].textContent)
       formEdit.querySelector('.comment').innerHTML=`<textarea class='edit-text-area' name="" id="" cols="15" rows="4">${formEdit.children[1].textContent}</textarea>`
    }
    
  }
  
  
  function update(e){
    e.preventDefault()
    let target=e.target.parentElement.parentElement.previousElementSibling
    target.querySelector('.comment')
    console.log(target.querySelector('.edit-text-area').value)
    let content=target.querySelector('.edit-text-area').value
    target.textContent=content
    



    let targetParent=e.target.parentElement
   targetParent.classList.toggle('remove')
  }
