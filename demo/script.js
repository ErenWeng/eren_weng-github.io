window.onload = function() {
  let navTopTrigger = document.querySelector('#mobile-nav-top-trigger');
  let navTop = document.querySelector('#mobile-nav-top');

  navTopTrigger.addEventListener('click', () => {
      if(navTopTrigger.classList.contains('active')) {
          navTopTrigger.classList.remove('active')
          navTop.classList.remove('open')
      } else {
          navTopTrigger.classList.add('active')
          navTop.classList.add('open')
      }
  });

  let navBtnTrigger = document.querySelector('#mobile-nav-btn-trigger');
  let navBtn = document.querySelector('#mobile-nav-btn');

  navBtnTrigger.addEventListener('click', () => {
    if(navBtnTrigger.classList.contains('active')) {
        navBtnTrigger.classList.remove('active')
        navBtn.classList.remove('open')
    } else {
        navBtnTrigger.classList.add('active')
        navBtn.classList.add('open')
    }
  });

  let call = document.querySelector('.fixed_call')
  let change = document.querySelector('.fixed_call_change')

  call.addEventListener('click', () => {
    change.style.width = "280px";
    change.style.height = "215px";
    change.style.zIndex = "2";
    change.style.borderRadius = "1%";
    change.style.transition = ".3s";
    change.style.opacity = "1";
    fixed_info.style.opacity = "1";
  })

  let closeInfo = document.querySelector('#info_close')
  let fixed_info = document.querySelector('.fixed_info')

  closeInfo.addEventListener('click', () => {
    fixed_info.style.opacity = "0";
    change.style.height = "80px";
    window.setTimeout(( () => {
        change.style.width = "80px";
        change.style.zIndex = "0";
        change.style.borderRadius = "50%";
        change.style.transition = ".3s";
        call.style.opacity = "1";
    } ), 100);
  })

  let toTop = document.querySelector('.to_top')

    window.onscroll = function scroll(){
        let y = window.pageYOffset;
        if (y > 300){
            toTop.style.display = "flex";
        }else{
            toTop.style.display = "none";
        }
    }

    toTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
};
