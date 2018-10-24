const blessed = require('blessed')
      ,contrib = require('blessed-contrib')
      ,time = require('time')
      ,screen = blessed.screen()

const grid = new contrib.grid({rows: 1, cols: 3, screen: screen})

const numbers = [
  [
    "┌──┐",
    "│  │",
    "└──┘"
  ],
  [
    " ┐ ",
    " │ ",
    " ╵ "
  ],
  [
    "╶──┐",
    "┌──┘",
    "└──╴"
  ],
  [
    "───┐",
    "╶──┤",
    "───┘"
  ],
  [
    "╷  ╷",
    "└──┤",
    "   ╵"
  ],
  [
    "┌──╴",
    "└──┐",
    "╶──┘"
  ],
  [
    "┌──╴",
    "├──┐",
    "└──┘"
  ],
  [
    "╶──┐",
    "   │",
    "   ╵"
  ],
  [
    "┌──┐",
    "├──┤",
    "└──┘"
  ],
  [
    "┌──┐",
    "└──┤",
    "╶──┘"
  ],
  [
    " ",
    ":",
    " "
  ]
]
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]
function make_time_from_string(d){
  out_lines = ["","",""]
  t = date_to_string(d)
  for(let char of t){
    if(char == ":"){e = 10}else{e = char}
    out_lines[0] += numbers[e][0]
    out_lines[1] += numbers[e][1]
    out_lines[2] += numbers[e][2]
  }
  out_lines.push(
    d.getFullYear().toString()+"-"+(d.getMonth()+1).toString().padStart(2,'0')+"-"+d.getDate().toString().padStart(2,'0')+"\t"+days[d.getDay()]
  )
  return out_lines.join("\n")
}

function date_to_string(d){
  out = ""
  out += d.getHours().toString().padStart(2, '0')
  out += ":"
  out += d.getMinutes().toString().padStart(2,'0')
  out += ":"
  out += d.getSeconds().toString().padStart(2,'0')
  return out
}

let local = grid.set(0,2,1,1, blessed.text, {label: "LOCAL TIME",content: ""})
let zulu = grid.set(0,1,1,1, blessed.text, {label: "ZULU TIME",content: ""})
let miss = grid.set(0,0,1,1, blessed.text, {label: "MISSION TIME", content: ""})

setInterval(() => {
  let dt = new time.Date()
  if(process.argv.length == 2){ h = "America/New_York"}else{
    h = process.argv[2]
  }
  dt.setTimezone("America/New_York")
  local.setContent(make_time_from_string(dt))
  dt.setTimezone("UTC")
  zulu.setContent(make_time_from_string(dt))
  dt.setTimezone(h)
  miss.setContent(make_time_from_string(dt))
  screen.render()
},1000)

screen.render()
/*┐ ╵  ╵ ╵  ╵  ┐  ┌──┐┌──╴
  │ └──┤:└──┤  │ :│  │└──┐
  ╷    ╷    ╷  ╷  └──┘╶──┘*/