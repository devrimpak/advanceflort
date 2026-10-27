// --- 1. Şifre Kontrolü ---
function checkPassword() {
    const pass = document.getElementById("password-input").value.toLowerCase().trim();
    if (pass === "advanceflort" || pass === "advanceflört" || pass === "advance flört" || pass === "advenceflört" || pass === "advenceflort") {
        nextScreen(3); // Şifreden sonra Karşılama (3. Ekran)
    } else {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.style.display = "block";
        setTimeout(() => { errorMsg.style.display = "none"; }, 3000);
    }
}

function nextScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenNumber}`).classList.add('active');
    
    // Fonksiyonların tetiklendiği yerler
    if (screenNumber === 5 && !milestonesInitialized) initMilestones();
    if (screenNumber === 6 && !galleryInitialized) initGallery(); // Yeni galeri tetikleyicisi
    if (screenNumber === 7 && !daisyInitialized) initDaisy();
}

function prevScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenNumber}`).classList.add('active');
}

// --- 2. KAYDIRMALI ÖZEL GÜNLER SAYACI (YENİ) ---
const milestones = [
    { 
        dateObj: new Date(2026, 7, 19),
        dateStr: "19 Ağustos 2026",
        title: "Her Şey Burada Başladı", 
        desc: "Gündür Hayatımdasın, Hayatımsın...." 
    },
    { 
        dateObj: new Date(2026, 8, 2),
        dateStr: "02 Eylül 2026",
        title: "İlk 'Seni Seviyorum' Dediğimiz An", 
        desc: "gündür en çok kullandığım kelimeler..." 
    },
    { 
        dateObj: new Date(2026, 8, 8),
        dateStr: "8 Eylül 2026",
        title: "İlk Yüz Yüze Geliş", 
        desc: "Utanıp yüzünü çevirmen hala aklımda..." 
    },
    { 
        dateObj: new Date(2026, 8, 9),
        dateStr: "9 Eylül 2026",
        title: "İlk Sohbet", 
        desc: "Sigaran Var Mı ? :')))" 
    },
    { 
        dateObj: new Date(2026, 8, 10),
        dateStr: "10 Eylül 2026",
        title: "İlk Buluşma", 
        desc: "İlk sarılış, Mükemmel bi kahvaltı ve 'Oh Demiştiiiimm'" 
    },
    { 
        dateObj: new Date(2026, 8, 14),
        dateStr: "14 Eylül 2026",
        title: "İlk Öpücük", 
        desc: "Hala her öpücükte o gün gibi heyecanlanıyorum..." 
    },
    { 
        dateObj: new Date(2026, 8, 21),
        dateStr: "21 Eylül 2026",
        title: "İlk Aşkım Diyişin", 
        desc: "O utanıp kızarmış halini hatırlıyor musun ?" 
    }

];

let currentMilestoneIndex = 0;
let milestonesInitialized = false;

function initMilestones() {
    const dotsContainer = document.getElementById("milestone-dots");
    milestones.forEach(() => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dotsContainer.appendChild(dot);
    });
    updateMilestoneSlider();
    milestonesInitialized = true;
}

function updateMilestoneSlider() {
    const titleEl = document.getElementById("milestone-title");
    const dateEl = document.getElementById("milestone-date");
    const counterEl = document.getElementById("milestone-counter");
    const descEl = document.getElementById("milestone-desc");
    const dots = document.getElementById("milestone-dots").querySelectorAll(".dot");
    
    const currentM = milestones[currentMilestoneIndex];
    
    // Yazılar değişirken yumuşak geçiş efekti (Fade out)
    titleEl.style.opacity = 0;
    dateEl.style.opacity = 0;
    counterEl.style.opacity = 0;
    descEl.style.opacity = 0;
    
    setTimeout(() => {
        titleEl.innerText = currentM.title;
        dateEl.innerText = currentM.dateStr;
        descEl.innerText = currentM.desc;
        
        // Günü dinamik olarak yeniden hesapla
        const today = new Date();
        const diffTime = Math.abs(today - currentM.dateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        counterEl.innerText = diffDays;
        
        // (Fade in)
        titleEl.style.opacity = 1;
        dateEl.style.opacity = 1;
        counterEl.style.opacity = 1;
        descEl.style.opacity = 1;
        
        // Noktaları güncelle
        dots.forEach(d => d.classList.remove("active"));
        dots[currentMilestoneIndex].classList.add("active");
    }, 300);
}

function changeMilestone(dir) {
    currentMilestoneIndex += dir;
    if (currentMilestoneIndex < 0) currentMilestoneIndex = milestones.length - 1;
    if (currentMilestoneIndex >= milestones.length) currentMilestoneIndex = 0;
    updateMilestoneSlider();
}

// --- 3. DİNAMİK FOTOĞRAF GALERİSİ ---
const anilar = [
    { src: "assets/img/photo_1.jpg", caption: "İlk Fotoğraf..." },
    { src: "assets/img/photo_2.jpg", caption: "Kaştaki Tatlış Fotomuz..." },
    { src: "assets/img/photo_3.jpg", caption: "Sorgulayıcı ama Aşık olmuş bakışın..." },
    { src: "assets/img/photo_4.jpg", caption: "APTALOOZ TABSANNN..." },
    { src: "assets/img/photo_5.jpg", caption: "Advance Flört olduğumuz zamanlardan :')" },
    { src: "assets/img/photo_6.jpg", caption: "İlk Rakımız..." },
    { src: "assets/img/photo_7.jpg", caption: "Ablan Gelecek Telaşı..." },
    { src: "assets/img/photo_8.jpg", caption: "Sega..." },
    { src: "assets/img/photo_9.jpg", caption: "Ahhh İlk Konserimiz... İlk Storymiz..." },
    { src: "assets/img/photo_10.jpg", caption: "Bir Şey Diyim mi ? BAYA İYİYİZZZ" },
    { src: "assets/img/photo_11.jpg", caption: "Couple Kombin..." },
    { src: "assets/img/photo_12.jpg", caption: "Gözlerine Aşık Olduğum Kadın..." },
    { src: "assets/img/photo_13.jpg", caption: "ve kapanışı... her fotoğrafın çok güzel olsa da bu benim için ayrı bi yerde... çok güzel, çok tatlı..." },
    

];
    // Yeni fotoğraf eklemek için alttaki satırı çoğaltabilirsiniz:
    // { src: "assets/img/baska_foto.png", caption: "Yeni anı açıklaması..." }

let currentPhotoIndex = 0;
let galleryInitialized = false;

function initGallery() {
    const dotsContainer = document.getElementById("slider-dots");
    dotsContainer.innerHTML = ""; // Her ihtimale karşı içi temizlenir
    
    anilar.forEach(() => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dotsContainer.appendChild(dot);
    });
    
    updateSlider();
    galleryInitialized = true;
}
function updateSlider() {
    const imgElement = document.getElementById("slider-img");
    const captionElement = document.getElementById("slider-caption");
    const dots = document.getElementById("slider-dots").querySelectorAll(".dot");
    
    // Beyaz çerçeveyi (polaroid arka planını) seçiyoruz
    const photoFrame = document.querySelector(".photo-frame");
    
    imgElement.style.transition = "opacity 0.3s ease";
    captionElement.style.transition = "opacity 0.3s ease";
    
    // Geçiş efekti için önce gizle
    imgElement.style.opacity = 0;
    captionElement.style.opacity = 0;
    
    setTimeout(() => {
        // Görseli ve yazıyı değiştir
        imgElement.src = anilar[currentPhotoIndex].src;
        captionElement.innerText = anilar[currentPhotoIndex].caption;
        
        // --- ÇERÇEVE DÖNDÜRME EFEKTİ ---
        if (currentPhotoIndex % 2 === 0) {
            photoFrame.style.transform = "rotate(-2deg)";
        } else {
            photoFrame.style.transform = "rotate(2deg)";
        }
        
        // Veri yüklendikten sonra tekrar yavaşça göster
        imgElement.style.opacity = 1;
        captionElement.style.opacity = 1;
        
        // Noktaları güncelle
        dots.forEach(d => d.classList.remove("active"));
        if (dots.length > 0) {
            dots[currentPhotoIndex].classList.add("active");
        }
    }, 300);
}

function changePhoto(dir) {
    currentPhotoIndex += dir;
    if (currentPhotoIndex < 0) currentPhotoIndex = anilar.length - 1;
    if (currentPhotoIndex >= anilar.length) currentPhotoIndex = 0;
    updateSlider();
}

// --- 4. PAPATYA FALI OYUNU ---
let daisyInitialized = false;
let plucks = 0;
const totalPetals = 11; 

function initDaisy() {
    const daisy = document.getElementById("daisy");
    
    for (let i = 0; i < totalPetals; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        
        const rotation = i * (360 / totalPetals);
        petal.style.transform = `rotate(${rotation}deg)`;
        
        petal.onclick = function() {
            if (!this.classList.contains("plucked")) {
                this.classList.add("plucked");
                plucks++;
                
                const resultText = document.getElementById("daisy-result");
                
                if (plucks % 2 !== 0) {
                    resultText.innerText = "Seviyor 🤍";
                    resultText.style.color = "var(--text-main)";
                } else {
                    resultText.innerText = "Sevmiyor...";
                    resultText.style.color = "var(--text-muted)";
                }

                if (plucks === totalPetals) {
                    setTimeout(() => {
                        resultText.innerHTML = "ÇOOOOK SEVİYORUUM";
                        resultText.style.color = "var(--gold-primary)";
                        resultText.style.transform = "scale(1.1)";
                        
                        const nextBtn = document.getElementById("btn-daisy-next");
                        nextBtn.style.opacity = "1";
                        nextBtn.style.pointerEvents = "auto";
                    }, 500);
                }
            }
        };
        daisy.appendChild(petal);
    }
    daisyInitialized = true;
}

// --- 5. YENİ VİNTAGE MEKTUP KONTROLLERİ ---
function openLetter() {
    document.getElementById("letter-modal").classList.add("show");
}

function closeLetter() {
    document.getElementById("letter-modal").classList.remove("show");
}