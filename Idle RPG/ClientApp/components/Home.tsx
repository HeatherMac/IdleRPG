import * as React from 'react';
import { RouteComponentProps } from 'react-router';


interface IInventoryProps {
    slots: number;
    inventoryItems: IInventorySlotProps[];
}

interface IInventorySlotProps {
    name: string;
    type: string;
}



export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    inventory: IInventoryProps = {
        slots: 24, inventoryItems: new Array()
    };
    public render() {

        this.GetLoot();
        return <div>
            <div className="row">
                <h1>Idle RPG</h1>
                <Inventory slots={this.inventory.slots} inventoryItems={this.inventory.inventoryItems} />
            </div>
            <div className="row">

                <h1>Battle </h1>
                <Monsters health={100} image={""} level={1} onKill={this.GetLoot} />
            </div>
            <div className="row">
                <h1>Player </h1>
                <Player health={100} image={""} level={1} onKill={this.GetLoot} />
            </div>
        </div>;

    }
    public GetLoot() {

        let drop = Math.floor(Math.random() * 100) + 1;
        if (drop < 10) {
            this.inventory.inventoryItems.push({ name: "helm", type: "helm" });
            return;
        }
        if (drop < 10) {
            this.inventory.inventoryItems.push({ name: "helm", type: "helm" });
            return;
        }



    }
}


export class Inventory extends React.Component<IInventoryProps> {

    constructor(props: IInventoryProps) {
        super(props);
    }
    public render(
    ) {
        let matrix: IInventorySlotProps[][] = new Array();
        let Gridwidth = 4;
        for (var y = 0; y < this.props.slots / Gridwidth; y++) {
            for (var x = 0; x < Gridwidth; x++) {
                if (x == 0) {
                    matrix[y] = new Array();
                }
                let iterator = (y * Gridwidth) + x;

                if (iterator == this.props.slots) {
                    break;
                }

                if (this.props.inventoryItems[iterator]) {
                    matrix[y].push(this.props.inventoryItems[iterator]);
                } else {
                    matrix[y].push({ name: "", type: "empty" });
                }
            }
        }


        return <div>{
            matrix.map(
                function (row) {
                    return <div className="row"> {row.map(function (slot: IInventorySlotProps) {
                        return <Square name={slot.name} type={slot.type} />;
                    })}</div>
                })}</div>
    }
}

export class Square extends React.Component<IInventorySlotProps> {
    constructor(props: IInventorySlotProps) {
        super(props);
    }
    public render() {
        let classname: string = "square " + this.props.type;
        return <div>
            <button className={classname} > {this.props.name}</button>
        </div>;
    }
}

interface Character {
    health: number;
    image: string;
    level: number;
    onKill: () => void;

}

export class Monsters extends React.Component<Character, Character> {
    constructor(props: any) {
        super(props);
        this.state = { health: this.props.health, image: this.RandomImage(), level: this.props.level, onKill: this.props.onKill };
    }

    RandomImage() {
        let random = (Math.floor(Math.random() * Math.floor(6)) + 1);
        let path = "/images/monster" + random + ".png";

        return path;
    }

    ChangeHealth(amount: number) {
        let newHealth = this.state.health + amount;

        if (newHealth <= 0) {
            newHealth = 100;
            this.setState({ level: this.state.level + 1, image: this.RandomImage() });
            this.props.onKill();
        }

        this.setState({ health: newHealth });
    }

    public render() {
        return <div>
            <div className="row">
                <h2>Level {this.state.level}</h2>
            </div>
            <div className="row">
                <p>{this.state.health}</p>
            </div>
            <div className="row">
                <img src={this.state.image} />
            </div>
            <div className="row">
                <button onClick={() => this.ChangeHealth(-10)}>Attack</button>
            </div>
        </div>;
    }
}

export class Player extends React.Component<Character, Character> {
    timerID: number;

    constructor(props: any) {
        super(props);
        this.state = {
            health: this.props.health, image: "/images/player_avatar.png", level: this.props.level, onKill: function () { }};
    }

    ChangeHealth(amount: number) {
        let newHealth = this.state.health + amount;

        if (newHealth <= 0) {
            newHealth = 100;
            this.setState({ level: 1 });
        }

        this.setState({ health: newHealth });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.ChangeHealth(-5),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    public render() {
        return <div>
            <div className="row">
                <h2>Level {this.state.level}</h2>
            </div>
            <div className="row">
                <p>{this.state.health}</p>
            </div>
            <div className="row">
                <img src={this.state.image} />
            </div>
        </div>;
    }
}