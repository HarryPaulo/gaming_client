import React from 'react';
import PropTypes from 'prop-types';
// import '../../css/Game.css';
import '../../app.global.css';
import PlayGame from './PlayGame';
// import electronStarter from '../../electron-starter';

const GameMenuRight = (props) => (
    <div className="game-side-bar-item">
        <div>
            <span className="card-title f">{props.game.nm_game}</span>
        </div>
        <div className="game-padding-text">
            <span className="f fz-11 ">{props.game.nm_genre}</span>
        </div>
        <div className="game-padding-text">
            <div className="div-year">
                <span className="f fz-13">Year</span><br />
                <span className="f fz-11 div-year">{props.game.year}</span>
            </div>
            <div className="div-createdby">
                <span className="f fz-13">Created by</span><br />
                <span className="f fz-11">Rockstar Games inc.</span>
            </div>
        </div>

        <div className="div-year-director">
            <span className="f fz-13">History</span><br />
            <span className="f fz-11">{props.game.ds_history}</span>
        </div>

        <div className="div-bottom-letList">
            <PlayGame className="game-card-play-bottom-letList" />
            <span className="label-bottom-letlist-play f">Play</span>
        </div>
    </div>
);

GameMenuRight.defaultProps = {
    game: {}
};

GameMenuRight.propTypes = {
    game: PropTypes.object,
};

export default GameMenuRight;