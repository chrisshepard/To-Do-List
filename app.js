var todoList = {
    items: [],
    addItem: function (itemText) {
        if (itemText !== "") {
            this.items.push({
                itemText: itemText,
                completed: false
            })
        } else {

        };
    },
    editItem: function (position, itemText) {
        this.items[position].itemText = itemText;

    },
    deleteItem: function (position) {
        this.items.splice(position, 1);
    },
    toggleCompleted: function (position) {
        var todo = this.items[position];
        todo.completed = !todo.completed;

    },
    toggleAll: function () {
        var totalItems = this.items.length;
        var completedItems = 0;

        this.items.forEach(function (item) {
            if (item.completed === true) {
                completedItems++;
            }
        });

        this.items.forEach(function (item) {
            if (completedItems === totalItems) {
                item.completed = false;
            } else {
                item.completed = true;
            }
        });
    }
};





var clickHandler = {
    addItem: function () {
        var addItemInput = document.getElementById("addItemInput");
        todoList.addItem(addItemInput.value);
        addItemInput.value = "";
        view.displayItems();
    },
    editItem: function (position) {
        var editItemInput = document.getElementById("editItemInput");
        todoList.editItem(position, editItemInput.value);
        editItemInput.value = "";
        view.displayItems();
    },
    deleteItem: function (position) {
        todoList.deleteItem(position);
        view.displayItems();
    },
    toggleCompleted: function (position) {
        todoList.toggleCompleted(position);
        view.displayItems();
    },
    toggleAll: function () {

        todoList.toggleAll();
        view.displayItems();
    },
    cancelEdit: function () {
        var promptEdit = document.getElementById("edit");
        promptEdit.innerHTML = "";
    }
};

var view = {
    displayItems: function () {
        var itemUL = document.querySelector('ul');
        itemUL.innerHTML = '';
        todoList.items.forEach(function (item, position) {
            var itemLi = document.createElement("li");
            
            itemLi.id = position;
            var text = document.createElement("p");
            text.className="text";
            text.textContent = item.itemText;
            if (todoList.items[position].completed === true) {
                itemLi.className = "item-style li-complete";
            } else {
                itemLi.className = "item-style";
            };
            itemLi.appendChild(text);
            itemLi.appendChild(view.createDelete());
            itemLi.appendChild(view.createEdit());
            itemLi.appendChild(view.createToggle(position));
            itemUL.appendChild(itemLi);
        },this);
    },
    createDelete: function () {
        var deleteButton = document.createElement("a");
        deleteButton.className = "deleteButton";
        var deleteIcon = document.createElement("img");
        deleteIcon.src = "Icons/delete-light-red.png";
        deleteIcon.className = "icon deleteButton";
        deleteButton.appendChild(deleteIcon);

        return deleteButton;
    },
    createEdit: function () {
        var editButton = document.createElement("a");
        editButton.className = "editPrompt";
        var editIcon = document.createElement("img");
        editIcon.src = "Icons/edit.png";
        editIcon.className = "icon editPrompt";
        editButton.appendChild(editIcon);
        
        return editButton;
    },
    promptEdit: function () {
        var editField = document.createElement("div");
        editField.id = "editPrompt";
        var promptEdit = document.createElement("input");
        promptEdit.type = "text";
        promptEdit.id = "editItemInput";
        var editButton = document.createElement("button");
        editButton.textContent = "Submit Change";
        editButton.className = "editButton";
        
        
        var cancelIcon = document.createElement("img");
        cancelIcon.src = "Icons/cancel.png";
        cancelIcon.className= "icon cancelButton";
        
        var itemLocation = document.getElementById("edit");
        editField.appendChild(promptEdit);
        editField.appendChild(editButton);
        editField.appendChild(cancelIcon);
        itemLocation.appendChild(editField);
        view.displayItems();
    },
    createToggle: function (position) {
        var toggleButton = document.createElement("a");
        toggleButton.className = "toggleButton";
        var toggleIcon = document.createElement("img");
        if (todoList.items[position].completed === true) {
            toggleIcon.src = "Icons/complete-light-green.png";
        } else {
            toggleIcon.src = "Icons/complete-light.png";
        };
        toggleIcon.className = "icon toggleButton";
        toggleButton.appendChild(toggleIcon);

        return toggleButton;

    },
    setUpEventListeners: function () {
        var itemUL = document.querySelector('ul');
        var promptEdit = document.getElementById("edit");


        promptEdit.addEventListener('click', function (event) {
            debugger;
            var elementClicked = event.target;
            if (elementClicked.className === 'editButton') {
                var data = sessionStorage.getItem('id');
                clickHandler.editItem(parseInt(data));
                promptEdit.innerHTML = "";
            } else if (elementClicked.className === 'icon cancelButton') {
                promptEdit.innerHTML = "";
            };
        });

        itemUL.addEventListener('click', function (event) {

            var elementClicked = event.target;

            if (elementClicked.className === 'icon deleteButton') {
                clickHandler.deleteItem(parseInt(elementClicked.parentNode.parentNode.id));
            } else if (elementClicked.className === 'icon editPrompt') {
                sessionStorage.setItem("id", elementClicked.parentNode.parentNode.id);
                console.log(sessionStorage.getItem('id'));
                view.promptEdit(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === 'icon toggleButton') {
                clickHandler.toggleCompleted(parseInt(elementClicked.parentNode.parentNode.id));
            };
        });

    }
};

view.setUpEventListeners();

