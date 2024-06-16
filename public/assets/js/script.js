document.addEventListener("DOMContentLoaded", function () {
    // Ip Public User 

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById("ip-set").textContent = ` ${data.ip}`;
        console.log('IP Public:', data.ip);
        // Anda bisa menggunakan data.ip sesuai kebutuhan Anda
    })
    .catch(error => {
        console.error('Error:', error);
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
    
    // Jumlah Film [Daftar Film]

    const listFilm = document.querySelectorAll(".list-film")[2];
    const marginRightListFilm = parseFloat(window.getComputedStyle(listFilm).marginRight);
    const marginLeftListFilm = parseFloat(window.getComputedStyle(listFilm).marginLeft);
    const margin = marginRightListFilm + marginLeftListFilm;
    const daftarFilm = document.getElementById("film-wrap");
    const totalFilm = daftarFilm.childElementCount;
    const widthlistFilm = daftarFilm.clientWidth / 5;
    let maxFilm = 5;
    let totalNewFilm = totalFilm - maxFilm;
    if (totalFilm > 5) {
        daftarFilm.style.width = `calc(100% + ${widthlistFilm}px * ${totalNewFilm} `;
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
            } else {
                isTransitioning = true;
                element.style.transform = `translateX(${transformValue + widthlistFilm}px)`;
    
                element.addEventListener('transitionend', () => {
                    isTransitioning = false;
                }, { once: true });
            }
        });
    });
    
})