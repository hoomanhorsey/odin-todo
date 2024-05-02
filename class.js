
export class Todo {
    constructor(title, description, dueDate, priority, status, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.checklist = [{name: "Item 1", checked: false}, {name: "Item 2", checked: true}]
    }
};