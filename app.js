document.getElementById("input").addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        let ul = document.getElementById("list")
        let li = document.createElement("li")
        ul.appendChild(li)

        let newItem = document.getElementById('input').value
        li.appendChild(document.createTextNode(newItem))

        li.addEventListener("click", function() {
            if (li.style.textDecorationLine) {
                li.style.textDecorationLine = "none"
            }
            else {
                li.style.textDecorationLine = "line-through"
            }
        }) 

        document.getElementById('input').value = ""
    }
})
