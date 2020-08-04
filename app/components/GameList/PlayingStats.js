import React, { Component } from 'react';
import { css } from 'react-emotion';
import { RingLoader } from 'react-spinners';
import skt from '../../lib/socket.js';
import startGameCli from '../../lib/startGameCli';

const idUsuario = localStorage.getItem('idUsuario');
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    left: 50%;
    top: 25%;
    border-width: 5px;
    transform: translate(-50%, -50%);
    border-width: 16px;
    position: absolute !important;
    border-width: 1px;
    text-shadow: 0px 0 black, 0 1px black, 1px 0 black, 0 -1px black;    
`;

export default class Games extends Component {

    constructor() {
        super();
        this.state = {
            gameSelected: {},
            loading: true,
        };
    }

    componentDidMount() {
        // skt.getSkt().on('login', (o) => this.updateSysMsg(o));
        // skt.getSkt().on('logout', (o) => this.updateSysMsg(o));
        // skt.getSkt().on('broadcast', (obj) => this.message(obj));
        skt.getSkt().on(`cli_${idUsuario}`, (obj) => this.private(obj));
    }    

    private = (obj) => {
        console.log('abre o Cliente e conecta');
        console.log(obj);
        startGameCli.backgroundProcess(obj.servidor);
    }
    
    message = (obj) => {
        var isme = (obj.userid == this.state.userid) ? true : false;
        let history = this.state.history;
        let text = obj.username + ' Said ' + obj.content;
        history.push({ msg: text });
        if (isme) {
            console.log('it`s me' + text);
            this.setState({ history: history });
        } else {
            console.log('wasn`t me ' + text);
            this.setState({ history: history });
        }
    }
    
    updateSysMsg = (o) => {
        this.setState({ onlineCount: o.onlineCount });
        this.setState({ onlineUsers: o.onlineUsers });
    };

    submit = () => {
        // var content = this.state.msg;
        // let idUsuario = localStorage.getItem('idUsuario');
        // if (content != '') {
        //     var obj = {
        //         to: this.state.userPrivateId,
        //         userid: this.state.userid,
        //         username: idUsuario,
        //         content: content
        //     };
        //     if (this.state.userPrivateId > 0) {
        //         socket.emit('private', obj);
        //     } else {
        //         socket.emit('broadcast', obj);
        //     }

        //     this.setState({ msg: '' })
        // }
    }   

    voltar = () => {
        this.props.history.push('/GamesList');
    }

    render() {
        return (
            <div className="main-game bg" style={{
                backgroundImage: 'url(' + this.props.location.data.url_wallpaper + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="playingStatus-menu-bar">
                    <h4 className="playingStatus-Botao-Voltar" onClick={this.voltar}>Voltar </h4>
                </div>
                {this.state.loading ?
                    <div>
                        <div className={override} style={{ backgroundColor: 'black', opacity: '0.4', borderRadius: '50%', width: '150px', height: '150px'}}></div>
                            <RingLoader
                                className={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#44d42c'}
                                loading={this.state.loading}
                            />
                        
                        <h4 className={override}>Loading... </h4>
                    </div>
                    :
                    ''
                }

                {/* <img className="img.bg concord-bg" src={this.props.location.data.url_wallpaper} alt="" /> */}
                <p className="fonteNomeJogo"> {this.props.location.data.nm_game} </p>
            </div>
        );
    }
}