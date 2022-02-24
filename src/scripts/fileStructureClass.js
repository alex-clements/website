/**
 * Class representing a file structure in the mock operating system.
 */
export default class fileStructure {
    constructor() {
        this.parent = null;
        this.children = new Array();
        this.data = new Array();
        this.name = null;
    }

    /**
     * Sets the name of the object.
     * @param {String} name 
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Adds a child FileStructure object to the current FileStructure. Assigns this object as the parent
     * to the child object.
     * @param {FileStructure} child 
     */
    addChild(child) {
        this.children.push(child);
        child.assignParent(this);
    }

    /**
     * Adds a child component without attempting to assign a parent to it
     * @param {ReactComponentElement} child 
     */
    addChildNoParent(child) {
        this.children.push(child);
    }

    /**
     * Assigns a parent to the FileStructure object.
     * @param {FileStructure} parent 
     */
    assignParent(parent) {
        this.parent = parent;
    }

    /**
     * Removes a child component from the file structure.
     * @param {ReactComponentElement} child 
     */
    removeChild(child) {
        for (var i = 0; i<this.children.length; i++) {
            if (this.children[i] == child) {
                this.children[i].removeParent();
                this.children.remove(i);
            }
        }
    }

    /**
     * Removes the parent assigned to this object.
     */
    removeParent() {
        this.parent = null;
    }

    /**
     * Adds 
     * @param {*} element 
     */
    addData(element) {
        this.data.push(element);
    }

    /**
     * Removes data at the provided index.
     * @param {number} index 
     */
    removeData(index) {
        if (index < this.data.length && index >= 0) {
            this.data.splice(index, 1);
        }
    }

    /**
     * 
     * @returns the children of this FileStructure object.
     */
    getChildren() {
        return this.children;
    }

    /**
     * 
     * @returns the data of the FileStructure object.
     */
    getData() {
        return this.data;
    }

    /**
     * 
     * @returns the parent of the FileStructure object.
     */
    getParent() {
        return this.parent;
    }


}