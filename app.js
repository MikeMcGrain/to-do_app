//on.load check storage

//if !null parse string and store as storedItems object
//create new listItem for each completeItem and incompleteItem

// console.log(items)
// let items = JSON.parse(localStorage.getItem("items"))

// function updateStorage() {
//     items.incompleteItems = inputElement.value
//     localStorage.setItem("items")
// }
let inputElement = document.getElementById("input")

function addItem() {
    let ol = document.getElementById("list")
    let li = document.createElement("li")
    ol.appendChild(li)
    li.appendChild(document.createTextNode(inputElement.value))
    
    // listens to add/remove "line-through" style and trash icon
    li.addEventListener("click", (e) => {
        if (li.style.textDecorationLine == "" || li.style.textDecorationLine == "none") {
            //add to completedItems, delet from incompleteItems
            li.style.textDecorationLine = "line-through"
            let i = document.createElement("i")
            li.appendChild(i)
            i.className = "fa fa-trash"
                    
            // listens to delete item
            i.addEventListener("click", () => {
                //delete item from storage
                li.remove()
            })
        } else {
            //add to incompleteItems, delete from completedItems
            li.style.textDecorationLine = "none"
            li.removeChild(li.firstElementChild)
        }
    })
            
    // clears input
    inputElement.value = ""
}

// listens to clear list and local storage
document.getElementById("button").addEventListener("click", () => {
    document.getElementById("list").innerHTML = ""
    localStorage.clear()
})

// listens to add new item
inputElement.addEventListener("keypress", (e) => {
    if (e.keyCode == 13 && inputElement.value !== "") {
        //add to incompleteItems
        localStorage.setItem('item', inputElement.value)
        addItem()
    }
})