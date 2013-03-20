#!/usr/bin/env node
var fs = require("fs")
var file = process.argv[2]
var varName = process.argv[3]

fs.readFile(file, function (err, text) {
  var output = JSON.stringify(text.toString())
  if (varName) {
    output = "var " + varName + " = " + output
  }
  console.log(output)
})

