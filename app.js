let items =[]

// adds an item to the list
function addItem(itemText) {
    let ol = document.getElementById("list")
    let li = document.createElement("li")
    ol.appendChild(li)
    li.appendChild(document.createTextNode(itemText))
    
    // listens to add/remove "line-through" style and trash icon
    li.addEventListener("click", (e) => {
        if (li.style.textDecorationLine == "" || li.style.textDecorationLine == "none") {
            li.style.textDecorationLine = "line-through"
            let i = document.createElement("i")
            li.appendChild(i)
            i.className = "fa fa-trash"

            // listens to delete item
            i.addEventListener("click", () => {
                li.remove()
            })

            let completedStatus = true
            storeStatus(completedStatus)
        } else {
            li.style.textDecorationLine = "none"
            li.removeChild(li.firstElementChild)

            let completedStatus = false
            storeStatus(completedStatus)
        }
    })            
    document.getElementById("input").value = ""
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
function storeStatus(completedStatus) {
    items.completed = completedStatus
    localStorage.setItem("items", JSON.stringify(items))
}

// listens to add new item
document.getElementById("input").addEventListener("keypress", (e) => {
    if (e.keyCode == 13 && document.getElementById("input").value !== "") {
        let itemText = document.getElementById("input").value
        storeItem(itemText)
        addItem(itemText)
    }
})

// listens to clear list and local storage
document.getElementById("button").addEventListener("click", () => {
    document.getElementById("list").innerHTML = ""
    items = []
    localStorage.clear()
})