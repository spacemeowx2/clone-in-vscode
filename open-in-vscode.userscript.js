// ==UserScript==
// @name         Clone in VSCode
// @namespace    http://imspace.cn/
// @version      0.1
// @description  Clone Github respository in VSCode
// @author       space
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
   'use strict';

   function createButton(actions, uri) {
       const li = document.createElement('li');
       const button = document.createElement('button');
       button.className = 'btn btn-sm'; // js-toggler-target
       button.innerText = 'Clone in VSCode';
       button.addEventListener('click', () => {
           window.open(`vscode://vscode.git/clone?url=${encodeURIComponent(uri)}`)
       })
       li.append(button);
       actions.append(li);
   }
   function getGitUri() {
       const [emptyUri] = [...document.querySelectorAll('button.js-git-protocol-clone-url')].map(i => i.getAttribute('data-url')).filter(i => i.startsWith('git'))
       const [normalUri] = [...document.querySelectorAll('input[data-autoselect]')].map(i => i.value).filter(i => i.startsWith('git'))
       return emptyUri || normalUri
   }
   const actions = document.querySelector('.pagehead-actions')
   if (actions) {
       const uri = getGitUri();
       if (uri) {
           createButton(actions, uri);
       }
   }
})();