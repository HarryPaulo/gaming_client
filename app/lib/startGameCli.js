const path = require('path');
const util = require('./util.js');

export default class StartGameCli {
  // static startClient = (servidor) => {
  //   StartGameCli.backgroundProcess(servidor);
  // }

  static backgroundProcess = (servidor) => {
    const process = require('child_process');   // The power of Node.JS
    let cmd;
    console.log(util.isWindows());
    if (util.isWindows() === true) {
      cmd = 'ga-client ';
    } else {
      cmd = './ga-client ';
    }
    //    let dir = path.join(__dirname, '/bin');

    let dir = 'D:/dev/fontes/gaw/bin.win32';
    const address = 'rtsp://' + servidor.ds_ip + ':' + servidor.ds_game_stream_porta + '/' + servidor.ds_alias_desktop;
    // const address = ;
    const config = 'config/client.rel2.conf';
    console.log(address);
    var child = process.spawn(cmd, [config, address], { cwd: dir, shell: true, env: process.env });
    // // var child = process.spawn('ls', ["-a"], { shell: true, env: process.env, cwd: path.join(__dirname, '/bin') });

    child.on('error', function (err) {
      console.log('child.on(error): <' + err + '>');
    });

    child.stdout.on('data', function (data) {
      console.log('child.stdout.on(data): <' + data);
    });

    child.stderr.on('data', function (data) {
      console.log('stderr: <' + data + '>');
    });

    child.on('close', function (code) {
      if (code == 0)
        console.log('child process complete.');
      else
        console.log('child process exited with code ' + code);
    });
  }
}