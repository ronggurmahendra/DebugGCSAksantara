import { isWhileStatement, textChangeRangeIsUnchanged } from 'typescript';

export class ObjectWaypoint {
    //field 
    /*
    public id : number; //urutan
    public Command : string;
    public longitude : number;
    public latitude: number;
    public altitude: number;
    public frame: string;
    public home: boolean;*/
    //field updated
    public command: number;
    public param1: number;
    public param2: number;
    public param3: number;
    public param4: number;
    public x: number;
    public y: number;
    public z: number;
    public target_system: number;
    public target_component: number;
    //'seq': seq, 
    public frame: number;
    public mission_type: number;
    public current: number;
    public autocontinue: number;
    //constructor
    constructor(
       /*
        'command': 16,
        'param1': 0,
        'param2': 10,
        'param3': 0.0,
        'param4': 10,
        'x': lat,
        'y': long,
        'z': 10,
        'target_system': 1, 
        'target_component': 255,
        'seq': seq, 
        'frame': 2,
        'mission_type': 0,
        'current': 1,
        'autocontinue': 0,
        */
       command = 16,
       param1 = 0,
       param2 = 10,
       param3 = 0,
       param4 = 1,
       x,
       y,
       z = 10,
       target_system = 1,
       target_component= 255,
       //'seq': seq, 
       frame = 2,
       mission_type= 0,
       current = 1,
       autocontinue= 0) {
        this.command = command;
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
        this.param4 = param4;
        this.x = x;
        this.y = y;
        this.z = z;
        this.target_system = target_system;
        this.target_component = target_component;
        this.frame = frame;
        this.mission_type = mission_type;
        this.current = current;
        this.autocontinue = autocontinue;
    }
    //function
    getCoordinate(){
        return [this.y,this.x];
    }
    getAll(){
        return [this.command, 
            this.param1,
            this.param2,
            this.param3,
            this.param4,
            this.x,
            this.y,
            this.z,
            this.target_system,
            this.target_component,
            this.frame,
            this.mission_type,
            this.current,
            this.autocontinue
        ];
    }
}
