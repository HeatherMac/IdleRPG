import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {

   
    public render() {
    
        return <div>
            <h1>Idle RPG</h1>
            <Square />
            {this.renderInventory()}
        </div>;
    }
    public renderInventory() {
        let list: string[] = ['', '', ''];
        return list.map(function (inv) { return <Square />; });
    }
}

export class Square extends React.Component {
    public render() {
        return <div>
            <button className="square"></button>
            </div>;
    }
}