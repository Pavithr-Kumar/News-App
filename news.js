const API_KEY="208dd7d949494c148ce3cec5fb5ce4e2";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchnews("indian government"));
async function fetchnews(query){

    const response=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await response.json();  
    bindData(data.articles);
   
}

 function bindData(articles){
    console.log(articles);
    const container=document.getElementById('container');
   
    const templateCard=document.getElementById('template-card');
   
    container.innerHTML="";
    for(let i=0;i<articles.length;i++)  {
        if(articles[i].urlToImage==null) {
            continue;
        }
        
        
        const cardclone=templateCard.content.cloneNode(true);
       
        fillCardData(cardclone,articles[i]);
        container.appendChild(cardclone);
    
        
        
    }
}

 function fillCardData(cardclone,article){
    
    const newsImg=cardclone.getElementById('news-img');
    const newsTitle=cardclone.getElementById('title');
    const newsSource=cardclone.getElementById('source');
    const newsDesc=cardclone.getElementById('news-desc');
    

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
   
    
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} ▫️ ${date}`;

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"blank_")
    })
}

let curSelNav=null;
function onClickNav(id){
    fetchnews(id);
    const navItem=document.getElementById(id);
    curSelNav?.classList.remove('active');
    curSelNav=navItem;
    curSelNav.classList.add('active');

}
let search=document.getElementById('search');
let searchBtn=document.getElementById('sea');
searchBtn.addEventListener('click',()=>{
    fetchnews(search.value);
    search.value='';
})
search.addEventListener('keypress',(e)=>{
if(e.key=='Enter'){
    fetchnews(search.value);
    search.value='';
}
})
