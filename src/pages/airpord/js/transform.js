
(function transform(){
    /*
 * @Description: apple AirPods Pro Animation Imitation
 * @Author: Flcwl
 * @Date: 2019-11-02 14:56:38
 * @LastEditTime: 2019-11-03 19:51:47
 * @LastEditors: Flcwl
 * @github: https://github.com/Flcwl/Apple-Animation
 * @location:https://zhuanlan.zhihu.com/p/89895329
 */
    const srcDir =  'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/';
    const imgSuffix = '.jpg';

    console.log('Hello AirPods-Pro!');

    var appleAirPodsPro = {
        init() {
            this.initData();
            this.initImages();
            this.handleResize();
            this.bindEvents();
        },

        initData() {
            this.canvas2 = document.getElementById('02-head-bob-turn');
            this.context = this.canvas2.getContext('2d');
            this.MAX_LEN = 132;
            this.imgs = [];
            this.start = 1;
            this.oldStart = -1;
            this.addN = 1;
            this.interval = 20; // 控制刷新率
            this.leftY = 0;
            this.curScrollY = this.getScrollTop();
            this.startPos = this.curScrollY;
            this.lastPos = this.curScrollY;
            this.isStop = false;
        },

        initImages() {
            for (let i = 0; i < this.MAX_LEN; i++) {
                const img = new Image();
                // img.onload = () => this.imgs[i] = img
                img.src = this.getImage(i);
                // 不管加载否 保证顺序
                this.imgs.push(img);
            }
        },

        bindEvents() {
            window.addEventListener('resize', () => this.handleResize());
            window.addEventListener('scroll', () => this.handleScroll());
        },

        getScrollTop() {
            return window.scrollY || 0;
        },

        getImage(num) {
            console.assert(Number.isInteger(num) && num > -1 && num < this.MAX_LEN);
            const t = ('' + num).padStart(4, '0');

            return srcDir + t + imgSuffix;
        },

        isOver() {
            return this.start < 0 || this.start > this.MAX_LEN - 1;
        },

        handleScroll() {
            const scrollY = this.getScrollTop();//距离顶部的距离
            let delta = scrollY - this.curScrollY;
            const isDown = delta > 0;  // 滚动方向

            delta = Math.abs(delta) + this.leftY;   // 滚动差值 + 上次剩余补偿值
            this.curScrollY = scrollY;

            if (
                this.isStop &&
                isDown === this.needDown &&
                ((isDown && this.curScrollY > this.lastPos) || (!isDown && this.curScrollY < this.lastPos))
            ) {
                this.isStop = false;
            }
            if (this.isStop) return;

            // this.interval = 20px, 得到该次滚动切换 alpha 个帧
            const alpha = Math.floor(delta / this.interval) * this.addN || 0;
            this.leftY = delta % this.interval;
            // 设置 this.start 当前帧序号
            isDown ? (this.start += alpha) : (this.start -= alpha);
            if (this.isOver() && !this.isStop) {
                // this.lastPos = scrollY
                this.isStop = true;
                console.log(this.start, scrollY, this.lastPos);

                // TODO: 多个 canvas 用 opacity 切换
                // this.canvas2.style.cssText = `opacity: 0;`
            }

            if (this.start < 0) this.start = 0;
            if (this.start > this.MAX_LEN - 1) this.start = this.MAX_LEN - 1;
            if (this.startPos >= scrollY) this.start = 0;
            if (this.oldStart === this.start) return;
            this.oldStart = this.start;
            // good idea：记录
            this.lastPos = scrollY;
            this.needDown = !isDown;

            this.drawCanvas(this.start);
        },

        handleResize() {
            const wScale = window.innerWidth / (this.canvas2.width || 1458);
            const hScale = (window.innerHeight - 52) / (this.canvas2.height || 1458);

            this.canvas2.style.transform = `matrix(${wScale}, 0, 0, ${hScale}, 0, 0)`;
        },

        drawCanvas(sequence) {
            // 当前序列帧
            const imgTemp = this.imgs[sequence];
            const canvas = this.canvas2;

            canvas.width = imgTemp.width;
            canvas.height = imgTemp.height;

            this.context.drawImage(imgTemp, 0, 0);
        },
    };
    appleAirPodsPro.init();
})();


