const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

document.addEventListener("DOMContentLoaded", () => {
    load();
  });

function load() {
    fetch("http://192.168.0.8:5000/api/")
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            let links = JSON.parse(json);
            
            links.forEach((link) => {
                
                let name = link.name;
                let url = link.url;
                let id = link.id;
                addElement({name, url, id});

            })
        })
}
// acha o index
function findPosition(idElement) {
    //faz um fech pra ver os links que tem
    fetch("http://192.168.0.8:5000/api/")
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            let links = JSON.parse(json);
            // tenta achar o index(ta dando erro)
            links.findIndex((link) => {
                console.log(link.name);
                if(link.id === idElement) {
                    return link
                }

            })
        })
}

// pega o id do elemento, passa para a função de achar posição(que não está dando certo)
// joga o index nas options e depois no fetch o back end trata disso
function deleteLink(id) {
    let idElement = {id};
    console.log(idElement.id);
    let index = findPosition(idElement.id)
    
    
    const options = {
        method: "DELETE",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(index)
    }

    // fetch("http://192.168.0.8:5000/api/delete", options)
    //     .then(res => {
            
    //         load();
    //     })
}

form.addEventListener("submit", (event) => {

    let { value } = input;
    const [name, url] = value.split(",");
    let id = generateId();
    let newLink = {id, name, url};

    const options = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(newLink)
    }

    fetch("http://192.168.0.8:5000/api/new", options)
        .then(res => {
            
            load();
        })
    
})



function addElement({ name, url, id }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    li.id = id
    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    let id = el.parentNode.id;
    
    if (confirm('Tem certeza que deseja deletar?'))
        // funcao de apagar do back
        deleteLink(id);
        el.parentNode.remove()
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

