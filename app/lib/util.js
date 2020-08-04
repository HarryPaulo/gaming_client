var is = require("electron-is");

export default class util {
    static isWindows = () => {
        return is.windows();
    }

    static isMacOS = () => {
        return is.macOS();
    }

    static isLinux = () => {
        return is.linux();
    }    

    static getOS = () => {
        if (isWindows()) {
            return 'WIN'
        } else if (isMacOS()) {
            return 'MAC'
        } else if (isLinux()) {
            return 'GNU'
        }
    }
}