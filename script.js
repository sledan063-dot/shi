/* =========================================================
   script.js — index.html 전용
   ---------------------------------------------------------
   변경점 (모달 → 상세 페이지 방식):
   - setupModal() 제거
   - 카드 클릭 시 project.html?id=... 으로 이동
   - 버튼 제거, 카드 전체(<a>)가 클릭 영역
   - 호버 시 제목 오버레이 표시는 CSS가 담당
   ========================================================= */


/* ---------------------------------------------------------
   projects.json 불러오기
--------------------------------------------------------- */

/* ---------------------------------------------------------
   카드 렌더링
   ---------------------------------------------------------
   변경 전: <img> + <h3> + <button>
   변경 후: <a href="project.html?id=..."> 로 전체를 감싸고
            <img> + <div class="card-overlay"><h3></div>
            버튼은 없음. 카드 전체가 링크.
--------------------------------------------------------- */
function renderProjects(projects) {
  const list = document.querySelector('#project-list');
  list.innerHTML = `<div class="journey-list"></div>`;
  const journeyList = list.querySelector('.journey-list');

  projects.forEach(function(project) {
    const item = document.createElement('div');
    item.className = 'journey-item';
    item.innerHTML = `
      <img class="journey-img" src="${project.thumbnail}" alt="${project.title}">
      <div class="journey-text">${project.title}</div>
      <button class="pro-btn">상세보기</button>
    `;
    item.addEventListener('click', () => {
      const modal = document.querySelector('.project-modal');
      modal.querySelector('.modal-img').src = project.thumbnail;
      modal.querySelector('.modal-title').textContent = project.title;
      modal.querySelector('.modal-desc').textContent = project.description;
      modal.classList.add('active');
    });
    journeyList.appendChild(item);
  });
}



/* ---------------------------------------------------------
   스크롤 — 네비게이션 / TOP 버튼
--------------------------------------------------------- */
const navbar = document.querySelector('#navbar');
const topBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    topBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    topBtn.classList.remove('visible');
  }
});


/* ---------------------------------------------------------
   커스텀 마우스 커서
--------------------------------------------------------- */
const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', function (e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

const projectsSection = document.querySelector('#projects');

projectsSection.addEventListener('mouseover', function (e) {
  if (e.target.closest('#project-list li')) {
    cursor.style.transform = 'translate(-50%, -50%) scale(3)';
    cursor.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
  }
});

projectsSection.addEventListener('mouseout', function (e) {
  if (e.target.closest('#project-list li')) {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = '#007bff';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('detail-modal');
  const closeBtn = document.querySelector('.close-modal');
  const items = document.querySelectorAll('.journey-item');

  //关闭×按钮
  closeBtn.onclick = ()=>{
    modal.style.display = "none";
    clearAllPortrait();}
    //点击黑色遮罩空白关闭
    modal.onclick = (e)=>{
      if(e.target === modal){
        modal.style.display = "none";
        clearAllPortrait();
      }
    }
    //清除竖图class
    function clearAllPortrait(){
      document.getElementById('modal-img').classList.remove('portrait');
      document.getElementById('modal-img2').classList.remove('portrait');
    }

  items.forEach((item, index) => {
    const btn = item.querySelector('.detail-btn');
    const openFunc = (e) => {
      e.stopPropagation();
    
      if(index === 0) {
        document.getElementById('modal-img').src = 'images/project001/test1.jpg';
        document.getElementById('modal-title').textContent = '사진  촬영';
        document.getElementById('modal-img2').src = 'images/project001/test11.jpg';
        document.getElementById('modal-desc').textContent = '사진 찍기는 제 일상에서 가장 소중한 취미이자, 주변의 아름다움을 기록하는 가장 좋은 방법입니다. 눈으로만 보고 지나치면 금방 잊을 수 있는 풍경과 순간들을 카메라에 담아두면, 영원히 간직하고 나중에 다시 볼 수 있다는 점이 정말 매력적입니다. 바쁜 일상에 치여 살면서 놓치기 쉬운 작은 아름다움을 찾아내는 과정 자체가 큰 즐거움이고, 마음을 차분하게 해주는 힐링이 되기도 합니다.길을 걷다가 우연히 본 예쁜 하늘, 고즈넉한 건축물, 따뜻한 일상의 풍경, 심지어 작은 꽃과 나무까지 모두 사진의 주제가 됩니다. 특별한 장소나 멋진 풍경이 아니어도, 일상 속 평범한 모습에서 의미를 찾고 사진으로 기록하면, 그 순간이 특별한 추억으로 변합니다. 사진 찍기를 통해 세상을 더 자세히 보게 되고, 작은 행복들을 많이 발견하면서 일상이 더 풍요로워지는 것을 느낍니다. 단순히 사진을 찍는 행위를 넘어, 자신의 시각으로 세상을 담아내는 특별한 과정이라고 생각합니다.';
       modal.style.display = 'block';
       }
      
  
   if (index === 1) {
      document.getElementById('modal-img').src = 'images/project002/test2.jpg';
      document.getElementById('modal-img2').src = 'images/project002/test22.jpg';
      document.getElementById('modal-title').textContent = '베이킹 케이크';
      document.getElementById('modal-desc').textContent = '베이킹은 제 일상에서 빼놓을 수 없는 소소한 즐거움입니다. 바쁜 일과나 공부에 지칠 때, 주방에서 재료를 준비하고 반죽을 만드는 시간은 마음을 차분하게 해주는 힐링 타임이에요. 밀가루, 계란, 우유, 설탕 같은 평범한 재료들을 섞고, 오븐에 넣어 익히는 과정 하나하나가 모두 의미 있고, 기다리는 동안 집 가득 퍼지는 달콤한 향기만으로도 행복이 가득해집니다.혼자서 조용히 베이킹을 하면서 생각을 정리할 수도 있고, 가족이나 친구들과 함께 만들고 나눠 먹을 때 더욱 큰 즐거움을 느낍니다. 완성된 디저트를 보면 뿌듯함이 느껴지고, 실패해도 다시 도전하면서 조금씩 실력이 늘어가는 모습을 보며 성취감도 얻을 수 있습니다. 베이킹은 단순히 음식을 만드는 것이 아니라, 일상에 달콤한 기쁨을 더하고 마음을 채워주는 특별한 취미라고 생각합니다.';
      document.getElementById('modal-img').classList.remove('portrait');
      document.getElementById('modal-img2').classList.remove('portrait');
      modal.style.display = 'block';
      }
  
    if (index === 2) {
       document.getElementById('modal-img').src = 'images/project003/test3.jpg';
       document.getElementById('modal-img2').src = 'images/project003/test33.jpg';
       document.getElementById('modal-img').classList.add('portrait');
       document.getElementById('modal-img2').classList.add('portrait');
       document.getElementById('modal-title').textContent = '여행 사진';
       document.getElementById('modal-desc').textContent = '저는 여행을 다니면서 좋은 풍경과 기억에 남는 순간들을 사진으로 찍어 기록하는 것을 정말 좋아합니다. 평소에 접하기 힘든 전통적인 풍경, 독특한 분위기, 현지 사람들의 일상적인 모습까지, 눈으로 보고 마음으로 느낀 것들을 카메라에 담아 두면, 나중에 사진을 볼 때마다 그때의 느낌이 생생하게 떠오릅니다. 이렇게 사진으로 추억을 남기는 것은 여행의 즐거움을 두 배로 만들어 주는 것 같습니다.이 사진은 제가 고대 마을 여행을 할 때 가장 인상 깊었던 순간에 찍은 것입니다. 해가 지고 조금씩 어두워지면서 가로등에 불이 켜지고, 붉은 천이 고풍스러운 건축물과 어우러져 따뜻하고 아늑한 분위기가 느껴졌습니다. 이 모습이 너무 아름다워 바로 카메라를 꺼내 찍었고, 지금까지도 제가 가장 아끼는 여행 사진 중 하나입니다. 앞으로도 다양한 곳에 여행 가서, 많은 풍경과 추억을 사진으로 기록하고 이곳에 공유할 예정입니다. 여행을 통해 만난 모든 것들이 제 삶에 작은 즐거움을 더해 주고, 세상을 더 넓게 볼 수 있게 해 줍니다.';
       modal.style.display = 'block';
        }

    if (index === 3) {
       document.getElementById('modal-img').src = 'images/project004/project4-thumnail.jpg';
       document.getElementById('modal-img2').src = 'images/project004/test4.jpg';
       document.getElementById('modal-img').classList.add('portrait');
       document.getElementById('modal-img2').classList.add('portrait');
       document.getElementById('modal-title').textContent = '맛집 탐방';
       document.getElementById('modal-desc').textContent = '평소 여유로운 시간이 생기면 다양한 맛집과 카페를 찾아가는 것이 저의 큰 취미 중 하나입니다. 이 사진에는 제가 직접 방문한 여러 곳의 음식들을 담았습니다.한국식 찌개와 국수, 부드러운 스테이크, 돈까스 파스타, 서양식 브런치부터 달콤한 딸기 디저트, 시원한 음료까지 정말 다양한 메뉴를 경험했습니다. 각 식당마다 분위기가 다르고 맛과 플레이팅에도 개성이 있어 방문하는 재미가 큽니다.베이킹을 좋아하는 저는 특히 디저트와 음식의 맛, 모습에 더욱 관심을 가집니다. 직접 먹어보며 느낀 솔직한 맛 평가와 매장의 분위기, 식사하면서 느낀 여유로운 순간들을 모두 기록하고 있습니다.바쁜 학업과 일상 속에서 맛있는 음식을 먹으며 잠시 휴식을 취하는 시간은 스트레스를 풀어주고, 다시 일상에 힘을 내는 원동력이 됩니다. 앞으로도 더 많은 맛집을 찾아다니며 새로운 음식을 경험하고, 이곳에 꾸준히 기록을 남길 예정입니다.';
       modal.style.display = 'block';
        }
}
  btn.addEventListener('click', openFunc);
  })
     
  });

  // 全局关闭弹窗+清除竖图样式
  function clearAllPortrait(){
    document.getElementById('modal-img').classList.remove('portrait');
    document.getElementById('modal-img2').classList.remove('portrait');
  }
  
const loader = document.getElementById('scrollLoader');
const dots = loader.querySelectorAll('span');
let lastScrollY = window.scrollY;
let rotation = 0;
window.addEventListener('scroll', function() {
const delta = window.scrollY - lastScrollY;
lastScrollY = window.scrollY;
rotation += delta * 0.2;
loader.style.transform = 'rotate(' + rotation + 'deg)';
});