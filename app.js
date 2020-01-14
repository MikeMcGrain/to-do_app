let inputElement = document.getElementById("input")

function addItem() {
    let ol = document.getElementById("list")
    let li = document.createElement("li")
    ol.appendChild(li)
    li.appendChild(document.createTextNode(inputElement.value))
    
    // listens to add/remove "line-through" style and trash icon
    li.addEventListener("click", (e) => {
        if (li.style.textDecorationLine == "" || li.style.textDecorationLine == "none") {
            li.style.textDecorationLine = "line-through"
            let i = document.createElement("i")
            li.appendChild(i)
            i.className = "fa fa-trash"
                    
            // event listeneer to delete
            i.addEventListener("click", () => {
                li.remove()
            })
        } else {
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
})

// listens to add new item
inputElement.addEventListener("keypress", (e) => {
    if (e.keyCode == 13 && inputElement.value !== "") {
        addItem()
    }
})