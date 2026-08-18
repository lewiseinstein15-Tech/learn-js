const list = document.getElementById('showlist');
const daytask = document.getElementById('daytasks');
async function fetchtasks (){
    try{
        
    const raw = await fetch("http://localhost:5000/datatest/");
    const days= await raw.json();
    for(day of days){
        const tabledata = document.createElement('td');
        tabledata.innerText = day;
        
        if (day == ""){
            console.log("empty string day");
        }
        
        list.appendChild(tabledata);


        
        const raw2 = await fetch(`http://localhost:5000/datatest/${day}`);
      

     
        const data2 = await raw2.json();
        if (data2.length == 0 ){
            console.log("empty day datasets");
        }
        data2.forEach((item,index)=> {
            
        const  li = document.createElement('li');

            console.log(item);
            const key = Object.keys(item);
            const value = Object.values(item);

            li.innerHTML = `
            <li>${key} : ${value} </li>
            <div class="deletetask" onclick="deletetask('${day}',${index})">Delete task </div>

            `;
            
          list.appendChild(li);
         

            
        });
    } } catch(err){
        console.log("not running from fetchtasks !! try reloading again");
    }


}
function reload (){
    window.location.href = window.location.href;
    return  window.location.href;
}
 function addtask(){
       const task = document.getElementById('task').value;
       const day = document.getElementById('day').value;
       try {
      fetch(`http://localhost:5000/addtask/${day}`,{
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body : JSON.stringify({task: task})
        
       })
       .then (res => res.json())
       
       .then (data =>{
        console.log(data);

       })
    console.log("clicked send");
    reload();


       } catch(err)
        {console.log(err);
 }
    

}

async function loadtasks(){
    const day = document.getElementById('ShowSingleDayList').value;
    const errordisplay =  document.getElementById('errorday');
    if (day == ""){
        console.log("empty string day");
        errordisplay.innerText= "You havent picked a day ";
        return;
    }
    else {
         errordisplay.innerText= `showing tasks for ${day}`;

    }
    console.log(day);
       
        const raw2 = await fetch(`http://localhost:5000/datatest/${day}`);
     
        const data2 = await raw2.json();
        data2.forEach((item,index)=> {
            
        const  li = document.createElement('li');
        

            console.log(index);
            const key = Object.keys(item);
            const value = Object.values(item);

            
        li.innerHTML = `
        <li> ${key} : ${value}
          <p> Are you done with ${key} yet ??.. </p>   
          <p class="menu" onclick="marktask('done',${index})" > Done </p> 
          <p class="menu" onclick="marktask('Not yet',${index})" > Not yet</p> 
         </li>`;
          daytask.appendChild(li);
           


            
        });
}

async function marktask(status,index){

       const day = document.getElementById('ShowSingleDayList').value;
       try {
      fetch(`http://localhost:5000/marktask/${day}`,{
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body : JSON.stringify({status: status , index: index})
        
       })
    
    console.log(`Status : ${status} \n  Day :  ${day}  \n  Index :  ${index}`);

    reload();
   


       } catch(err)
        {console.log(err);
 }

}

async function deletetask(dayfortask,index){

       try {
      fetch(`http://localhost:5000/deletetask/${dayfortask}`,{
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body : JSON.stringify({ index: index})
        
       })
    
    console.log(`Day :  ${dayfortask}  \n  Index :  ${index}`);
    reload();
  

       } catch(err)
        {console.log(err);
 }

}




fetchtasks();


