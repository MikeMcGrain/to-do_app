let items = []

// creates an item and adds it to the list
function addItem(itemText) {
    let completedStatus = false

    let ol = document.getElementById("list")
    let li = document.createElement("li")
    ol.appendChild(li)
    li.appendChild(document.createTextNode(itemText))

    // listens to add/remove "line-through" style and trash icon
    li.addEventListener("click", (e) => {
        if (completedStatus == false) {
            li.style.textDecorationLine = "line-through"
            let i = document.createElement("i")
            li.appendChild(i)
            i.className = "fa fa-trash"

            // listens to delete item
            i.addEventListener("click", (e) => {                
                let liArray = []
                let targetText = e.target.parentNode.innerText
                let liElements = document.querySelectorAll("#list li")
                for(let i = 0; i < liElements.length; i++){
                    liArray.push(liElements[i].innerText)
                }
                
                indexRemovalStart = liArray.indexOf(targetText)
                console.log(targetText)
                console.log(indexRemovalStart)
                items.splice(indexRemovalStart, 1)
                localStorage.setItem("items", JSON.stringify(items))
                li.remove()
            })

            completedStatus = true
            storeStatus(completedStatus, e.target.innerText)
        } else {
            li.style.textDecorationLine = "none"
            li.removeChild(li.firstElementChild)

            completedStatus = false
            storeStatus(completedStatus, e.target.innerText)
        }
    }) 

    inputElement.value = ""
}

// stores item text
function storeItem(itemText) {
    let newItem = {}
    newItem.text = itemText
    newItem.completed = false
    items.push(newItem)
    localStorage.setItem("items", JSON.stringify(items))
}

// stores item status
function storeStatus(completedStatus, targetText) {
    let liArray = []
    let liElements = document.querySelectorAll("#list li")
    for(let i = 0; i < liElements.length; i++){
        liArray.push(liElements[i].innerText)
    }
        items[liArray.indexOf(targetText)].completed = completedStatus
        localStorage.setItem("items", JSON.stringify(items))
}

// listens to call newItem() and storeItem()
let inputElement = document.getElementById("input")
inputElement.addEventListener("keypress", (e)=> {
    if (e.keyCode == 13 && inputElement.value !== "") {
        let itemText = inputElement.value
        storeItem(itemText)
        addItem(itemText)
    }
})

// listens to clear list and local storage
document.getElementById("button").addEventListener("click", ()=> {
    document.getElementById("list").innerHTML = ""
    items = []
    localStorage.clear()
})