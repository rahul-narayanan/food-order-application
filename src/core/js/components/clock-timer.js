/* eslint-disable max-classes-per-file */

import { Component } from "react";

export class ClockTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count || 0
        };
    }

    updateCount() {
        if (this.state.count <= 0) return;

        this.timer = setInterval(() => {
            const newCount = this.state.count - 1;
            this.setState(
                { count: newCount >= 0 ? newCount : 0 }
            );
        }, 1000);
    }

    componentDidMount() {
        this.updateCount();
    }

    // componentDidUpdate() {
    //     this.updateCount();
    // }

    format(time) {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
        seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }

    render() {
        const { count } = this.state;
        return (
            <div className="container">
                <div className="displayedTime">
                    <h1>{this.format(count)}</h1>
                </div>
            </div>
        );
    }
}
