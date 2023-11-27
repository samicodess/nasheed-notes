"use strict";

window.onload = () => {
  const getNasheeds = (() => {
    const nasheeds = [
      {
        name: "Brigade 103",
        artist: "Musab Al Adani",
        image: "brigade103.png",
        nasheedUrl: "Brigade103.mp3",
        duration: "02:51",
      },

      {
        name: "anjoom la7at",
        artist: "Musa Al Amira",
        image: "berserk.jpg",
        nasheedUrl: "berserk.mp3",
        duration: "02:16",
      },

      {
        name: "Ghadab Ghadab",
        artist: "Unknown",
        image: "ghadab.jpeg",
        nasheedUrl: "ghadab.mp3",
        duration: "01:50",
      },

      {
        name: "Mi Smo Vojska Allahova",
        artist: "Mujahideen Bosnia",
        image: "mismovojska.jpg",
        nasheedUrl: "mismovojska.mp3",
        duration: "04:29",
      },

      {
        name: "I Challenge Apache",
        artist: "Musab Al Adani",
        image: "apache.jpg",
        nasheedUrl: "apache.mp3",
        duration: "02:29",
      },

      {
        name: "Rasamat Usratuna",
        artist: "Unknown",
        image: "rasamat.jpg",
        nasheedUrl: "rasamat.mp3",
        duration: "02:09",
      },

      {
        name: "Soldiers Of Allah",
        artist: "Muhammad Al Muqit",
        image: "soldiersofallah.png",
        nasheedUrl: "soldiersofallah.mp3",
        duration: "04:35",
      },
    ];

    const warNasheed = [
      {
        name: "Army Of Mahdi",
        artist: "Ali Muhammed Abdullah",
        image: "armyofmahdi.jpg",
        nasheedUrl: "armyofmahdi.mp3",
        duration: "04:25",
      },

      {
        name: "Thabatan Thabatan",
        artist: "Unknown",
        image: "thabatan.jpeg",
        nasheedUrl: "thabatan.mp3",
        duration: "04:00",
      },

      {
        name: "We Are The Seekers of Martyrdom",
        artist: "Unknown",
        image: "weareseeker.jpg",
        nasheedUrl: "wearetheseekersofmartydrom.mp3",
        duration: "01:56",
      },

      {
        name: "Al Qawlu Qawlus Sawarim",
        artist: " Abu Ali",
        image: "alqawlu.jpeg",
        nasheedUrl: "alqawlu.mp3",
        duration: "03:26",
      },
    ];

    let getRecommendedNasheed = [{}];
    const randomValue = Math.floor(Math.random() * warNasheed.length);
    getRecommendedNasheed[0] = warNasheed[randomValue];

    return {
      nasheeds,
      warNasheed,
      getRecommendedNasheed,
    };
  })();

  const DOMStrings = (() => {
    const DOMString = {
      navMenu: document.querySelector(".nav-sec"),
      navOpenBtn: document.querySelector(".navOpen-btn"),
      nasheedContainer: document.querySelector(".nasheed-sec"),
      slider: document.querySelectorAll(".nasheed-con__list"),
      audioFullScreen: document.getElementById("audio-player-fullscreen"),
      openFullScreen: document.querySelector(".nasheed-controller"),
      fullScreenCloseBtn: document.querySelector(".audio-player__close-btn"),

      audioPlayer: document.querySelector(".audio"),
      audioProgressBar: document.querySelectorAll(
        ".nasheed-controller__progress-bar"
      ),
      audioProgressBarFill: document.querySelectorAll(
        ".nasheed-controller__progress-bar-fill"
      ),
      audioListParent: document.querySelectorAll(".nasheed-con__list"),
      audioHorListParent: document.querySelector(".nasheed-hor__list"),
      recommendedImage: document.getElementById("recommended-image"),
    };

    const audioBtnCtrl = {
      audioPlayer: document.getElementById("audio"),
      prevBtn: document.querySelectorAll(".audio-prev-btn"),
      playPauseBtn: document.querySelectorAll(".audio-play-pause-btn"),
      nextBtn: document.querySelectorAll(".audio-next-btn"),
      audioImage: document.querySelectorAll(".audio-image"),
      audioName: document.querySelectorAll(".audio-name"),
      audioSingerName: document.querySelector(".audio-singer-name"),
      audioShuffle: document.querySelectorAll(".audio-shuffle"),
      audioVolume: document.querySelectorAll(".audio-volume"),
      audioRepeat: document.querySelectorAll(".audio-repeat"),
      audioCurrentDuration: document.getElementById("current-duration"),
      audioEndDuration: document.getElementById("end-duration"),
      recommendedPlayBtn: document.getElementById("recommended-play-btn"),
    };

    return {
      DOMString,
      audioBtnCtrl,
    };
  })();

  const AnimationClass = (() => {
    const nav = {
      open: "nav-open-animation",
      close: "nav-close-animation",
    };

    return {
      nav,
    };
  })();

  const UIController = ((DOMStrings, AnimationClass, getNasheeds) => {
    const DOM = DOMStrings.DOMString,
      navMenu = DOM.navMenu,
      navBtn = DOM.navOpenBtn,
      slider = DOM.slider,
      nasheeds = getNasheeds.nasheeds;

    // Set Cover

    DOM.recommendedImage.src = `img/${getNasheeds.getRecommendedNasheed[0].image}`;

    const swipeUp = new Hammer(DOM.openFullScreen);
    swipeUp.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    const swipeDown = new Hammer(document.body);
    swipeDown.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    // Navigation Start
    const navOpenAndClose = (isClose) => {
      const isNavBtnVisible = window.getComputedStyle(navBtn).visibility;

      if (window.getComputedStyle(navMenu).width === "0px" && isClose == false)
        return;

      if (isNavBtnVisible === "visible") {
        navMenu.classList.remove(AnimationClass.nav.open);
        navMenu.classList.remove(AnimationClass.nav.close);
        const animation = isClose
          ? AnimationClass.nav.open
          : AnimationClass.nav.close;
        navMenu.classList.add(animation);
      }
    };

    swipeUp.on("swipeup", () => {
      navOpenAndClose(false);
      DOM.openFullScreen.setAttribute(
        "style",
        "height : 100% ; opacity : 0;z-index:8"
      );
      DOM.audioFullScreen.setAttribute(
        "style",
        "height : 100% ; opacity : 1 ; z-index:10"
      );
    });

    swipeDown.on("swipedown", () => {
      DOM.openFullScreen.setAttribute(
        "style",
        "height : 4.6rem; opacity : 1;z-index:10"
      );
      DOM.audioFullScreen.setAttribute(
        "style",
        "height :0 ; opacity :0;z-index:8"
      );
    });

    navBtn.addEventListener("click", navOpenAndClose.bind(null, true));

    DOM.nasheedContainer.addEventListener(
      "click",
      navOpenAndClose.bind(null, false)
    );

    DOM.openFullScreen.addEventListener(
      "click",
      navOpenAndClose.bind(null, false)
    );

    DOM.nasheedContainer.addEventListener(
      "touchstart",
      navOpenAndClose.bind(null, false)
    );

    DOM.openFullScreen.addEventListener(
      "touchstart",
      navOpenAndClose.bind(null, false)
    );

    // Navigation End

    // NasheedsHorizonatal Slider Start

    let isDown, startX, scrollLeft;

    isDown = false;

    slider.forEach((btn) =>
      btn.addEventListener("mouseleave", () => (isDown = false))
    );

    slider.forEach((btn) =>
      btn.addEventListener("mouseup", () => (isDown = false))
    );

    slider.forEach((btn) => {
      btn.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - btn.offsetLeft;
        scrollLeft = btn.scrollLeft;
      });
    });

    slider.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - btn.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        btn.scrollLeft = scrollLeft - walk;
      });
    });

    // Nasheed Horizonatal Slider Start

    // Add Nasheed UI

    const addListUI = (listChange, i) => {
      const content = `<div class="nasheed-con__item">
                                <div class="nasheed-con__img">
                                    <img src="img/${nasheeds[i].image}" alt="">
                                    <span class="nasheed-con__play-btn">
                                        <span class="material-icons play-btn">
                                            play_circle_outline
                                        </span>
                                    </span>
                                </div>
                                <div class="nasheed-list__text">
                                    <h3 class="heading-3"> ${nasheeds[i].name} </h3>
                                    <p class="nasheed-artist-name">  ${nasheeds[i].artist} </p>
                                </div>
                            </div>`;

      DOM.audioListParent[listChange].insertAdjacentHTML("beforeend", content);
    };

    for (let i = 0; i < 6; i++) {
      addListUI(0, i);
    }

    for (let i = 6; i < getNasheeds.nasheeds.length; i++) {
      addListUI(1, i);
    }

    // List UI Added

    for (let i in getNasheeds.warNasheed) {
      const content = `<div class="nasheed-hor__item">
                                        <div class="nasheed-hor__item-inner">
                                            <img src="img/${getNasheeds.warNasheed[i].image}" class="nasheed-hor__img">
                                            <h3 class="nasheed-artist-name">${getNasheeds.warNasheed[i].name}</h3>
                                        </div>
                                        <div class="nasheed-hor__item-inner"> 
                                            <p class="nasheed-hor__nasheed-duration">${getNasheeds.warNasheed[i].duration}</p>                  
                                        </div>
                                    </div> `;

      DOM.audioHorListParent.insertAdjacentHTML("beforeend", content);
    }
  })(DOMStrings, AnimationClass, getNasheeds);

  // Nasheed Contol Model

  const nasheedController = ((DOMStrings, getNasheeds) => {
    const DOM = DOMStrings.DOMString,
      player = DOM.audioPlayer,
      audioCtrl = DOMStrings.audioBtnCtrl,
      nasheedHoriList = document.querySelectorAll(".nasheed-hor__item"),
      nasheedItems = document.querySelectorAll(".nasheed-con__item");
    let currenPlayingNasheedIndex = 0,
      currenListObject = getNasheeds.nasheeds;

    const volume = {
        off: `<span class="material-icons">
                    volume_off
                </span>`,
        on: `<span class="material-icons">
                    volume_up
                </span>`,
      },
      HTML = {
        pause: `<span class="material-icons">
                    pause_circle_filled
                    </span>
                    `,
        play: ` <span class="material-icons">
                        play_circle_filled
                    </span> `,
      };

    DOM.audioProgressBar.forEach((btn) => {
      btn.addEventListener("click", function seek(e) {
        let percent = e.offsetX / this.offsetWidth;
        let seekTime = percent * player.duration;
        player.currentTime = isNaN(seekTime) ? 0.0 : seekTime;
        DOM.audioProgressBar.value = percent / 100;
      });
    });

    player.addEventListener("timeupdate", () => {
      var duration = player.duration;

      if (duration > 0) {
        DOM.audioProgressBarFill.forEach(
          (btn) =>
            (btn.style.width = (player.currentTime / duration) * 100 + "%")
        );
      }

      const d = player.currentTime;
      let hours = Math.floor(d / 3600);
      let minutes = Math.floor((d % 3600) / 60);
      let seconds = Math.floor((d % 3600) % 60);

      hours = hours === 0 ? "" : zeroPrefixer(hours) + " : ";

      audioCtrl.audioCurrentDuration.textContent =
        hours + zeroPrefixer(minutes) + " : " + zeroPrefixer(seconds);
    });

    const zeroPrefixer = (n) => (n < 10 ? "0" + n : n);

    audioCtrl.playPauseBtn.forEach((btn) => {
      btn.addEventListener("click", () =>
        audioCtrl.audioPlayer.paused ? audioPlayEnable() : audioPlayDisable()
      );
    });

    const audioPlayEnable = () => {
      audioCtrl.playPauseBtn.forEach((btn) => (btn.innerHTML = HTML.pause));
      var playPromise = audioCtrl.audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
      }
    };

    const audioPlayDisable = () => {
      audioCtrl.playPauseBtn.forEach((btn) => (btn.innerHTML = HTML.play));
      audioCtrl.audioPlayer.pause();
    };

    //Set Data Current Playing Nasheed

    const updateAudio = (index) => {
      const nasheedObject = currenListObject[index];
      audioCtrl.audioName[0].textContent = nasheedObject.name;
      audioCtrl.audioName[1].textContent = nasheedObject.name;
      audioCtrl.audioImage[0].src = `img/${nasheedObject.image}`;
      audioCtrl.audioImage[1].src = `img/${nasheedObject.image}`;
      audioCtrl.audioSingerName.textContent = nasheedObject.artist;
      audioCtrl.audioPlayer.src = `mp3//${nasheedObject.nasheedUrl}`;
      audioCtrl.audioEndDuration.textContent = nasheedObject.duration;
      DOM.audioProgressBarFill.forEach((btn) => (btn.style.width = 0 + "%"));
      audioPlayEnable();
    };

    nasheedItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        currenListObject = getNasheeds.nasheeds;
        currenPlayingNasheedIndex = index;
        updateAudio(index);
      });
    });

    nasheedHoriList.forEach((item, index) => {
      item.addEventListener("click", () => {
        currenListObject = getNasheeds.warNasheed;
        currenPlayingNasheedIndex = index;
        updateAudio(index);
      });
    });

    audioCtrl.recommendedPlayBtn.addEventListener("click", () => {
      currenListObject = getNasheeds.getRecommendedNasheed;
      currenPlayingNasheedIndex = 0;
      updateAudio(0);
    });

    audioCtrl.nextBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (currenPlayingNasheedIndex === currenListObject.length - 1)
          currenPlayingNasheedIndex = -1;
        updateAudio(++currenPlayingNasheedIndex);
      });
    });

    audioCtrl.prevBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (currenPlayingNasheedIndex === 0)
          currenPlayingNasheedIndex = currenListObject.length;
        updateAudio(--currenPlayingNasheedIndex);
      });
    });

    audioCtrl.audioPlayer.addEventListener("ended", () => {
      if (audioCtrl.audioRepeat[0].className.includes("audioSuffle")) {
        updateAudio(currenPlayingNasheedIndex);
        return;
      }
      if (currenPlayingNasheedIndex === currenListObject.length - 1)
        currenPlayingNasheedIndex = -1;
      updateAudio(++currenPlayingNasheedIndex);
    });

    audioCtrl.audioVolume.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isMuted = audioCtrl.audioPlayer.muted;
        audioCtrl.audioPlayer.muted = !isMuted;
        const icon = isMuted ? volume.on : volume.off;
        audioCtrl.audioVolume[0].innerHTML = icon;
        audioCtrl.audioVolume[1].innerHTML = icon;
        navigator.vibrate(100);
      });
    });

    let isShuffleModeEnable = false;

    audioCtrl.audioShuffle.forEach((btn) => {
      btn.addEventListener("click", () => {
        audioCtrl.audioShuffle[0].classList.toggle("audioSuffle");
        audioCtrl.audioShuffle[1].classList.toggle("audioSuffle");

        if (isShuffleModeEnable) {
          isShuffleModeEnable = false;
          if (currenListObject.length === getNasheeds.nasheeds.length)
            currenListObject = getNasheeds.nasheeds;
          else if (currenListObject.length === getNasheeds.warNasheed.length)
            currenListObject = getNasheeds.warNasheed;
          else if (
            currenListObject.length === getNasheeds.getRecommendedNasheed.length
          )
            currenListObject = getNasheeds.getRecommendedNasheed;
        } else {
          currenListObject = shuffle(currenListObject);
          isShuffleModeEnable = true;
        }
      });
    });

    function shuffle(array) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex,
        newArray = new Array(...array);

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
      }

      return newArray;
    }

    audioCtrl.audioRepeat.forEach((btn) => {
      btn.addEventListener("click", () => {
        audioCtrl.audioRepeat[0].classList.toggle("audioSuffle");
        audioCtrl.audioRepeat[1].classList.toggle("audioSuffle");
      });
    });

    updateAudio(3); //set First Nasheed
    audioPlayDisable();
  })(DOMStrings, getNasheeds);

  setTimeout(() => {
    const loader = document.querySelector(".loading-sec");
    loader.setAttribute("style", "opacity : 0");
    setTimeout(() => {
      loader.remove();
    }, 1000);
  }, 3000);
};
