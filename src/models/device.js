class Device {
    constructor(type, id, name, description, status, energy) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.description = description
        this.status = status;
        this.technician = [];
    }
}
export default Device;