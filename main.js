///////////////// call vars
let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let tmp;
let mode="create";
let searchmode="title";
let light=document.getElementById("light");
let inputs=document.querySelectorAll(".inputs");
console.log(inputs);


    ///////////////// count total
 function gettotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor="#040";
    }else{
       total.innerHTML=" ";
       total.style.backgroundColor="#a00d02";

    }
}




///////////////// save data in localStorage 
let datapro;
if(localStorage.product !=null){
   datapro=JSON.parse(localStorage.product)
}else{
   datapro=[];
}

submit.onclick = function(){
    let newpro={
       title:title.value.toLowerCase(),
       price:price.value,
       taxes:taxes.value,
       ads:ads.value,
       discount:discount.value,
       total:total.innerHTML,
       count:count.value,
       category:category.value.toLowerCase(),
      
    }
    if(title.value!=""
       && price.value!=""
       && category.value!=""
       && count.value <1000){
       if(mode === "create"){
           if(newpro.count > 0){
               for(let i = 0 ; i <= newpro.count;i++){
                  datapro.push(newpro);
               
                }
           }else{
               datapro.push(newpro);
           }
        }else{
            datapro[tmp]=newpro;
            mode="create";
            submit.innerHTML="create";
            count.style.display="block";
        }

    }else{
       alert("please insert data");
   }
  
    localStorage.setItem('product', JSON.stringify(datapro))
    console.log(datapro);

    cleardata()
    showdata()
}

///////////////// clear data
function cleardata(){ 
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
    total.style.backgroundColor="#a00d02";
}





///////////////// read data

function showdata(){
    let table ="";
    for(let i =1; i < datapro.length ; i++ ){
       table +=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})" id="update">update</button></td> 
        <td><button onclick= "deletedata(${i})" id="delete">delete</button></td> 
    </tr>
        `
       
    };
     
    document.getElementById("tbody").innerHTML=table;
     if(datapro.length >0){
       document.getElementById("deleteall").style.display="block";
        document.getElementById("deleteall").innerHTML=`<button  >delete all  (${datapro.length-1})</button>`;
    }else{
       document.getElementById("deleteall").style.display="none";
    }

};
showdata();


 ///////////////// delete data

 function deletedata(i){
   datapro.splice(i,1);
   localStorage.product=JSON.stringify(datapro);
   showdata();
 }




///////////////// delete all

function deleteall(i){
   datapro.splice(i,datapro.length);
   localStorage.product=JSON.stringify(datapro);
   showdata();
 }


 ///////////////// update data

function updatedata(i){
   title.value=datapro[i].title;
   price.value=datapro[i].price;
   taxes.value=datapro[i].taxes;
   ads.value=datapro[i].ads;
   discount.value=datapro[i].discount;
   gettotal();
   count.style.display="none";
   category.value=datapro[i].category;
   submit.innerHTML="update";
   mode="update";
   tmp=i;
   scroll({
       top:0,
       behavior:"smooth",
   })
}


 ///////////////// search

function getsearchmode(id){
   let search=document.getElementById("search");
   if(id == "searchtitle"){
   searchmode = "title"; 

  }else{
   searchmode="category";
  }
  search.Placeholder = 'search by'+ searchmode;
   search.focus();
   search.value="";
   showdata();
}



function searchdata(value){
let table=" ";
if(searchmode == "title"){


for(let i=0; i<datapro.length; i++){
   if(datapro[i].title.includes(value.toLowerCase())){
       table +=`
       <tr>
       <td>${i}</td>
       <td>${datapro[i].title}</td>
       <td>${datapro[i].price}</td>
       <td>${datapro[i].taxes}</td>
       <td>${datapro[i].ads}</td>
       <td>${datapro[i].discount}</td>
       <td>${datapro[i].total}</td>
       <td>${datapro[i].category}</td>
       <td><button onclick="updatedata(${i})" id="update">update</button></td> 
       <td><button onclick= "deletedata(${i})" id="delete">delete</button></td> 
   </tr>
       `;
    }
}
}else{

   for(let i=0; i<datapro.length; i++){
       if(datapro[i].category.includes(value.toLowerCase())){
           table +=`
           <tr>
           <td>${i}</td>
           <td>${datapro[i].title}</td>
           <td>${datapro[i].price}</td>
           <td>${datapro[i].taxes}</td>
           <td>${datapro[i].ads}</td>
           <td>${datapro[i].discount}</td>
           <td>${datapro[i].total}</td>
           <td>${datapro[i].category}</td>
           <td><button onclick="updatedata(${i})" id="update">update</button></td> 
           <td><button onclick= "deletedata(${i})" id="delete">delete</button></td> 
       </tr>
           `;
        }
   }


}
document.getElementById("tbody").innerHTML=table;

}
function lightmood(){
    document.body.classList.toggle('light')
     document.body.style.transition="all 2s";
if(light.innerHTML==="light"){
    light.innerHTML="dark";
  }else{
    light.innerHTML="light";
 
 }
}
