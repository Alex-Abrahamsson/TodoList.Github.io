const inputVal = document.getElementsByClassName("inputVal")[0];
const addTaskBtn = document.getElementsByClassName("btn")[0];

addTaskBtn.addEventListener("click", () => 
{
    if (inputVal.value.trim() != 0)
    {
        let localItems = JSON.parse(localStorage.getItem("localItem"))
        if (localItems === null)
        {
            tasklist = [];
        }else
        {
            tasklist = localItems;
        }
        tasklist.push(inputVal.value);
        localStorage.setItem("localItem", JSON.stringify(tasklist))
    }

    ShowList();
})


function ShowList()
{
    let outPut = "";
    let taskListShow = document.querySelector(".todoListItem")
    let localItems = JSON.parse(localStorage.getItem("localItem"))
    if (localItems === null)
    {
        tasklist = [];
    }else
    {
        tasklist = localItems;
    }
    tasklist.forEach((data, index) => 
    {
        outPut += `
        <div class="todoList">
                    <p class="pText">${data}</p>
                    <button class="deleteTask" onClick="deleteItem(${index})">X</button>
                    </div>
        `
    });
    
    taskListShow.innerHTML = outPut;
    
}

ShowList();

function deleteItem(index)
{
    let localItems = JSON.parse(localStorage.getItem("localItem"))
    tasklist.splice(index, 1)
    localStorage.setItem("localItem", JSON.stringify(tasklist))
    ShowList();
}

function ClearTasks()
{
    localStorage.clear();
    ShowList();
}