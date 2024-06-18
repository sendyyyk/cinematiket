document.addEventListener("DOMContentLoaded", function () {
    // Ip Public User 

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById("ip-set").textContent = ` ${data.ip}`;
    })
    .catch(error => {
        error;
        document.getElementById("ip-set").textContent = `anda sedang offline | ${error}`;
    });

    //  Media Device Change
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) || /ipad|iPhone|iPad/.test(userAgent) && !window.MSStream) {
        document.body.classList.add("mobile-view");
    } else if (window.matchMedia("(max-width: 992px)").matches) {
        document.body.classList.add("mobile-view");
    } else {
        document.body.classList.remove("mobile-view");
    }

    // Hamburger Menu Button
    document.getElementById("hamburger-btn").addEventListener("click", function() {
        document.querySelector("header").classList.toggle("see-all-header")
        document.querySelector(".header-button").classList.toggle("see-all-margin")
    })

    document.getElementById("login-btn").addEventListener("click", function() {
        document.querySelector(".login").classList.add("see-all-header")
        document.querySelector(".form-wrap").classList.add("see-all-transform")
    })

    document.getElementById("close-btn").addEventListener("click", function() {
        document.querySelector(".login").classList.remove("see-all-header")
        document.querySelector(".form-wrap").classList.remove("see-all-transform")
    })

    // Jumlah Film [Daftar Film]

    const listFilm = document.querySelectorAll(".list-film");
    const widthDaftarScroll = parseFloat(window.getComputedStyle(document.getElementById("display-scroll")).width);
    const heightDaftarScroll = parseFloat(window.getComputedStyle(document.getElementById("display-scroll")).height);
    const daftarFilm = document.getElementById("film-wrap");
    const totalFilm = daftarFilm.childElementCount;
    const widthlistFilm = daftarFilm.clientWidth / 5;
    const heightlistFilm = daftarFilm.clientHeight / 1;
    let maxFilm = 5;
    let maxFilmMobile = 2;
    let totalNewFilm = totalFilm - maxFilm;
    if (document.body.classList.contains("mobile-view")) {
        if (totalFilm > 2) {
            let heightFilm = 0;
            if (totalFilm % maxFilmMobile === 1) {
                heightFilm = (heightDaftarScroll + heightlistFilm) * (Math.floor(totalFilm / 2 / maxFilmMobile));
            } else {
                heightFilm = (heightDaftarScroll + heightlistFilm) * (totalFilm / 2 / maxFilmMobile - 1);
            }
            daftarFilm.style.height = `${heightFilm}px`;
            let index = 0;
            let indexS = 0;
            for (let i = 0; i <= totalFilm; i++) {
                if (i == 0) {
                    listFilm[i].style.left = 0;
                    listFilm[i].style.top = `${heightlistFilm * 0}px`;
                } else if (i % 2 == 1) {
                    listFilm[i].style.right = 0;
                    listFilm[i].style.top = `${heightlistFilm * index}px`;
                    index++;
                    indexS = index;
                } 
                else {
                    listFilm[i].style.left = 0;
                    listFilm[i].style.top = `${heightlistFilm * indexS}px`;
                }
            }
        }


    } else {
        if (totalFilm > 5) {
            daftarFilm.style.width = `calc(${widthDaftarScroll}px + (${widthlistFilm}px * ${totalNewFilm})`;
        } 
    }

    // Shift Button [Daftar Film]
    const postPrevBtn = document.getElementById("poster-prev-btn");
    const postNextBtn = document.getElementById("poster-next-btn");
    
    document.querySelectorAll(".shift-btn").forEach(function (element) {
        if (element.hasAttribute('disabled')) {
            console.log("xxx");
        }
    })
    
    let isTransitioning = false;

    postNextBtn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (isTransitioning) return;

        document.querySelectorAll(".list-film").forEach(element => {
            let transformValue = parseFloat(window.getComputedStyle(element).transform.split('(')[1].split(')')[0].split(',')[4]);
            if (parseInt(transformValue) === parseInt(-widthlistFilm * totalNewFilm)) {
                return;
            }

            isTransitioning = true;
            console.log(transformValue, widthlistFilm);
            element.style.transform = `translateX(${transformValue - widthlistFilm}px)`;

            element.addEventListener('transitionend', () => {
                isTransitioning = false;
            }, { once: true });
        });
    });
    
    postPrevBtn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
    
        if (isTransitioning) return;
    
        document.querySelectorAll(".list-film").forEach(element => {
            let transformValue = parseFloat(window.getComputedStyle(element).transform.split('(')[1].split(')')[0].split(',')[4]);
            if (transformValue === 0) {
                return;
            } 

            isTransitioning = true;
            console.log(widthlistFilm);
            element.style.transform = `translateX(${transformValue + widthlistFilm}px)`;
            element.addEventListener('transitionend', () => {
                isTransitioning = false;
            }, { once: true });
        });
    });
    
})