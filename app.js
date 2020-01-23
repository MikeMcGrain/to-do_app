window.addEventListener("load", function() {
  let items = JSON.parse(localStorage.getItem("items")) || []
  items.forEach(item => {
    renderItem(item)
  })
})

document.getElementById("input").addEventListener("keypress", function(e) {
  if (e.keyCode == 13 && e.target.value !== "") {
    let item = {
      text: e.target.value,
      completed: false
    }
    let items = JSON.parse(localStorage.getItem("items")) || []
    items.push(item)
    localStorage.setItem("items", JSON.stringify(items))
    renderItem(item)
  }
})

function renderItem(item) {
  // add li and text to DOM
  const ol = document.getElementById("list")
  const li = createLiElement(item)
  ol.appendChild(li)
  document.getElementById("input").value = ""
}

function createLiElement(item) {
  const li = document.createElement("li")
  li.appendChild(document.createTextNode(item.text))

  // add style and trash to completed items
  if (item.completed == true) {
    li.style.textDecorationLine = "line-through"
    const i = createDeleteIcon(li)
    li.appendChild(i)
    i.addEventListener("click", e => {
      e.stopPropagation()
      const targetText = e.target.parentNode.innerText
      deleteFromStorage(targetText)
      li.remove()
    })
  }

  // add click listener to li
  li.addEventListener("click", e => {
    if (item.completed == true) {
      li.style.textDecorationLine = "none"
      li.removeChild(li.firstElementChild)
      item.completed = false
      updateStatus(item)
    } else {
      li.style.textDecorationLine = "line-through"
      const i = createDeleteIcon(li)
      li.appendChild(i)
      // change and store status
      item.completed = true
      updateStatus(item)
    }
  })
  return li
}

function createDeleteIcon(li) {
  const i = document.createElement("i")
  i.className = "fa fa-trash"
  i.addEventListener("click", e => {
    e.stopPropagation()
    const targetText = e.target.parentNode.innerText
    deleteFromStorage(targetText)
    li.remove()
  })
  return i
}

function updateStatus(item) {
  let itemsCopy = JSON.parse(localStorage.getItem("items"))
  itemsCopy.forEach(function(itemCopy) {
    if (itemCopy.text == item.text) {
      itemCopy.completed = item.completed
    }
  })
  localStorage.setItem("items", JSON.stringify(itemsCopy))
}

function deleteFromStorage(targetText) {
  let items = JSON.parse(localStorage.getItem("items"))
  items = items.filter(function(item) {
    return item.text !== targetText
  })
  localStorage.setItem("items", JSON.stringify(items))
}

document.getElementById("button").addEventListener("click", function() {
  document.getElementById("input").value = ""
  document.getElementById("list").innerHTML = ""
  localStorage.setItem("items", JSON.stringify([]))
})
