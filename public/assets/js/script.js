    document.addEventListener("DOMContentLoaded", function () {
        // Ip Public User 

        fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("ip-set").textContent = ` ${data.ip}`;
        })
        .catch(error => {
            error;
        });
        
        //  Media Device Change [START]
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent) || /ipad|iPhone|iPad/.test(userAgent) && !window.MSStream) {
            document.body.classList.add("mobile-view");
        } else if (window.matchMedia("(max-width: 992px)").matches) {
            document.body.classList.add("mobile-view");
        } else {
            document.body.classList.remove("mobile-view");
        }
        //  Media Device Change [END]
        
        // Hamburger Menu Button [START]
        document.getElementById("hamburger-btn").addEventListener("click", function() {
            document.querySelector("header").classList.toggle("see-all-header")
            document.querySelector(".header-button").classList.toggle("see-all-margin")
        })
        // Hamburger Menu Button [END]
        
        // Tombol Filter Kategori [START]

        const genresSelect = document.getElementById("genres-select")
        genresSelect.addEventListener("change", function () {
            const selectedOption = genresSelect.options[genresSelect.selectedIndex];
            const selectedGenre = selectedOption.getAttribute('data-genres');
            if (selectedGenre === "sedang-tayang") {
                document.querySelector(".text-filter").textContent = "Sedang Tayang";
            } else if (selectedGenre === "segera-tayang") {
                document.querySelector(".text-filter").textContent = "Segera Tayang";
            } else {
                document.querySelector(".text-filter").textContent = "Populer";
            }
        });

        // Tombol Filter Kategori [END]

        // Form Login/Registrasi/Lupa Password [START]

        document.getElementById("login-btn").addEventListener("click", function() {
            document.querySelector(".login").classList.add("see-all-header")
            document.querySelector(".form-wrap").classList.add("see-all-transform")
        })

        const formWrap = document.querySelector(".form-wrap");
        const loginWrap = document.querySelector(".login");
        
        document.getElementById("close-btn").addEventListener("click", function() {
            document.querySelector(".login").classList.remove("see-all-header")
            document.querySelector(".form-wrap").classList.remove("see-all-transform")
            setTimeout(() => {
                loginWrap.classList.remove("registrasi");
                formWrap.classList.remove("registrasi-wrap");
                formWrap.classList.remove("lupa-pswd");
                formWrap.classList.remove("lupa-pswd-wrap");
            }, 300)
        })

        const buttonChange = document.querySelectorAll(".change-btn");
        
        buttonChange.forEach(element => {
            element.addEventListener("click", function () {
                const dataCheck = element.getAttribute('data-btn')
                if (dataCheck === "login") {
                    formWrap.classList.remove("see-all-transform");
                    setTimeout(() => {
                        formWrap.classList.add("see-all-transform");
                    }, 400)
                    setTimeout(() => {
                        loginWrap.classList.remove("registrasi");
                        formWrap.classList.remove("registrasi-wrap");
                        loginWrap.classList.remove("lupa-pswd");
                        formWrap.classList.remove("lupa-pswd-wrap");
                    }, 200)
                } else if (dataCheck === "registrasi") {
                    formWrap.classList.remove("see-all-transform");
                    setTimeout(() => {
                        formWrap.classList.add("see-all-transform");
                    }, 400)
                    
                    setTimeout(() => {
                        loginWrap.classList.add("registrasi");
                        formWrap.classList.add("registrasi-wrap");
                        loginWrap.classList.remove("lupa-pswd");
                        formWrap.classList.remove("lupa-pswd-wrap");
                    }, 100)
                } else if (dataCheck === "lupa-pswd") {
                    formWrap.classList.remove("see-all-transform");
                    setTimeout(() => {
                        formWrap.classList.add("see-all-transform");
                    }, 400)
                    
                    setTimeout(() => {
                        loginWrap.classList.add("lupa-pswd");
                        formWrap.classList.add("lupa-pswd-wrap");
                    }, 100)
                } 
            });
        });
        // Form Login/Registrasi/Lupa Password [END]

        // Hide / Show Password Button [START]
        const buttonPassword = document.querySelectorAll(".hide-pswd");
        
        buttonPassword.forEach(element => {
            element.addEventListener("click", function () {
                const input = this.closest('.flex').querySelector('input.password');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                element.classList.toggle("see-all-margin-100")
                input.setAttribute('type', type);   
                
            })
        })
        // Hide / Show Password Button [END]

        // Shift Button [Daftar Film]
        const postPrevBtn = document.getElementById("poster-prev-btn");
        const postNextBtn = document.getElementById("poster-next-btn");
        
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
                } 

                isTransitioning = true;
                element.style.transform = `translateX(${transformValue + widthlistFilm}px)`;
                element.addEventListener('transitionend', () => {
                    isTransitioning = false;
                }, { once: true });
            });
        });
        
        // Pesan Button OK [Start] 
        const popup = document.querySelector(".popup")
        const popupOkBtn = document.querySelectorAll(".popup-ok-btn");
        const popupCategory = document.querySelectorAll(".popup-category");
        popupOkBtn.forEach(element => {
            element.addEventListener("click", function () {
                popupCategory.forEach(element2 => {
                    if (!element2.classList.contains("hidden")) {
                        element2.classList.add("hidden");
                        popup.style.height = "0";
                        console.log("xexe");
                    }
                })
            })
        })
        // Pesan Button OK [END] 

        // Pesan Button [Start] 
        const pesan = document.getElementById("pesan-btn");
        pesan.addEventListener("click", function () {
            const popupEvent = document.querySelector(".popup-info");
            const popupText = document.querySelector(".popup-info .popup-span");
            console.log(popupText);
            if(0) {
                // Jika Sudah Login
            } else {
                popup.style.height = "100%";
                popupEvent.classList.remove("hidden");
                popupText.textContent = "Anda Belum Login, Silahkan Login Terlebih Dahulu !";
            }
        })        
        // Pesan Button [END]

        // Cart Button [Start] 
        const cart = document.getElementById("cart-btn");
        cart.addEventListener("click", function () {
            const popupEvent = document.querySelector(".popup-cross");
            const popupText = document.querySelector(".popup-cross .popup-span");
            if(0) {
                // Jika Sudah Login
            } else {
                popup.style.height = "100%";
                popupEvent.classList.remove("hidden");
                popupText.textContent = "Anda Belum Login, Silahkan Login Terlebih Dahulu !";
            }
        })        
        // Pesan Button [END] 
        
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
        } else {
            if (totalFilm > 5) {
                daftarFilm.style.width = `calc(${widthDaftarScroll}px + (${widthlistFilm}px * ${totalNewFilm}))`;
            } 
        }
    })