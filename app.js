function addNewItem() {
    let newItem = document.getElementById("input").value
    let li = document.createElement("li")
    let ul = document.getElementById("list")
    li.appendChild(document.createTextNode(newItem))
    ul.appendChild(li)
}