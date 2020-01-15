let items = JSON.parse(localStorage.getItem('items'))
window.addEventListener("load", addStoredItems)

// listens for new input
document.getElementById("input").addEventListener("keypress", (e)=> {
    if (e.keyCode == 13 && document.getElementById("input").value !== "") {
        const itemText = document.getElementById("input").value 
        const newItem = {
            text: itemText,
            completed: false
        }
        items.push(newItem)
        localStorage.setItem("items", JSON.stringify(items))
        addItem(newItem.text, newItem.completed)
    }
})

// listener clears list and storage
document.getElementById("button").addEventListener("click", ()=> {
    document.getElementById("input").value = ""
    document.getElementById("list").innerHTML = ""
    items = []
    localStorage.clear()
})

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
    const ol = document.getElementById("list")
    const li = document.createElement("li")
    ol.appendChild(li)
    li.appendChild(document.createTextNode(itemText))

    // add style and trash icon
    if (completedStatus == true) {
        li.style.textDecorationLine = "line-through"
        const i = document.createElement("i")
        li.appendChild(i)
        i.className = "fa fa-trash"

        // add listener to trash icon
        i.addEventListener("click", (e) => {
            const targetText = e.target.parentNode.innerText
            deleteFromStorage(targetText)               
            li.remove()
        }) 
    }

    // Add listeners
    li.addEventListener("click", (e) => {
        if (completedStatus == false) {
            li.style.textDecorationLine = "line-through"
            const i = document.createElement("i")
            li.appendChild(i)
            i.className = "fa fa-trash"
            storeStatus(e.target.innerText, completedStatus=true)

            // listens to delete item
            i.addEventListener("click", (e) => {
                const targetText = e.target.parentNode.innerText
                deleteFromStorage(targetText)               
                li.remove()
            })
        } else {
            li.style.textDecorationLine = "none"
            li.removeChild(li.firstElementChild)
            storeStatus(e.target.innerText, completedStatus=false)
        } 
    })
    document.getElementById("input").value = ""
}

// stores item status
function storeStatus(targetText, completedStatus) {
    let liArray = []
    const liElements = document.querySelectorAll("#list li")
    for(let i = 0; i < liElements.length; i++){
        liArray.push(liElements[i].innerText)
    }
    items[liArray.indexOf(targetText)].completed = completedStatus
    localStorage.setItem("items", JSON.stringify(items))
}

// deletes item from storage
function deleteFromStorage(targetText) {
    let liArray = []
    const liElements = document.querySelectorAll("#list li")
    for(let i = 0; i < liElements.length; i++){
        liArray.push(liElements[i].innerText)
    }
    indexRemovalStart = liArray.indexOf(targetText)
    items.splice(indexRemovalStart, 1)
    localStorage.setItem("items", JSON.stringify(items))
}