import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
// import '../../css/Game.css';
import '../../app.global.css';
import PlayGame from './PlayGame';

const GameCard = (props) => (
    <div className="movie-card" >
        <div className="movie-card card" onClick={() => props.selectGame(props.game)}>
            {props.gameSelected && props.gameSelected.id_game ===  props.game.id_game ?
                <div className="game-card-image" >
                    <PlayGame className="game-card-play-bottom"/>
                    <img className="card-img-top game-card-image game-card-selected" src={props.game.url_img} alt="" />
                </div>
                :
                <img className="card-img-top game-card-image" src={props.game.url_img} alt="" />
            }
        </div>
    </div>
);

GameCard.defaultProps = {
    game: {}
};

GameCard.propTypes = {
    game: PropTypes.object,
    selectGame: PropTypes.func,  
    gameSelected: PropTypes.object,  
};

export default GameCard;