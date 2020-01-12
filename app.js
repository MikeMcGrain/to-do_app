document.getElementById("input").addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        let ul = document.getElementById("list")
        let li = document.createElement("li")
        ul.appendChild(li)

        let newItem = document.getElementById('input').value
        li.appendChild(document.createTextNode(newItem))

        document.getElementById('input').value = ""
    }
})