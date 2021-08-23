const inputVal = document.getElementsByClassName("inputVal")[0];
const addTaskBtn = document.getElementsByClassName("btn")[0];


//Funktion för att ta bort 1 "Att göra rad" i taget.
function deleteItem(index)
{
    let localItems = JSON.parse(localStorage.getItem("localItem"))
    tasklist.splice(index, 1)
    localStorage.setItem("localItem", JSON.stringify(tasklist))
    ShowList();
}

//Funktion för att rensa hela lista.
function ClearTasks()
{
    localStorage.clear();
    ShowList();
    inputVal.value = "";
}


//Denna funktion tar hand om "Add task" knappen.
addTaskBtn.addEventListener("click", () => 
{
    if (inputVal.value.trim() != 0) //Kollar så det är Minst 1 bokstav i textrutan eftersom de är onödigt att lägga till tomma Tasks
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
        inputVal.value = "";
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
        outPut += 
       `<div class="todoList">
            <p class="pText">${data}</p>
            <button class="deleteTask" onClick="deleteItem(${index})">X</button>
        </div>`
    });
    
    taskListShow.innerHTML = outPut;
    
}

ShowList();






const cookieStorage = {
    getItem: (item) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[item];
    },
    setItem: (item, value) => {
        document.cookie = `${item}=${value};`
    }
}

const storageType = cookieStorage;
const consentPropertyName = 'jdc_consent';
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {

    const acceptFn = event => {
        saveToStorage(storageType);
        consentPopup.classList.add('hidden');
    }
    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');
    acceptBtn.addEventListener('click', acceptFn);

    if (shouldShowPopup(storageType)) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 2000);
    }

};