import React from "react";
import Header from "./components/Header/header";

import "./App.css";

export interface Player {
  name: string;
  points: number;
  expanded?: boolean;
}

export interface AppState {
  players: Player[];
}

export interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    players: [{ name: "John Doe", points: 20, expanded: false }],
  };
  render() {
    return (
      <div className="app">
        <Header />
        <div className="add-form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              className="add-form__input input"
              type="text"
              name="name"
              placeholder="Player Name"
            />
            <input
              className="add-form__input input"
              type="number"
              min={0}
              name="points"
              placeholder="Points"
            />
            <button className="add-form__button btn btn-primary" type="submit">
              <i className="fas fa-plus add-form__button-icon"></i>Add
            </button>
          </form>
        </div>
        <div className="players">
          {this.state.players.length ? (
            this.state.players.map((player, index) => (
              <div className="players__card" key={index}>
                <div className="players__card-header">
                  <span className="players__card-title">{player.name}</span>
                  <button
                    className="btn btn-primary players__card-expand-btn"
                    onClick={() => this.handleExpand(index)}
                  >
                    <i
                      className={`fas fa-${
                        this.state.players[index].expanded
                          ? "chevron-up"
                          : "chevron-down"
                      }`}
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger players__card-delete-btn"
                    onClick={() => this.handleDelete(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <p className="players__card-subtitle">
                  Points: {player.points}
                </p>
                {this.state.players[index].expanded && (
                  <div className="players__card-expanded">
                    <div className="buttons">
                      <button
                        className="btn btn-primary btn--no-border players__card-expanded-add-btn"
                        onClick={() => this.handleIncrement(index)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      <button
                        className="btn btn-danger btn--no-border players__card-expanded-subtract-btn"
                        onClick={() => this.handleDecrement(index)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </div>

                    <input
                      className="input players__card-expanded-input"
                      type="number"
                      min={0}
                      value={this.state.players[index].points}
                      name="points"
                      placeholder="Points"
                      onChange={(event) =>
                        this.handlePoints(index, event.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="players__empty-text">
              No players added. Click the add button to add one.
            </p>
          )}
        </div>
      </div>
    );
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const { name, points } = event.target;

    if (!name.value || !points.value) {
      alert("Please provide valid values!");
      return;
    }

    const players = this.state.players;
    players.push({ name: name.value, points: parseInt(points.value) });
    this.setState({ players });
  }

  handleIncrement(index: number) {
    const players = this.state.players;
    const player = players[index];
    player.points += 1;

    this.setState({ players });
  }

  handleDecrement(index: number) {
    const players = this.state.players;
    const player = players[index];
    player.points !== 0 ? (player.points -= 1) : (player.points = 0);

    this.setState({ players });
  }

  handleDelete(index: number) {
    const players = this.state.players;
    players.splice(index, 1);

    this.setState({ players });
  }

  handlePoints(index: number, points: any) {
    const players = this.state.players;
    const player = players[index];

    player.points = parseInt(points) || 0;
    this.setState({ players });
  }

  handleExpand(index: number) {
    const players = this.state.players;
    const player = players[index];

    player.expanded = !player.expanded;
    this.setState({ players });
  }
}

export default App;
