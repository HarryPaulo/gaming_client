import React from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';

const getGames = (games, props) => {
    return (
        <div className="card-deck game-card-deck">
            {
                games.map(game => <GameCard key={game.id_game} game={game} selectGame={props.selectGame} gameSelected={props.gameSelected}/>)
            }
        </div>
    );
};

const GameList = (props) => (
    <div>
        {getGames(props.games, props)}
    </div>
);

GameList.defaultProps = {
    games: []
};

GameList.propTypes = {
    games: PropTypes.array,
    selectGame: PropTypes.func,   
    gameSelected: PropTypes.object,
};

export default GameList;