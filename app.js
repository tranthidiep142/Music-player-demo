const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const PLAYER_STORAGE_KEY = 'F8_PLAYER';

        const playlist = $('.playlist');
        const audio = $('#audio');
        const heading = $('header h2');
        const cdThumb = $('.cd-thumb');
        const cd = $('.cd');
        const player = $('.player');
        const playBtn = $('.btn-toggle-play');
        const progress = $('#progress');
        const repeatBtn = $('.btn-repeat');
        const preBtn = $('.btn-prev');
        const nextBtn = $('.btn-next');
        const randomBtn = $('.btn-random');


        const app = {
            currentIndex: 0,
            isPlaying: false,
            isRandom: false,
            isRepeat: false,
            config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
            songs: [
            {
                    name: "Bước Qua Nhau",
                    singer: "Vũ",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688",
                    image: "assets/imgs/Vu.jpg"
                },
                {
                    name: "Ái Nộ",
                    singer: "Masew, Khôi Vũ",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=ngcoKLRyRorVu8KqUeS1wg&e=1638762705",
                    image: "assets/imgs/TRI.jpg"
                },
                {
                    name: "Muộn Rồi Mà Sao Còn",
                    singer: "Sơn Tùng M-TP",
                    path: "https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546",
                    image: "assets/imgs/SonTung.jpg"
                },
                {
                    name: "Thức Giấc",
                    singer: "DaLab",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708",
                    image: "assets/imgs/dalab.jpg"
                },
                {
                    name: "Độ Tộc 2",
                    singer: "Masew, Độ Mixi, Phúc Du, Pháo",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785",
                    image: "assets/imgs/DoToc2.jpg"
                },
                {
                    name: "Chúng Ta Sau Này",
                    singer: "T.R.I",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875",
                    image: "assets/imgs/TRI.jpg"
                },
                {
                    name: "Dịu Dàng Em Đến",
                    singer: "ERIK, NinjaZ",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938",
                    image: "assets/imgs/dalab.jpg"
                },
                {
                    name: "Hương",
                    singer: "Văn Mai Hương, Negav",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/Huong-VanMaiHuongNegav-6927340.mp3?st=PvHOWlRnF6TymvggYGding&e=1638783027",
                    image: "assets/imgs/VanMaiHuong.jpg"
                },
                {
                    name: "Miên Man",
                    singer: "DUTZUX",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MienMan-DUTZUX-7120884.mp3?st=yTOFq5aH8FGEvbm-_n_KTA&e=1638783090",
                    image: "assets/imgs/DUTZUT.jpg"
                },
                {
                    name: "có hẹn với thanh xuân",
                    singer: "MONSTAR",
                    path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161",
                    image: "assets/imgs/TRI.jpg"
                },
            ],
            setConfig: function(key, val){
              this.config[key] = val;
              localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
            },
            render: function () {
                const htmls = this.songs.map((song, index) => {
                    return `
                        <div class="song ${index===this.currentIndex ? 'active' : ''}" data-index= "${index}">
                            <div class="thumb" style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `
                })
                playlist.innerHTML = htmls.join('');
            },
            //định nghĩa các thuộc tính
            defineProperties(){
              Object.defineProperty(this, 'currentSong', {
                get: function(){
                  return this.songs[this.currentIndex];
                }
              })
            },

            handleEvent(){
              const _this= this;

             //animate cd quay
              const cdThumbAnimate = cdThumb.animate ([
                {
                 transform: 'rotate(360deg)'
                }
              ], {
                duration: 10000,
                iterations: Infinity
              })
              cdThumbAnimate.pause();

              //thay đổi cd khi scroll
              const cdWidth = cd.offsetWidth;
              document.onscroll = function(){
                  const scollTop = window.scrollY || document.documentElement.scrollTop;
                  const newCdWidth = cdWidth - scollTop ;

                  cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                  cd.style.opacity = newCdWidth / cdWidth;
              }

              //xử lý khi click play
              playBtn.onclick = function(){
                if(_this.isPlaying) audio.pause()
                else audio.play();
              }

              //khi song đc play
              audio.onplay = function(){
                _this.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
              }
              
              //khi song bị pause
              audio.onpause = function(){
                _this.isPlaying = false;
                player.classList.remove('playing');
                cdThumbAnimate.pause();
              }

              //khi bài hát đang chạy
              audio.ontimeupdate = function(){
                if(audio.duration){
                  const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                  progress.value = progressPercent;
                }
              }

              //xử lý khi tua bài hát
              
              // progress.onchange = function(e){
              //   const seekTime = audio.duration / 100 * e.target.value;
              //   audio.currentTime = seekTime;
              // }

              //FIXED LOI
              progress.oninput = function(e){
                var x=0;
                x=e.target.value;
                const seekTime = audio.duration / 100 * x;
                audio.currentTime = seekTime;
              };

              //xử lý khi lùi previous song
              preBtn.onclick = function(){
                if(_this.isRandom) _this.playRandom()
                else _this.preSong();
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
              }

              //xử lý khi next song
              nextBtn.onclick = function(){
                if(_this.isRandom) _this.playRandom()
                else _this.nextSong();
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
              }

              //xử lý khi bật / tắt random
              randomBtn.onclick = function(){
                _this.isRandom = !_this.isRandom;
                randomBtn.classList.toggle('active', _this.isRandom);
                _this.setConfig('isRandom', _this.isRandom)
              }

              //xử lý khi bật / tắt repeat
              repeatBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat;
                repeatBtn.classList.toggle('active', _this.isRepeat);
                _this.setConfig('isRepeat', _this.isRepeat)

              }

              //xử lý khi đến cuối bài hát
              audio.onended = function(){
                if(_this.isRepeat) audio.play();
                else nextBtn.click()
              }

              //xử lý khi click vào bài hát
              playlist.onclick = function(e){
                const songNode = e.target.closest('.song:not(.active)')
                if(songNode || e.target.closest('.option')) {

                  //xử lý khi click vào song
                  if(songNode){
                    //_this.currentIndex = Number(songNode.getAttribute('data-index'))
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                  }
                  
                  //xử lý khi click vào option
                  //if(e.target.closest('.option')) 
                }
              }
            },

            scrollToActiveSong(){
              let view = 'center';
              if(this.currentIndex < 3) view = 'end';

              setTimeout(() => {
                $('.song.active').scrollIntoView({
                  behavior: 'smooth',
                  block: view,
                });
              }, 300)
            },

            preSong(){
              --this.currentIndex;
              if(this.currentIndex < 0) this.currentIndex = this.songs.length-1;
              this.loadCurrentSong();
            },

            // nextSong: function(){
            //     ++this.currentIndex;
            //     if(this.currentIndex > this.songs.length-1) this.currentIndex=0;
            //     this.loadCurrentSong();
            
            // },

            nextSong(){
              ++this.currentIndex;
              if(this.currentIndex > this.songs.length-1) this.currentIndex=0;
              this.loadCurrentSong();
              // progress.value = 0;
            },

            playRandom(){
              let randomIndex;
              do{
                randomIndex = Math.floor(Math.random() * this.songs.length);
              } while(randomIndex === this.currentIndex);

              this.currentIndex = randomIndex;
              this.loadCurrentSong()
            },

            loadConfig(){
              this.isRandom = this.config.isRandom;
              this.isRepeat = this.config.isRepeat;
            },

            loadCurrentSong(){
              heading.textContent = this.currentSong.name;
              cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
              audio.src = this.currentSong.path;
            },
  
            start: function(){
              //gán cấu hình mặc định vào ứng dụng
              this.loadConfig();

              repeatBtn.classList.toggle('active', this.isRepeat);
              randomBtn.classList.toggle('active', this.isRandom);

              
              //định nghĩa các thuộc tính
              this.defineProperties();

              //DOM events
              this.handleEvent();

              //tải thông tin bài hát đầu tiên vào UI khi ứng dụng chạy
              this.loadCurrentSong();

              //
              this.render();
            }
        }
        
        app.start();