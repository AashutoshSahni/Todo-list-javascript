let listOfItems = [];
class Item {
    constructor(id, description){
        this.id = id;
        this.description = description;
    }
}

let validate = (text) => {
    return (text !== "");
}

let clearInputField = () => {
    document.getElementById("item").value = "";
}

let storeItem = (desc) => {
    let ID = 1;
    if(listOfItems.length>0){
        ID = listOfItems[listOfItems.length-1].id + 1;
    }

    item = new Item(ID, desc);
    listOfItems.push(item);

    return item;
}

let addToList = (item) => {
    let itemHTML,newHTML, element = "#container"; 

    

    itemHTML = `<div class = "item_container" id = %id%>
                    <div class = item_description inLine>%desc%</div>
                    
                        <div id = "done_btn">
                            <button class="item__done--btn"><img id = "tick" src = "./assets/img/tick.png"></img></button>
                        </div>
                        <div id = "del_btn">
                            <button class="item__delete--btn"><img id = "cross" src = "./assets/img/cancel.png"></img></button>
                        </div>
                    </div>`

    itemHTML = itemHTML.replace('%id%', item.id);
    newHTML = itemHTML.replace('%desc%', item.description);
    
    document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
}

let addItem = () => {

    let text = document.getElementById("item").value.trim();
    // console.log(text);

    //Validating if text is not empty or not a number
    if(!validate(text)){
        alert("Please enter text");                                                                                      
    }else{
        let item = storeItem(text);
        addToList(item);
    }

    // Clears the input field
    clearInputField();
};

let deleteItemfromStore = (id) => {
    var ids, index; 
            
    ids = listOfItems.map(function(current){
        return current.id;
    });

    index = ids.indexOf(id);

    if(index !== -1){
        data.allItems[type].splice(index, 1);
    }
}

let confirmDelete  = () => {
    let r = confirm("Do you really want to delete this item?");
    return r;
}

let deleteItem = (event) => {

    if(confirmDelete()){
        let itemID = event.parentNode.id;
    
        deleteItemfromStore(itemID);

        let element = document.getElementById(itemID);
        element.parentNode.removeChild(element);
    }
    
}

let updateStatus = (event) => {

    let itemID = event.parentNode.id;
    document.getElementById(itemID).style.backgroundColor = "#72e63d";
}

let eventListeners = () => {
    
    document.getElementById("add_btn").addEventListener("click",addItem);
    document.getElementById("container").addEventListener("click",function(e){
        let eventParent = e.target.parentNode.parentNode;
        if(eventParent.id == "del_btn"){
            deleteItem(eventParent);
        } else if (eventParent.id == "done_btn"){
            updateStatus(eventParent);
        } 
    });

}

eventListeners();

