export default class fileStructure {
    constructor() {
        this.parent = null;
        this.children = new Array();
        this.data = new Array();
    }

    addChild(child) {
        this.children.push(child);
        child.assignParent(this);
    }

    addChildNoParent(child) {
        this.children.push(child);
    }

    assignParent(parent) {
        this.parent = parent;
    }

    removeChild(child) {
        for (var i = 0; i<this.children.length; i++) {
            if (this.children[i] == child) {
                this.children[i].removeParent();
                this.children.remove(i);
            }
        }
    }

    assignParent(parent) {
        this.parent = parent;
    }

    removeParent() {
        this.parent = null;
    }

    addData(element) {
        this.data.push(element);
    }

    removeData(element) {
        for (var i=0; i<this.data.length; i++) {
            if (this.data[i]['name'] == element) {
                this.data.splice(i, 1);
            }
        }
    }

    getChildren() {
        return this.children;
    }

    getData() {
        return this.data;
    }

    getParent() {
        return this.parent;
    }


}