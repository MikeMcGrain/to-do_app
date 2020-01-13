// add new list item
let inputElement = document.getElementById("input")
inputElement.addEventListener("keypress", (e) => {
    if (e.keyCode == 13 && inputElement.value !== "") {
        let ol = document.getElementById("list")
        let li = document.createElement("li")
        ol.appendChild(li)
        li.appendChild(document.createTextNode(inputElement.value))
        li.addEventListener("click", (e) => {
            if (li.style.textDecorationLine == "" || li.style.textDecorationLine == "none") {
                li.style.textDecorationLine = "line-through"
                let i = document.createElement("i")
                li.appendChild(i)
                i.className = "fa fa-trash"
                i.addEventListener("click", () => {
                    li.remove()
                })
            } else {
                li.style.textDecorationLine = "none"
                li.removeChild(li.firstElementChild)
            }
        })
        input.value = ""
    }
})

// clear list
document.getElementById("button").addEventListener("click", () => {
    document.getElementById("list").innerHTML = ""
})