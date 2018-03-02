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
            <h1>Battle</h1>
            <Monsters health={100} image={""} />
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

interface Monster {
    health: number;
    image: string;
}

export class Monsters extends React.Component<Monster, Monster> {
    constructor(props: Monster) {
        super(props);
        this.state = { health: this.props.health, image: this.RandomImage() };
    }

    RandomImage() {
        let random = (Math.floor(Math.random() * Math.floor(6)) + 1);
        let path = "/images/monster" + random + ".png";

        return path;
    }

    ChangeHealth(amount: number) {
        let currentHealth = this.state.health;

        this.setState({ health: currentHealth + amount });
    }

    public render() {
        return <div>
            <p>{this.state.health}</p>
            <img src={this.state.image} />
        </div>;
    }
}