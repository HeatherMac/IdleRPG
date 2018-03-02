import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IInventorySlotProps {
    name: string;
}

export class Home extends React.Component<RouteComponentProps<{}>, {}> {


    public render() {

        return <div>
            <div className="row">
            <h1>Idle RPG</h1>
            <Inventory />
            </div>
            <div className="row">
            <h1>Battle </h1>
            <Monsters health={100} image={""} level={1} />
            </div>
            <div className="row">
                <h1>Player </h1>
                <Player health={100} image={""} level={1} />
            </div>
            </div>;
    }
    public renderInventory() {

    }
}


export class Inventory extends React.Component {

    public render() {
        let list: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16'];
        let matrix: string[][] = new Array();
        let Gridwidth = 4;
        for (var y = 0; y < list.length / Gridwidth; y++) {
            for (var x = 0; x < Gridwidth; x++) {
                if (x == 0) {
                    matrix[y] = new Array();
                }
                if (list[(y * Gridwidth) + x]) {
                    matrix[y].push(list[(y * Gridwidth) + x]);
                }
            }
        }
      
       
        return <div>{
            matrix.map(
                function (row) {
                    return <div className="row"> {row.map(function (slot) {
                        return <Square name={slot} />;
                    })}</div>
                })}</div>
    }
}

export class Square extends React.Component<IInventorySlotProps> {
    constructor(props: IInventorySlotProps) {
        super(props);
    }
    public render() {
        return <div>
            <button className="square">{this.props.name}</button>
        </div>;
    }
}

interface Character {
    health: number;
    image: string;
    level: number;
}

export class Monsters extends React.Component<Character, Character> {
    constructor(props:any) {
        super(props);
        this.state = { health: this.props.health, image: this.RandomImage(), level: this.props.level };
    }

    RandomImage() {
        let random = (Math.floor(Math.random() * Math.floor(6)) + 1);
        let path = "/images/monster" + random + ".png";

        return path;
    }

    ChangeHealth(amount: number) {
        let newHealth = this.state.health + amount;

        if (newHealth <= 0)
        {
            newHealth = 100;
            this.setState({ level: this.state.level + 1, image: this.RandomImage() });
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
        this.state = { health: this.props.health, image: "/images/player_avatar.png", level: this.props.level };
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