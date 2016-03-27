define([],function(){

"use strict";
function performTest(testName) {
  var hypotheses = document.querySelectorAll('[data-test-name=' + testName + ']')
  if (localStorage['ab-test-' + testName]==undefined) {
    var selected = pickRandomNode(hypotheses)
    localStorage['ab-test-' + testName] = selected.dataset.hypothesis
    return selected
  }
  return hypotheses.querySelector('[data-hypothesis=' + localStorage['ab-test-' + testName] + ']' )
}

function pickRandomNode(elementList) {
  return elementList[Math.floor(Math.random() * elementList.length)]
}

function extractTests(){
  //I'd like to use a set here...
  var tests = document.querySelectorAll('[data-test-name]')
  var names = []
  for (var i = 0; i < tests.length; i++) {
    var name = tests[i].getAttribute('data-test-name')
    if (names.indexOf(name)==-1) {
      names.push(name)
    }
  }
  return names
}

function hideAll(nodes){
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].style.display = 'none';
  }
}

function showAll(nodes){
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].style.display = null;
  }
}

function init(){
  var tests = extractTests();
  var hide = document.querySelectorAll('[data-test-name]');
  var show = [];
  for (var i = 0; i < tests.length; i++) {
    show.push(performTest(tests[i]))
  }
}

return {
  init : init
}
});
