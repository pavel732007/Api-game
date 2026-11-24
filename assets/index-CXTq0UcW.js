(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{API;gridElement;modalWindowsElement;constructor(){this.API=`https://udavodav.github.io/simple-api-game/games.json`,this.gridElement=document.querySelector(`#grid`),this.modalWindowsElement=document.querySelector(`#modalWindows`),document.addEventListener(`DOMContentLoaded`,()=>{if(!this.modalWindowsElement)return null;this.rendering(this.API),this.modalWindowsElement.addEventListener(`click`,()=>{if(!this.modalWindowsElement)return null;this.modalWindowsElement.style.display=`none`})})}skeletonElemnet({id:e,title:t,genre:n,rating:r,thumbnail:i,short_description:a}){return`
      <div class="block" id="block-${e}" data-id="${e}">
        <img class="thumbnail" src="${i}" alt="photo">
        <div class="info">
          <h2 class="title">${t}</h2>
          <p class="genre">${n}</p>
        </div>
        <h3 class="short_description">${a}</h3>
        <p class="rating">${r}</p>
      </div>
    `}async rendering(e){try{if(!this.gridElement)return null;let t=await fetch(e);if(!t.ok)throw Error(`Ошибка HTTP: ${t.status}`);let n=await t.json();for(let e in n)this.gridElement.innerHTML+=this.skeletonElemnet(n[e]);for(let e=0;e<this.gridElement.children.length;e++)this.gridElement.children[e].addEventListener(`click`,()=>{this.modalWindows(e+1)})}catch(e){console.error(`Ошибка:`,e)}}async modalWindows(e){try{if(!this.modalWindowsElement)return null;let t=await fetch(`https://udavodav.github.io/simple-api-game/games/${e}.json`);if(!t.ok)throw Error(`Ошибка HTTP: ${t.status}`);let n=await t.json();this.modalWindowsElement.style.display=`block`,this.modalWindowsElement.innerHTML=this.createModalWindow(n)}catch(e){console.error(`Ошибка:`,e)}}createModalWindow({id:e,title:t,genre:n,developer:r,publisher:i,platforms:a,release_date:o,rating:s,price:c,description:l,thumbnail:u,system_requirements:{minimum:d,recommended:f},tags:p}){return console.log(u),`
          <div class="modal" data-modal-id="${e}">
            <div class="modal__content">
              <img class="modal__image" src="${u}" alt="${t}">
        
              <div class="modal__body">
                <div class="modal__header">
                  <h2 class="modal__title">${t}</h2>
                  <span class="modal__rating">${s}</span>
                </div>
        
                <div class="modal__meta">
                  <span class="modal__genre">${n}</span>
                  <span class="modal__price">$${c}</span>
                </div>
        
                <p class="modal__company">${r} / ${i}</p>
                <p class="modal__date">Дата выхода: ${o}</p>
                <p class="modal__platforms">Платформы: ${a.join(`, `)}</p>
        
                <p class="modal__description">${l}</p>
        
                <div class="modal__requirements">
                  <div class="modal__req">
                    <h3>Минимум</h3>
                    <p>${d.os}</p>
                    <p>${d.processor}</p>
                    <p>${d.memory}</p>
                    <p>${d.graphics}</p>
                    <p>${d.storage}</p>
                  </div>
                  <div class="modal__req">
                    <h3>Рекомендуется</h3>
                    <p>${f.os}</p>
                    <p>${f.processor}</p>
                    <p>${f.memory}</p>
                    <p>${f.graphics}</p>
                    <p>${f.storage}</p>
                  </div>
                </div>
        
                <ul class="modal__tags">
                  ${p.map(e=>`<li>${e}</li>`).join(``)}
                </ul>
              </div>
            </div>
          </div>
        `}};document.querySelector(`#app`).innerHTML=`
  <h1>Game</h1>
  <div id="grid"></div>
  <div id="modalWindows">
    
  </div>
`,new e;