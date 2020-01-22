let items = JSON.parse(localStorage.getItem('items'))
window.addEventListener("load", addStoredItems)

// listens for new input
document.getElementById("input").addEventListener("keypress", (e) => {
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
document.getElementById("button").addEventListener("click", () => {
    document.getElementById("input").value = ""
    document.getElementById("list").innerHTML = ""
    items = []
    localStorage.clear()
})

// gets items from storage
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

// adds item to the list
function addItem(itemText, completedStatus) {
    // add li and text to DOM
    const ol = document.getElementById("list")
    const li = document.createElement("li")
    ol.appendChild(li)
    li.appendChild(document.createTextNode(itemText))

    // add style and trash to completed items
    if (completedStatus == true) {
        // style li
        li.style.textDecorationLine = "line-through"

        // add trash icon
        const i = document.createElement("i")
        li.appendChild(i)
        i.className = "fa fa-trash"

        // add click listener to trash icon
        i.addEventListener("click", (e) => {
            e.stopPropagation()
            const targetText = e.target.parentNode.innerText
            deleteFromStorage(targetText)               
            li.remove()
        }) 
    }

    // add click listener to li
    li.addEventListener("click", (e) => {
        if (completedStatus == true) {
            // remove style
            li.style.textDecorationLine = "none"
            // remove icon
            li.removeChild(li.firstElementChild)
            // change and store status
            storeStatus(e.target.innerText, completedStatus=false)
        } else {
            // style li
            li.style.textDecorationLine = "line-through"
            // add trash icon
            const i = document.createElement("i")
            li.appendChild(i)
            i.className = "fa fa-trash"
            // add click listener to trash icon
            i.addEventListener("click", (e) => {
                e.stopPropagation()
                const targetText = e.target.parentNode.innerText
                deleteFromStorage(targetText)               
                li.remove()
             })
             // change and store status
             storeStatus(e.target.innerText, completedStatus=true)
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
    let items = JSON.parse(localStorage.getItem('items'))
    items = items.filter(function(item) {
        return item.text !== targetText
    })
    localStorage.setItem("items", JSON.stringify(items))
}