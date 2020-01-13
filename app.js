// add new list item
document.getElementById("input").addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        let ol = document.getElementById("list")
        let li = document.createElement("li")
        ol.appendChild(li)

        let newItem = document.getElementById("input").value
        li.appendChild(document.createTextNode(newItem))

        li.addEventListener("click", function() {
            li.style.textDecorationLine = (li.style.textDecorationLine == "" || li.style.textDecorationLine == "none") ? "line-through":"none"
        })
        input.value = ""
    }
})

// clear list
document.getElementById("button").addEventListener("click", () => {
    document.getElementById("list").innerHTML = ""
})