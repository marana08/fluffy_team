import{a as W,i as h,S as z,N as oe,P as ae,A as se,R as re,b as K}from"./assets/vendor-DfcDIlvk.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const r={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination"),animalDetailsBackdrop:document.querySelector(".animal-details-backdrop")},w={page:1,limit:6},P="/fluffy_team/assets/sprite-C5gMIK71.svg";function g(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving to LocalStorage:",n)}}function O(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}r.animalDetailsBackdrop.addEventListener("click",ce);function ie(e){const n=O("animals").find(o=>o._id===e);if(!n)return;le(n),r.animalDetailsBackdrop.classList.add("is-open"),document.body.style.overflow="hidden";const a=document.querySelector(".details-modal-close-btn");window.addEventListener("keydown",J),a.addEventListener("click",H);const s=document.querySelector(".modal-adopt-btn");s&&s.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-order-modal",{detail:{animalId:n._id}}))})}function le({_id:e,name:t,image:n,species:a,age:s,gender:o,description:u,healthStatus:l,behavior:c}){const p=`
    <div class="animal-modal" data-id="${e}" tabindex="-1" role="dialog">
    <button
      class="details-modal-close-btn"
      type="button"
      aria-label="Закрити модальне вікно"
    >
      <svg class="details-modal-close-btn-icon" width="24" height="24">
        <use href="${P}#icon-close"></use>
      </svg>
    </button>
    <div class="animal-modal-content">
      <div class="animal-modal-img-wrapper">
        <img class="animal-modal-img" src="${n}" alt="${t}-${a}" />
      </div>
      <div class="animal-modal-info">
        <p class="animal-species">${a}</p>
        <h2 class="animal-name">${t}</h2>
        <div class="age-gender-wrapper">
          <p class="animal-age">${s}</p>
          <p class="animal-gender">${o}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Опис:</h3>
          <p class="descriprion-text">${u}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Здоров'я:</h3>
          <p class="descriprion-text">${l}</p>
        </div>
        <div class="description-section last">
          <h3 class="descriprion-title">Поведінка:</h3>
          <p class="descriprion-text">${c}</p>
        </div>
        <button class="modal-adopt-btn" type="button">Взяти додому</button>
      </div>
    </div>
  </div>
  `;r.animalDetailsBackdrop.innerHTML=p}function H(){r.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",window.removeEventListener("keydown",J);const e=getLastFocusedElement();e&&e.focus()}function J(e){e.code==="Escape"&&H()}function ce(e){e.currentTarget===e.target&&H()}function Y(e){e.focus();const n=e.querySelectorAll(`
    a[href],
    button:not([disabled]),
    textarea,
    input,
    select,
    [tabindex]:not([tabindex="-1"])
  `),a=n[0],s=n[n.length-1];e.addEventListener("keydown",o=>{o.key==="Tab"&&(o.shiftKey&&document.activeElement===a&&(o.preventDefault(),s.focus()),!o.shiftKey&&document.activeElement===s&&(o.preventDefault(),a.focus()))})}const G=document.querySelector(".header-burger-menu"),I=document.querySelector(".header-modal"),de=document.querySelector(".modal-close-button");document.querySelector(".modal-navigation-item");const ue=document.querySelector(".modal-navigation-list"),pe=document.querySelector(".modal-button");function B(e){I.classList.remove("is-open"),document.body.classList.remove("is-modal-open"),document.removeEventListener("keydown",Q),G.blur()}function Q(e){e.key==="Escape"&&B()}pe.addEventListener("click",B);G.addEventListener("click",e=>{e.preventDefault(),I.classList.add("is-open"),document.body.classList.add("is-modal-open"),document.addEventListener("keydown",Q),Y(I)});de.addEventListener("click",B);ue.addEventListener("click",e=>{e.target.classList.contains("modal-navigation-link")&&B()});const me="https://paw-hut.b.goit.study/api",$={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},q=W.create({baseURL:me});async function fe(e=w.page){try{const t=typeof w.limit=="number"&&w.limit>0?w.limit:6,n=typeof e=="number"&&e>=1?e:1;return(await q.get(`${$.feedbacks}`,{params:{limit:t,page:n}})).data.feedbacks}catch{return null}}let N=ge(),i=O("page"),R,m=O("categoryId")??null;document.addEventListener("DOMContentLoaded",ye);r.petsLoadMoreBtn.addEventListener("click",he);r.categoryList.addEventListener("click",ve);r.petsListPagination.addEventListener("click",be);r.petsList.addEventListener("click",Le);function ge(){return window.innerWidth>=1440?9:8}function j(){return Math.ceil(R/N)}async function ye(e){C(),i=1,m=null,g("page",1),g("categoryId",null);try{const t=await we(),n=await x();ke(t),F(n),_(),k()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M()}}async function ve(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;m=e.target.closest("li").dataset.id,i=1;let a;C(),r.categoryList.querySelectorAll(".category-btn").forEach(o=>{o.classList.remove("current")}),e.target.classList.add("current");try{t!=="Всі"?a=await U(m,i):a=await x(),F(a),k(),_()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M(),g("categoryId",m),g("page",i)}}async function he(){i+=1,r.loader.classList.add("loader-center"),C();try{if(m){k();const t=await U(m,i),n=D(t);r.petsList.insertAdjacentHTML("beforeend",n)}else{k();const t=await x(i),n=D(t);r.petsList.insertAdjacentHTML("beforeend",n)}const e=r.petsList.querySelector("li");if(e){const t=e.getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M(),g("page",i),r.loader.classList.remove("loader-center")}}async function be(e){const t=e.target.closest("button");if(!t)return;let n;r.loader.classList.add("loader-center"),C();const a=j();t.dataset.action==="prev"&&i>1&&(i-=1),t.dataset.action==="next"&&i<a&&(i+=1),t.dataset.page&&(i=Number(t.dataset.page));try{m?n=await U(m,i):n=await x(i),F(n),_(),window.scrollTo({top:r.petsList.offsetTop-80,behavior:"smooth"})}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M(),r.loader.classList.remove("loader-center"),g("page",i)}}function Le(e){const t=e.target.closest(".pets-button");if(!t)return;const n=t.closest("li");if(!n)return;const a=n.dataset.id;ie(a)}async function we(e){return(await q.get(`${$.categories}`)).data}async function x(e){const t=await q.get(`${$.animals}`,{params:{limit:N,page:e}});return R=t.data.totalItems,t.data.animals}async function U(e,t){const n=await q.get(`${$.animals}?categoryId=${e}`,{params:{limit:N,page:t}});return R=n.data.totalItems,n.data.animals}function Ee(e){return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn" data-text="${e.name}" type="button">${e.name}</button>
      </li>`}function Se(e){return e.reverse().map(Ee).join("")}function ke(e){const t=` <li class="category-item">
        <button class="category-btn current" type="button">Всі</button>
      </li>${Se(e)}`;r.categoryList.innerHTML=t}function Be({_id:e,name:t,image:n,species:a,age:s,gender:o,categories:u,description:l}){const c=u.map(p=>`<li class="pets-category-item">${p.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}" tabindex="0">
     <div class="pets-img-wrapper"><img class="pets-img" src="${n}" alt="${t} - ${a}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${a}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${c}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${s}</li>
              <li class="descriprion-item">${o}</li>
            </ul>
            <p class="pets-descriprion">${l}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function D(e){return e.map(Be).join("")}function F(e){const t=D(e);r.petsList.innerHTML=t,g("animals",e)}function _(){const e=j();if(e<=1)return;let t="";if(t+=`<li>
      <button class="pagination-btn-arrow" data-action="prev" aria-label="Попередня сторінка" ${i===1?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${P}#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`,i===1){for(let n=1;n<=Math.min(3,e);n+=1)t+=y(n);e>3&&(t+='<li class="dots">…</li>',t+=y(e))}else{t+=y(1),i>3&&(t+='<li class="dots">…</li>');for(let n=i-1;n<=i+1;n+=1)n>1&&n<e&&(t+=y(n));i<e-2&&(t+='<li class="dots">…</li>'),e>1&&(t+=y(e))}t+=`<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${i===e?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${P}#icon-arrow-forward"></use>
        </svg>
      </button>
    </li>`,r.petsListPagination.innerHTML=t}function y(e){return`
    <li>
      <button
        class="pagination-btn ${i===e?"current":""}"
        aria-label="Сторінка ${e}"
        data-page="${e}">
        ${e}
      </button>
    </li>
  `}function C(){r.loader.classList.remove("loader-hidden")}function M(){r.loader.classList.add("loader-hidden")}function $e(){r.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function qe(){r.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function k(){const e=j();i>=e?qe():$e()}let E=null;function v(e){var u,l;let t=null,n=null;const a=(u=e==null?void 0:e.navigation)==null?void 0:u.prevEl,s=(l=e==null?void 0:e.navigation)==null?void 0:l.nextEl;a&&(t=Array.isArray(a)?a[0]:a),s&&(n=Array.isArray(s)?s[0]:s);const o=(e==null?void 0:e.el)||(e==null?void 0:e.$el)||null;if(o){const c=o.closest(".about-swiper-parent");c&&(t=t||c.querySelector(".about-swiper-button-prev"),n=n||c.querySelector(".about-swiper-button-next"))}if(t){const c=!!(e!=null&&e.isBeginning);t.disabled=c,t.classList.toggle("swiper-button-disabled",c),t.setAttribute("aria-disabled",c?"true":"false")}if(n){const c=!!(e!=null&&e.isEnd);n.disabled=c,n.classList.toggle("swiper-button-disabled",c),n.setAttribute("aria-disabled",c?"true":"false")}}function xe(){const e=document.querySelector(".mySwiper");if(!e)return null;if(e.swiper)try{e.swiper.destroy(!0,!0)}catch{}const t=e.closest(".about-swiper-parent");if(!t)return null;const n=t.querySelector(".about-swiper-button-next"),a=t.querySelector(".about-swiper-button-prev"),s=t.querySelector(".about-swiper-pagination"),o=new z(e,{modules:[oe,ae],loop:!1,wrapperClass:"about-swiper-wrapper",slideClass:"about-swiper-slide",pagination:{el:s,clickable:!0},slidesPerView:1,spaceBetween:0,breakpoints:{768:{slidesPerView:1}},on:{init(l){v(l)},slideChange(){v(o)}}}),u=(l,c,p)=>{if(!l)return;const L=l[c];if(L)try{l.removeEventListener("click",L)}catch{}l[c]=p,l.addEventListener("click",p)};return u(n,"_aboutUsNext",l=>{l.preventDefault(),o.slideNext(),v(o)}),u(a,"_aboutUsPrev",l=>{l.preventDefault(),o.slidePrev(),v(o)}),v(o),o}function V(){if(E){try{E.destroy(!0,!0)}catch{}E=null}E=xe()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",V):V();new se(".accordion-container",{showMultiple:!1,collapse:!0,duration:300,onOpen(e){const t=e.querySelector(".ac-panel");if(!t)return;const n=t.getBoundingClientRect();if(n.bottom>window.innerHeight){const a=n.bottom-window.innerHeight+20;window.scrollBy({top:a,behavior:"smooth"})}}});const Ce=document.querySelectorAll(".faq-question-btn");Ce.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-label",t?"Закрити відповідь":"Відкрити відповідь")})});function Me(e){const t=document.querySelector(".swiper-wrapper"),n=e.map(({description:a,rate:s,author:o})=>`
        <div class="swiper-slide">
          <div class="star-rating" data-score="${s}"></div>     
            <p class="storie-text">${a}</p>
            <p class="storie-names">${o}</p>  
        </div>`).join("");t.insertAdjacentHTML("beforeend",n),document.querySelectorAll(".star-rating").forEach(a=>{new re(a,{starType:"svg",readOnly:!0}).init()})}const X=document.querySelector(".stories-loader"),Te=document.querySelector(".swiper-controls");function A(e){h.info({message:e,position:"topRight",color:"#f2aaaaff",icon:!1,progressBar:!1,messageColor:"black"})}function S(){X.classList.remove("loader")}function Ae(){X.classList.add("loader")}function Pe(){Te.classList.remove("visually-hidden")}window.addEventListener("DOMContentLoaded",async()=>{Ae();try{let e=await fe();if(e===null){A("Не вдалося завантажити історії. Спробуйте пізніше"),S();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Не вдалося завантажити історії</p>');return}if(e.length===0){A("Нажаль, історії зараз недоступні"),S();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>');return}Me(e);const t=new z(".swiper",{direction:"horizontal",loop:!1,speed:400,spaceBetween:32,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!1},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:2}}});Pe(),S()}catch{A("Cталась помилка. Спробуйте пізніше");const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>'),S()}});let Ie=null;function De(){return Ie}let Z;const f=document.getElementById("order-form"),b=document.getElementById("modal-order"),Oe=b.querySelector(".modal-close-btn");window.addEventListener("open-order-modal",e=>{var a;const t=(a=e==null?void 0:e.detail)==null?void 0:a.animalId;if(!t)return;Z=t,r&&r.animalDetailsBackdrop&&r.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",b.classList.remove("visually-hidden"),document.body.classList.add("modal-open"),window.addEventListener("keydown",ee);const n=document.querySelector(".modal-order");Y(n)});function T(){b.classList.add("visually-hidden"),document.body.classList.remove("modal-open"),window.removeEventListener("keydown",ee)}function ee(e){e.key==="Escape"&&T()}function He(e){e.target===b&&T()}Oe.addEventListener("click",T);b.addEventListener("click",He);f.addEventListener("submit",async e=>{e.preventDefault();const{name:t,phone:n,comments:a}=e.target.elements,s=t.value.trim();let o=n.value.trim();const u=a.value.trim(),l=f.querySelectorAll(".input-error"),c=f.querySelectorAll(".error-text");if(l.forEach(d=>d.classList.remove("input-error")),c.forEach(d=>d.textContent=""),s.length>32){const d=f.querySelector('.modal-form-input[type="text"]');d.classList.add("input-error"),d.nextElementSibling.textContent="Ім'я не повинно перевищувати 32 символи.";return}const p=/^[0-9]{12}$/;if(o[0]==="+"&&(o=o.slice(1)),o.length!==12){const d=f.querySelector('.modal-form-input[type="tel"]');d.classList.add("input-error"),d.nextElementSibling.textContent="Телефон повинен містити 12 цифр.";return}if(!p.test(o)){const d=f.querySelector('.modal-form-input[type="tel"]');d.classList.add("input-error"),d.nextElementSibling.textContent="Телефон повинен містити лише цифри.";return}if(u.length>255){const d=f.querySelector(".modal-form-textarea");d.classList.add("input-error"),d.nextElementSibling.textContent="Коментар не повинен перевищувати 255 символів.";return}const L={name:s,phone:o,animalId:Z,comment:u.length>0?u:"Без коментарів"};try{const te=(await W.post("https://paw-hut.b.goit.study/api/orders",L)).data;return T(),K.fire({title:"Дякуємо за вашу заявку!",icon:"success",confirmButtonText:"Закрити"}).then(()=>{const ne=De()}),e.target.reset(),te}catch(d){K.fire({title:"Помилка!",text:"Сталася помилка при надсиланні заявки. Спробуйте ще раз пізніше.",icon:"error",confirmButtonText:"Закрити"}),console.error("Error submitting order:",d)}});function Ne(){const e=document.getElementById("scrollTopBtn"),t=document.querySelector("#hero");if(!e||!t)return;const n=t.offsetHeight;window.addEventListener("scroll",()=>{window.scrollY>n?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Ne);
//# sourceMappingURL=index.js.map
