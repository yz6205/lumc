const HelpInfo = {
undefined:
`usage: lumc <command>
Commands:
  help      show this message
  gen       generate blog

For more help message, you can use 'lumc help [command]' for the detailed information
`,

"gen":
`usage: lumc gen [configurePath]

Description:
generate and update following rules in the given configure file

Arguments:
  configurePath configure file path, default to "modules/map.conf"
`
}

const pr = require('./parser')

function help(method) {
  if (HelpInfo[method]) {
    console.log(HelpInfo[method])
  } else {
    console.log(HelpInfo[method])
  }
}

let command = process.argv[2]
switch (command) {
  case undefined:
  case "help":
    help(process.argv[3])
    break

  default:
    help()
}