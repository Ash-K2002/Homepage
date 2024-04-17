const mainContent=document.querySelector('.projects-deck');
async function setJsonData(callback){
try{
    const response = await fetch('./content.json');
    const data = await response.json();
    callback(data);
}
catch(error){
    console.error(error);
}
}

function showData(arr){
for(const item of arr){
    mainContent.appendChild(createCards(item));
}
}

function createCards(item){
    const container = document.createElement('article');
    const iconContainer=document.createElement('section');
    const header=document.createElement('header');
    const icon=document.createElement('img');
    const name = document.createElement('h2');
    const links=document.createElement('nav');
    const description=document.createElement('p');

    iconContainer.appendChild(icon);
    header.appendChild(name);
    header.appendChild(links);

    iconContainer.setAttribute('class','project-icon-container');
    container.setAttribute('class','project-card');
    header.setAttribute('class','project-card-head');
    description.setAttribute('class','project-description');

    for(const linkitem of item["links"]){
        const link=document.createElement('a');
        link.setAttribute('href',linkitem["link"]);
        link.setAttribute('target','_blank');
        if("iconfont" in linkitem){
            link.classList.add(linkitem["class"]);
        }
        else{
            const linkicon=document.createElement('img');
            linkicon.classList.add('project-link-icon');
            linkicon.setAttribute('src',linkitem["icon"]);
            link.appendChild(linkicon);
        }
        links.appendChild(link);
    }

    icon.setAttribute('src',item["icon"]);
    icon.setAttribute('alt',item["name"]+' screenshot');

    name.textContent=item["name"];

    description.textContent=item["description"];

    container.appendChild(iconContainer);
    container.appendChild(header);
    container.appendChild(description);

    return container;
}


setJsonData(showData);