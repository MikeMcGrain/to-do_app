window.addEventListener("load", function() {
  let items = JSON.parse(localStorage.getItem("items")) || []
  items.forEach(item => {
    renderItem(item)
  })
})

document.getElementById("input").addEventListener("keypress", function(e) {
  if (e.keyCode == 13 && e.target.value !== "") {
    let newItem = {
      text: e.target.value,
      completed: false
    }
    let items = JSON.parse(localStorage.getItem("items")) || []
    items.push(newItem)
    localStorage.setItem("items", JSON.stringify(items))
    renderItem(newItem)
  }
})

document.getElementById("clear-button").addEventListener("click", function() {
  document.getElementById("input").value = ""
  document.getElementById("list").innerHTML = ""
  localStorage.setItem("items", JSON.stringify([]))
})

function renderItem(item) {
  const ol = document.getElementById("list")
  const li = createLiElement(item)
  ol.appendChild(li)
  document.getElementById("input").value = ""
}

function createLiElement(item) {
  const li = document.createElement("li")
  li.appendChild(document.createTextNode(item.text))
  if (item.completed) {
    li.style.textDecorationLine = "line-through"
    const i = createDeleteIcon(li, item)
    li.appendChild(i)
  }

  li.addEventListener("click", function(e) {
    if (item.completed) {
      li.style.textDecorationLine = "none"
      li.removeChild(li.firstElementChild)
      item.completed = false
      updateStatus(item)
    } else {
      li.style.textDecorationLine = "line-through"
      const i = createDeleteIcon(li, item)
      li.appendChild(i)
      item.completed = true
      updateStatus(item)
    }
  })
  return li
}

function createDeleteIcon(li, item) {
  const i = document.createElement("i")
  i.className = "fa fa-trash"
  i.addEventListener("click", function(e) {
    e.stopPropagation()
    deleteFromStorage(item)
    li.remove()
  })
  return i
}

function updateStatus(itemToUpdate) {
  let items = JSON.parse(localStorage.getItem("items"))
  items.forEach(function(item) {
    if (item.text == itemToUpdate.text) {
      item.completed = itemToUpdate.completed
    }
  })
  localStorage.setItem("items", JSON.stringify(items))
}

function deleteFromStorage(itemToDelete) {
  let items = JSON.parse(localStorage.getItem("items"))
  items = items.filter(function(item) {
    return item.text !== itemToDelete.text
  })
  localStorage.setItem("items", JSON.stringify(items))
}