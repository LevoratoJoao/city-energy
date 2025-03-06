class Technician {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.devices = new Map();
    }
}

export default Technician;