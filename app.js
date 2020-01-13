let inputElement = document.getElementById("input")

// add new item to list
inputElement.addEventListener("keypress", (e) => {
    if (e.keyCode == 13 && inputElement.value !== "") {
        // create item element and append to list element
        let ol = document.getElementById("list")
        let li = document.createElement("li")
        ol.appendChild(li)

        // create text node and append to item element
        li.appendChild(document.createTextNode(inputElement.value))

        // add/remove "line-through" style when clicked
        li.addEventListener("click", (e) => {
            if (li.style.textDecorationLine == "" || li.style.textDecorationLine == "none") {
                li.style.textDecorationLine = "line-through"
                let i = document.createElement("i")
                li.appendChild(i)
                i.className = "fa fa-trash"
                
                // delete item when clicked
                i.addEventListener("click", () => {
                    li.remove()
                })
            } else {
                // remove "line-through" style, remove trash icon
                li.style.textDecorationLine = "none"
                li.removeChild(li.firstElementChild)
            }
        })
        // clear input
        input.value = ""
    }
})

// clear list
document.getElementById("button").addEventListener("click", () => {
    document.getElementById("list").innerHTML = ""
})