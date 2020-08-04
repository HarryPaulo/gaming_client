import io from 'socket.io-client';
import soFetch from './soFetch';

const skt = io.connect(soFetch.getUrlSocket());

export default class socket {

    static getSkt = () => {
        return skt;
    }
}    