import React, { Component } from 'react';
import GameList from './GameList';
import GameMenuRight from './GameMenuRight';
import soFetch from '../../lib/soFetch.js';
import startGameCli from '../../lib/startGameCli';
import skt from '../../lib/socket.js';

const idUsuario = localStorage.getItem('idUsuario');


export default class Games extends Component {

    constructor() {
        super();
        this.state = {
            games: [],
            gameSelected: {},
            clickGameDisabled: false,
        };
    }

    componentDidMount() {
        this.loadGames();
    }

    loadGames = () => {
        console.log('games');
        soFetch.post('/games', {}).then((res) => {
            if (res.length > 0) {
                this.setState(() => ({ games: res }));
                if (res && res.length > 0) {
                    this.setState({ gameSelected: res[0] });
                }
            } else {
                // TODO - quando não encontrar os jogos, abrir uma pagina de reload.
            }
        });
    }

    selectGame = (game) => {
        if (game && this.state.gameSelected && game.id_game === this.state.gameSelected.id_game) {
            this.props.history.push({ pathname: '/PlayingStats', data: this.state.gameSelected });

            soFetch.post('/startGameServ', { 'id_game': this.state.gameSelected.id_game, 'id_user': idUsuario }).then((res) => {
            });
        } else {
            this.setState({ gameSelected: game });
        }
    }

    render() {
        return (
            <div className="main-game">
                <div className="menu-bar">
                    <div className="card-title ">
                        <img className="top-menu-logo" src={"./img/logo_verde.png"} alt="" />
                    </div>
                </div>
                <div className="game-side-bar ">
                    <GameMenuRight game={this.state.gameSelected} />
                </div>
                <div className="container-fluid game-card-group">
                    <div className="d-flex flex-row game-group-item">
                        <div className="col-sm-12 game-group-item-scrollbar">
                            <GameList games={this.state.games} selectGame={this.selectGame} gameSelected={this.state.gameSelected} />
                        </div>
                    </div>
                </div>
                <div className="button-bar">
                    {/* <h4 className="card-title">MEU JOGO2 </h4> */}
                </div>
            </div>
        );
    }
}