let addButton = document.getElementById('add');
let newSearch = document.getElementById('search');
let inputTask = document.getElementById('new-task');
let unfinishedTasks = document.getElementById('unfinished-tasks');
let finishedTasks = document.getElementById('finished-tasks');
function enterMouse(e) {
    const edits = e.target.getElementsByClassName('edit');
    for(let edit of edits)
        edit.style.visibility = 'visible';
    const dels = e.target.getElementsByClassName('delete');
    for(let del of dels)
        del.style.visibility = 'visible';
}
function leaveMouse(e) {
    const edits = e.target.getElementsByClassName('edit');
    for(let edit of edits)
        edit.style.visibility = 'hidden';
    const dels = e.target.getElementsByClassName('delete');
    for(let del of dels)
        del.style.visibility = 'hidden';
}
function createNewElement({task, time, endTime = undefined}, finished) {
    let listItem = document.createElement('li');
    let checkbox = document.createElement('button');
    listItem.onmouseenter = enterMouse;
    listItem.onmouseleave = leaveMouse;
    let endDate = document.createElement('label');
    endDate.classList.add('endDate');
    if(finished) {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons checked'>checked</i>";
        endDate.innerText = endTime;
    }
    else {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
    }
    checkbox.checked = finished;
    let label = document.createElement('label');
    label.innerText = task;
    let input = document.createElement('input');
    input.type = "text";
    let date = document.createElement('label');
    const div = document.createElement('div');
    div.classList.add('date');
    div.append(date);
    div.append(endDate);
    date.innerText = time;
    let deleteButton = document.createElement('button');
    deleteButton.className = "material-icons delete";
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.append(div);
    listItem.ondblclick = ev => editTask(listItem);
    return listItem;
}
function addTask() {
    if (inputTask.value) {
        const time = new Date();
        let listItem = createNewElement({task: inputTask.value, time:
                `${time.getHours()}:${time.getMinutes()}`}, false);
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask);
        inputTask.value = "";
    }
    save();
}
addButton.onclick = addTask;
function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}
function editTask(listItem) {
    console.log(2);
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type=text]');
    let containsClass = listItem.classList.contains('editMode');
    if (containsClass) {
        label.innerText = input.value;
        save();
    }
    else {
        const val = label.innerText;
        input.value = label.innerText;
        input.onkeydown = event => {
            if(event.key === 'Enter')
                editTask(listItem);
            else if(event.key === 'Escape')
            {
                input.value = val;
                editTask(listItem);
            }
        };
    }
    listItem.classList.toggle('editMode');
}
function finishTask() {
    const time = new Date();
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons checked'>checked</i>";

    listItem.getElementsByClassName('endDate')[0].innerText = `${time.getHours()}:${time.getMinutes()}`;
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}
function unfinishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
    listItem.getElementsByClassName('endDate')[0].innerText = '';
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    save();
}
function bindTaskEvents(listItem, checkboxEvent) {
    let checkbox = listItem.querySelector('button.checkbox');
    let deleteButton = listItem.querySelector('button.delete');
    checkbox.onclick = checkboxEvent;
    deleteButton.onclick = deleteTask;
}
function save() {
    let unfinishedTasksArr = [];
    for (let i = 0; i < unfinishedTasks.children.length; i++) {
        unfinishedTasksArr.push({task: unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText,
        time: unfinishedTasks.children[i].getElementsByTagName('label')[1].innerText});
    }
    let finishedTasksArr = [];
    for (let i = 0; i < finishedTasks.children.length; i++) {
        finishedTasksArr.push({task: finishedTasks.children[i].getElementsByTagName('label')[0].innerText,
            time: finishedTasks.children[i].getElementsByTagName('label')[1].innerText,
            endTime: finishedTasks.children[i].getElementsByClassName('endDate')[0].innerText
        });
    }
    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        unfinishedTasks: unfinishedTasksArr,
        finishedTasks: finishedTasksArr
    }));

}
function load() {
    const todo = JSON.parse(localStorage.getItem('todo'));
    return todo ? todo : {unfinishedTasks:[], finishedTasks:[]};
}
function loadData() {
    let data = load();
    unfinishedTasks.innerHTML = '';
    finishedTasks.innerHTML = '';
    for (let i = 0; i < data.unfinishedTasks.length; i++) {
        let listItem = createNewElement(data.unfinishedTasks[i] , false);
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem , finishTask);
    }
    for (let i = 0; i < data.finishedTasks.length; i++) {
        let listItem = createNewElement(data.finishedTasks[i] , true);
        finishedTasks.appendChild(listItem);
        bindTaskEvents(listItem , unfinishTask);
    }
}
loadData();
function search(str) {
    const text = str.trim().toLowerCase();
    const children = [...sectionItems.children];

    children.forEach(element => {
        const textElement = element.children[1].innerText.toLowerCase();
        if (textElement.includes(text) || text === '')
            element.style.display = '';
        else loadData();
    })
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
function searchIndex(element) {
    return Array.from(element.parentNode.children).indexOf(element)
}

function showHTMLForItem(items) {
    return items.forEach(el => addTemplateForItem(el))
}
function check_words(){
    if (event.keyCode==60 || event.keyCode==62){event.returnValue = false}

}
function search() {
    const ids = ['finished-tasks', 'unfinished-tasks'];
    let words = searchLine.value;
    words = words.replace("<","");  // убиваем в словах поиска нежелательные символы
    words = words.replace(">","");
    if(words)
        for (let id of ids) {
            const text = document.getElementById(id).innerHTML;
            const result = text.replace(words,"<b>"+ '<span style="color:red">'    +words+ '</span>'+      "</b>");
            document.getElementById(id).innerHTML = result;
        }
    else
        loadData();

}
function clearFinished() {
    const data = JSON.parse(localStorage.getItem('todo'));
    data.finishedTasks = [];
    localStorage.setItem('todo', JSON.stringify(data));
    loadData();
}
function clearUnfinished() {
    const data = JSON.parse(localStorage.getItem('todo'));
    data.unfinishedTasks = [];
    localStorage.setItem('todo', JSON.stringify(data));
    loadData();
}
function getComparer(type) {
    switch (type) {
        case 'Date creation (asc)':
            return (a, b) => a.time > b.time ? 1 : -1;
        case 'Date creation (desc)':
            return (a, b) => a.time < b.time ? 1 : -1;
        case 'Text (asc)':
            return (a, b) => a.task > b.task ? 1 : -1;
        case 'Text (desc)':
            return (a, b) => a.task < b.task ? 1 : -1;
    }
}
function sort(arr, type) {
    const todo = JSON.parse(localStorage.getItem('todo'));
    todo[arr].sort(getComparer(type))
    localStorage.setItem('todo', JSON.stringify(todo));
    loadData();
}

function sortOpen(event) {
    sort('unfinishedTasks', event.target.value)
}

function sortDone(event) {
    sort('finishedTasks', event.target.value)
}



