import{a as z,i as h,S as J,N as oe,P as ae,A as se,R as re,b as V}from"./assets/vendor-DfcDIlvk.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const r={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination"),animalDetailsBackdrop:document.querySelector(".animal-details-backdrop")},w={page:1,limit:6},P="/fluffy_team/assets/sprite-C5gMIK71.svg";function g(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving to LocalStorage:",n)}}function O(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}let ie=null;function le(){return ie}r.animalDetailsBackdrop.addEventListener("click",ue);function ce(e){const n=O("animals").find(d=>d._id===e);if(!n)return;de(n),r.animalDetailsBackdrop.classList.add("is-open"),document.body.style.overflow="hidden";const s=document.querySelector(".animal-modal");N(s);const a=document.querySelector(".details-modal-close-btn");window.addEventListener("keydown",Y),a.addEventListener("click",H);const o=document.querySelector(".modal-adopt-btn");o&&o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-order-modal",{detail:{animalId:n._id}}))})}function de({_id:e,name:t,image:n,species:s,age:a,gender:o,description:d,healthStatus:l,behavior:c}){const p=`
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
        <img class="animal-modal-img" src="${n}" alt="${t}-${s}" />
      </div>
      <div class="animal-modal-info">
        <p class="animal-species">${s}</p>
        <h2 class="animal-name">${t}</h2>
        <div class="age-gender-wrapper">
          <p class="animal-age">${a}</p>
          <p class="animal-gender">${o}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Опис:</h3>
          <p class="descriprion-text">${d}</p>
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
  `;r.animalDetailsBackdrop.innerHTML=p}function H(){r.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",window.removeEventListener("keydown",Y)}function Y(e){e.code==="Escape"&&H()}function ue(e){e.currentTarget===e.target&&H()}function N(e){e.focus();const n=e.querySelectorAll(`
    a[href],
    button:not([disabled]),
    textarea,
    input,
    select,
    [tabindex]:not([tabindex="-1"])
  `),s=n[0],a=n[n.length-1];e.addEventListener("keydown",o=>{o.key==="Tab"&&(o.shiftKey&&document.activeElement===s&&(o.preventDefault(),a.focus()),!o.shiftKey&&document.activeElement===a&&(o.preventDefault(),s.focus()))})}const G=document.querySelector(".header-burger-menu"),I=document.querySelector(".header-modal"),pe=document.querySelector(".modal-close-button");document.querySelector(".modal-navigation-item");const me=document.querySelector(".modal-navigation-list"),fe=document.querySelector(".modal-button");function B(e){I.classList.remove("is-open"),document.body.classList.remove("is-modal-open"),document.removeEventListener("keydown",Q),G.blur()}function Q(e){e.key==="Escape"&&B()}fe.addEventListener("click",B);G.addEventListener("click",e=>{e.preventDefault(),I.classList.add("is-open"),document.body.classList.add("is-modal-open"),document.addEventListener("keydown",Q),N(I)});pe.addEventListener("click",B);me.addEventListener("click",e=>{e.target.classList.contains("modal-navigation-link")&&B()});const ge="https://paw-hut.b.goit.study/api",q={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},$=z.create({baseURL:ge});async function ye(e=w.page){try{const t=typeof w.limit=="number"&&w.limit>0?w.limit:6,n=typeof e=="number"&&e>=1?e:1;return(await $.get(`${q.feedbacks}`,{params:{limit:t,page:n}})).data.feedbacks}catch{return null}}let R=ve(),i=O("page"),j,m=O("categoryId")??null;document.addEventListener("DOMContentLoaded",he);r.petsLoadMoreBtn.addEventListener("click",Le);r.categoryList.addEventListener("click",be);r.petsListPagination.addEventListener("click",we);r.petsList.addEventListener("click",Se);function ve(){return window.innerWidth>=1440?9:8}function U(){return Math.ceil(j/R)}async function he(e){C(),i=1,m=null,g("page",1),g("categoryId",null);try{const t=await Ee(),n=await x();qe(t),F(n),K(),k()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M()}}async function be(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;m=e.target.closest("li").dataset.id,i=1;let s;C(),r.categoryList.querySelectorAll(".category-btn").forEach(o=>{o.classList.remove("current")}),e.target.classList.add("current");try{t!=="Всі"?s=await _(m,i):s=await x(),F(s),k(),K(),r.petsList.querySelector("li").focus()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M(),g("categoryId",m),g("page",i)}}async function Le(){i+=1,r.loader.classList.add("loader-center"),C();try{if(m){k();const t=await _(m,i),n=D(t);r.petsList.insertAdjacentHTML("beforeend",n)}else{k();const t=await x(i),n=D(t);r.petsList.insertAdjacentHTML("beforeend",n)}const e=r.petsList.querySelector("li");if(e){const t=e.getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M(),g("page",i),r.loader.classList.remove("loader-center")}}async function we(e){const t=e.target.closest("button");if(!t)return;let n;r.loader.classList.add("loader-center"),C();const s=U();t.dataset.action==="prev"&&i>1&&(i-=1),t.dataset.action==="next"&&i<s&&(i+=1),t.dataset.page&&(i=Number(t.dataset.page));try{m?n=await _(m,i):n=await x(i),F(n),K(),window.scrollTo({top:r.petsList.offsetTop-80,behavior:"smooth"});const a=r.petsList.querySelector("li");a&&a.focus()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{M(),r.loader.classList.remove("loader-center"),g("page",i)}}function Se(e){const t=e.target.closest(".pets-button");if(!t)return;const n=t.closest("li");if(!n)return;const s=n.dataset.id;setLastFocusedElement(t),ce(s)}async function Ee(e){return(await $.get(`${q.categories}`)).data}async function x(e){const t=await $.get(`${q.animals}`,{params:{limit:R,page:e}});return j=t.data.totalItems,t.data.animals}async function _(e,t){const n=await $.get(`${q.animals}?categoryId=${e}`,{params:{limit:R,page:t}});return j=n.data.totalItems,n.data.animals}function ke(e){return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn" data-text="${e.name}" type="button">${e.name}</button>
      </li>`}function Be(e){return e.reverse().map(ke).join("")}function qe(e){const t=` <li class="category-item">
        <button class="category-btn current" type="button">Всі</button>
      </li>${Be(e)}`;r.categoryList.innerHTML=t}function $e({_id:e,name:t,image:n,species:s,age:a,gender:o,categories:d,description:l}){const c=d.map(p=>`<li class="pets-category-item">${p.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}" tabindex="0">
     <div class="pets-img-wrapper"><img class="pets-img" src="${n}" alt="${t} - ${s}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${s}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${c}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${a}</li>
              <li class="descriprion-item">${o}</li>
            </ul>
            <p class="pets-descriprion">${l}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function D(e){return e.map($e).join("")}function F(e){const t=D(e);r.petsList.innerHTML=t,g("animals",e)}function K(){const e=U();if(e<=1)return;let t="";if(t+=`<li>
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
  `}function C(){r.loader.classList.remove("loader-hidden")}function M(){r.loader.classList.add("loader-hidden")}function xe(){r.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function Ce(){r.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function k(){const e=U();i>=e?Ce():xe()}let S=null;function v(e){var d,l;let t=null,n=null;const s=(d=e==null?void 0:e.navigation)==null?void 0:d.prevEl,a=(l=e==null?void 0:e.navigation)==null?void 0:l.nextEl;s&&(t=Array.isArray(s)?s[0]:s),a&&(n=Array.isArray(a)?a[0]:a);const o=(e==null?void 0:e.el)||(e==null?void 0:e.$el)||null;if(o){const c=o.closest(".about-swiper-parent");c&&(t=t||c.querySelector(".about-swiper-button-prev"),n=n||c.querySelector(".about-swiper-button-next"))}if(t){const c=!!(e!=null&&e.isBeginning);t.disabled=c,t.classList.toggle("swiper-button-disabled",c),t.setAttribute("aria-disabled",c?"true":"false")}if(n){const c=!!(e!=null&&e.isEnd);n.disabled=c,n.classList.toggle("swiper-button-disabled",c),n.setAttribute("aria-disabled",c?"true":"false")}}function Me(){const e=document.querySelector(".mySwiper");if(!e)return null;if(e.swiper)try{e.swiper.destroy(!0,!0)}catch{}const t=e.closest(".about-swiper-parent");if(!t)return null;const n=t.querySelector(".about-swiper-button-next"),s=t.querySelector(".about-swiper-button-prev"),a=t.querySelector(".about-swiper-pagination"),o=new J(e,{modules:[oe,ae],loop:!1,wrapperClass:"about-swiper-wrapper",slideClass:"about-swiper-slide",pagination:{el:a,clickable:!0},slidesPerView:1,spaceBetween:0,breakpoints:{768:{slidesPerView:1}},on:{init(l){v(l)},slideChange(){v(o)}}}),d=(l,c,p)=>{if(!l)return;const L=l[c];if(L)try{l.removeEventListener("click",L)}catch{}l[c]=p,l.addEventListener("click",p)};return d(n,"_aboutUsNext",l=>{l.preventDefault(),o.slideNext(),v(o)}),d(s,"_aboutUsPrev",l=>{l.preventDefault(),o.slidePrev(),v(o)}),v(o),o}function W(){if(S){try{S.destroy(!0,!0)}catch{}S=null}S=Me()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",W):W();new se(".accordion-container",{showMultiple:!1,collapse:!0,duration:300,onOpen(e){const t=e.querySelector(".ac-panel");if(!t)return;const n=t.getBoundingClientRect();if(n.bottom>window.innerHeight){const s=n.bottom-window.innerHeight+20;window.scrollBy({top:s,behavior:"smooth"})}}});const Te=document.querySelectorAll(".faq-question-btn");Te.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-label",t?"Закрити відповідь":"Відкрити відповідь")})});function Ae(e){const t=document.querySelector(".swiper-wrapper"),n=e.map(({description:s,rate:a,author:o})=>`
        <div class="swiper-slide">
          <div class="star-rating" data-score="${a}"></div>     
            <p class="storie-text">${s}</p>
            <p class="storie-names">${o}</p>  
        </div>`).join("");t.insertAdjacentHTML("beforeend",n),document.querySelectorAll(".star-rating").forEach(s=>{new re(s,{starType:"svg",readOnly:!0}).init()})}const X=document.querySelector(".stories-loader"),Pe=document.querySelector(".swiper-controls");function A(e){h.info({message:e,position:"topRight",color:"#f2aaaaff",icon:!1,progressBar:!1,messageColor:"black"})}function E(){X.classList.remove("loader")}function Ie(){X.classList.add("loader")}function De(){Pe.classList.remove("visually-hidden")}window.addEventListener("DOMContentLoaded",async()=>{Ie();try{let e=await ye();if(e===null){A("Не вдалося завантажити історії. Спробуйте пізніше"),E();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Не вдалося завантажити історії</p>');return}if(e.length===0){A("Нажаль, історії зараз недоступні"),E();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>');return}Ae(e);const t=new J(".swiper",{direction:"horizontal",loop:!1,speed:400,spaceBetween:32,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!1},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:2}}});De(),E()}catch{A("Cталась помилка. Спробуйте пізніше");const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>'),E()}});let Z;const f=document.getElementById("order-form"),b=document.getElementById("modal-order"),Oe=b.querySelector(".modal-close-btn");window.addEventListener("open-order-modal",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.animalId;if(!t)return;Z=t,r&&r.animalDetailsBackdrop&&r.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",b.classList.remove("visually-hidden"),document.body.classList.add("modal-open"),window.addEventListener("keydown",ee);const n=document.querySelector(".modal-order");N(n)});function T(){b.classList.add("visually-hidden"),document.body.classList.remove("modal-open"),window.removeEventListener("keydown",ee)}function ee(e){e.key==="Escape"&&T()}function He(e){e.target===b&&T()}Oe.addEventListener("click",T);b.addEventListener("click",He);f.addEventListener("submit",async e=>{e.preventDefault();const{name:t,phone:n,comments:s}=e.target.elements,a=t.value.trim();let o=n.value.trim();const d=s.value.trim(),l=f.querySelectorAll(".input-error"),c=f.querySelectorAll(".error-text");if(l.forEach(u=>u.classList.remove("input-error")),c.forEach(u=>u.textContent=""),a.length>32){const u=f.querySelector('.modal-form-input[type="text"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Ім'я не повинно перевищувати 32 символи.";return}const p=/^[0-9]{12}$/;if(o[0]==="+"&&(o=o.slice(1)),o.length!==12){const u=f.querySelector('.modal-form-input[type="tel"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Телефон повинен містити 12 цифр.";return}if(!p.test(o)){const u=f.querySelector('.modal-form-input[type="tel"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Телефон повинен містити лише цифри.";return}if(d.length>255){const u=f.querySelector(".modal-form-textarea");u.classList.add("input-error"),u.nextElementSibling.textContent="Коментар не повинен перевищувати 255 символів.";return}const L={name:a,phone:o,animalId:Z,comment:d.length>0?d:"Без коментарів"};try{const te=(await z.post("https://paw-hut.b.goit.study/api/orders",L)).data;return T(),V.fire({title:"Дякуємо за вашу заявку!",icon:"success",confirmButtonText:"Закрити"}).then(()=>{const ne=le()}),e.target.reset(),te}catch(u){V.fire({title:"Помилка!",text:"Сталася помилка при надсиланні заявки. Спробуйте ще раз пізніше.",icon:"error",confirmButtonText:"Закрити"}),console.error("Error submitting order:",u)}});function Ne(){const e=document.getElementById("scrollTopBtn"),t=document.querySelector("#hero");if(!e||!t)return;const n=t.offsetHeight;window.addEventListener("scroll",()=>{window.scrollY>n?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Ne);
//# sourceMappingURL=index.js.map
