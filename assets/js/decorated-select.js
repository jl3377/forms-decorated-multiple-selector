class decoratedSelect {

    /**
     * @param {object} params
     */
    start( params ) {

        window.addEventListener("load", () => {

            this.name = params.name;
            this.class = params.class;
            this.selector = document.querySelector(params.class); // select class
            this.selectorText = params.selectText;
            this.sortSelector();
            this.createContainers();
            this.populateOptions();
            this.eventOpenList();
            this.eventAddRemove();
            this.updateSelect();
        })
    }

    /**
     * Create  container
     * @desc main container | list with unselected items | list with selected items
     */
    createContainers() {

        // main container
        this.div = document.createElement("div");
        this.div.setAttribute("class", this.name);
        this.selector.after(this.div);

        // Title selector
        this.list = document.createElement('p');
        this.div.append(this.list);
        this.list.setAttribute("class", "list");
        this.list.innerHTML = this.selectorText;

        // list unselected elements
        this.ulUnselectedElements = document.createElement("ul");
        this.ulUnselectedElements.setAttribute('class', 'list-items');
        this.ulUnselectedElements.style.display = "none";
        this.div.append(this.ulUnselectedElements);

        // new list for selected elements
        this.ulSelectedElements = document.createElement('ul');
        this.ulSelectedElements.setAttribute('class', 'list-items-selected');
        this.div.append(this.ulSelectedElements)

    }

    /**
     * Populate lists with selected and unselected items
     */
    populateOptions () {

        for (let i = 0; i < this.selector.length; i++) {


            let selected;
            let id = this.selector[i].value; // id
            let value = this.selector[i].text; // value

            (this.selector[i].selected == true) ? selected = " selected" : selected = "";

            // populate options from select into unordered list
            let li = document.createElement('li');
            li.innerHTML = value;
            li.setAttribute('id', "item-"+id);
            li.setAttribute('class', 'item item-'+id+selected);
            li.setAttribute('data-id', id);
            li.setAttribute('data-value', value);

            (this.selector[i].selected == true) ? this.ulSelectedElements.append(li) : this.ulUnselectedElements.append(li);

            // actions to add/delete elements
            let action = document.createElement("div");
            action.setAttribute('data-id', id);
            if (this.selector[i].selected == true) {
                action.innerHTML = "Quitar";
                action.setAttribute('data-action', 'delete');
                action.setAttribute('class', 'action delete-'+id);
            } else {
                action.innerHTML = "Seleccionar";
                action.setAttribute('data-action', 'add');
                action.setAttribute('class', 'action add-'+id);
            }
            li.append(action);

        }

    }

    /**
     * Event to open list with unselected items
     */
    eventOpenList() {

        let list = document.querySelector(this.class+" .list");
        list.addEventListener("click", () => {

            let list_items = document.querySelector(this.class+" .list-items");
            (list_items.style.display == "none") ? list_items.style.display = "block": list_items
                .style.display = "none";
        })
    }

    /**
     * Event to add and remove items
     */
    eventAddRemove() {

        // event to add items to selected list
        let items = document.querySelectorAll(this.class+" ul li div.action");

        for ( let i=0 ; i<items.length; i++){

            // event to add or remove selected items to list
            items[i].addEventListener('click', (evt) => {

                let itemToAdd;
                let id = items[i].parentNode.getAttribute('data-id')
                let actionValue = items[i].getAttribute('data-action'); // delete and add node

                if (actionValue == "add") {
                    itemToAdd = document.querySelector(this.class+" ul li.item-"+id);
                    itemToAdd.setAttribute('class', 'selected item item-'+id);
                    items[i].setAttribute('class', 'action delete-'+id); // change action to delete
                    items[i].setAttribute('data-action', 'delete'); // change action to delete
                    items[i].innerHTML = "Quitar";
                    this.ulSelectedElements.append(itemToAdd);
                } else { // add selected items to not selected list
                    itemToAdd = document.querySelector(this.class+" ul li.item-"+id);
                    itemToAdd.setAttribute('class', 'item item-'+id);
                    items[i].setAttribute('class', 'action add-'+id); // change action to delete
                    items[i].setAttribute('data-action', 'add'); // change action to delete
                    items[i].innerHTML = "Seleccionar";
                    this.ulUnselectedElements.append(itemToAdd);
                }

                // update selector
                this.updateSelect( id );

            })
        }

    }

    /**
     * Update main select: <select></select>
     * @param {int} id identifier for option element
     */
    updateSelect( id ) {

         // update select status option
         for ( let z =0; z<this.selector.length; z++ ) {
            if( this.selector[z].value == id) {
                (this.selector[z].selected == false) ? this.selector[z].selected = true : this.selector[z].selected = false;
            }
        }

    }

    /**
     * order options from selector <select></select>
     */
    sortSelector () {

        let tmp = []; // temporal array
        let selected;

        for ( let i=0; i<this.selector.length; i++) {
            tmp.push({
                label: this.selector[i].label, // attribute label
                text: this.selector[i].text, // text value from option
                id: this.selector[i].value, // attribute id
                selected: this.selector[i].selected // attribute selected
            });
        }
        // sort by label the HML5 select options
        tmp.sort( (a, b) => (a.label > b.label) ? 1 : -1)
        // console.log(tmp)

        // populate ordered options into the selector
        // for ( let i = 0; i<tmp.length;i++) {
        //     (tmp[i].selected === true) ? selected = true : selected = false;
        //     this.selector.options[i] = new Option(tmp[i].text, tmp[i].label, false, selected );
        // }


    }
}