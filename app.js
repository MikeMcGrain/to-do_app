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
            i.addEventListener("click", () => {
                li.remove()
            })

            completedStatus = true
        } else {
            li.style.textDecorationLine = "none"
            li.removeChild(li.firstElementChild)
            completedStatus = false
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
    console.log(newItem)

    localStorage.setItem("items", JSON.stringify(items))
}

// stores item status
function storeStatus(completedStatus) {
    // let liElements = document.querySelectorAll("#list li")
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