let items = JSON.parse(localStorage.getItem('items'))
addStoredItems()

// gets items from storage and adds items to list
function addStoredItems () {
    if (items == null) {
        items  = []
    } else {
        let i = 0
        items.forEach(element => {
            addItem(items[i].text, items[i].completed)
            i++
        })
    }
}

// creates an item and adds it to the list
function addItem(itemText, completedStatus) {
    // add item to DOM
    let ol = document.getElementById("list")
    let li = document.createElement("li")
    ol.appendChild(li)
    li.appendChild(document.createTextNode(itemText))

    // add style and trash icon
    if (completedStatus == true) {
        li.style.textDecorationLine = "line-through"
        let i = document.createElement("i")
        li.appendChild(i)
        i.className = "fa fa-trash"

        // add listener to trash icon
        i.addEventListener("click", (e) => {
            let targetText = e.target.parentNode.innerText
            deleteFromStorage(targetText)               
            li.remove()
        }) 
    }

    // Add listeners
    li.addEventListener("click", (e) => {
        if (completedStatus == false) {
            li.style.textDecorationLine = "line-through"
            let i = document.createElement("i")
            li.appendChild(i)
            i.className = "fa fa-trash"

            completedStatus = true
            storeStatus(completedStatus, e.target.innerText)

            // listens to delete item
            i.addEventListener("click", (e) => {
                let targetText = e.target.parentNode.innerText
                deleteFromStorage(targetText)               
                li.remove()
            })
        } else {
            li.style.textDecorationLine = "none"
            li.removeChild(li.firstElementChild)
            completedStatus = false
            storeStatus(completedStatus, e.target.innerText)
        } 
        
    })

    document.getElementById("input").value = ""
}

// stores item text
function storeItem(itemText) {
    let newItem = {
        text: itemText,
        completed: false
    }
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

// deletes item from storage
function deleteFromStorage(targetText) {
    let liArray = []
    let liElements = document.querySelectorAll("#list li")
    for(let i = 0; i < liElements.length; i++){
        liArray.push(liElements[i].innerText)
    }
    indexRemovalStart = liArray.indexOf(targetText)
    items.splice(indexRemovalStart, 1)
    localStorage.setItem("items", JSON.stringify(items))
}

// listener for new input
document.getElementById("input").addEventListener("keypress", (e)=> {
    if (e.keyCode == 13 && document.getElementById("input").value !== "") {
        let itemText = document.getElementById("input").value
        let completedStatus = false
        storeItem(itemText)
        addItem(itemText, completedStatus)
    }
})

// listener clears list and storage
document.getElementById("button").addEventListener("click", ()=> {
    document.getElementById("list").innerHTML = ""
    items = []
    localStorage.clear()
})