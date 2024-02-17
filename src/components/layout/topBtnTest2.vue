<template>
    <div class="topbar-btns" ref="topbarBtns">
        <div class="scrollable-wrapper" :style="{ width: containerWidth + 'px', left: containerLeft + 'px' }">
            <div v-for="(button, index) in buttons" :key="index" class="topleft-btn" :style="button.style">
                <div class="button-content" :style="{ backgroundImage: 'url(' + button.image + ')' }"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                buttons: [
                    { image: 'path/to/image1.jpg', style: { /* 按钮1的单独样式 */ } },
                    { image: 'path/to/image2.jpg', style: { /* 按钮2的单独样式 */ } },
                    { image: 'path/to/image3.jpg', style: { /* 按钮3的单独样式 */ } },
                    { image: 'path/to/image4.jpg', style: { /* 按钮4的单独样式 */ } },
                    { image: 'path/to/image5.jpg', style: { /* 按钮5的单独样式 */ } }
                    // Add more buttons with images and styles as needed
                ],
                containerWidth: 0,
                containerLeft: 0,
                isDragging: false,
                startX: 0
            };
        },
        mounted() {
            this.calculateContainerWidth();
        },
        methods: {
            calculateContainerWidth() {
                const btnMargin = parseInt(getComputedStyle(document.querySelector('.topleft-btn')).marginRight);
                this.containerWidth = (100 + btnMargin) * this.buttons.length - btnMargin;
            },
            handleMouseDown(e) {
                this.isDragging = true;
                this.startX = e.clientX;
            },
            handleMouseUp() {
                this.isDragging = false;
            },
            handleMouseMove(e) {
                if (!this.isDragging) return;

                const moveX = e.clientX - this.startX;
                this.startX = e.clientX;

                let newLeft = this.containerLeft + moveX;
                if (newLeft > 100) newLeft -= this.containerWidth;
                if (newLeft < -this.containerWidth) newLeft += this.containerWidth;

                this.containerLeft = newLeft;
            }
        }
    };
</script>

<style>
    .topbar-btns {
        position: relative;
        width: 500px;
        overflow: hidden;
    }

    .scrollable-wrapper {
        display: flex;
        position: absolute;
        transition: left 0.3s ease;
    }

    .topleft-btn {
        width: 100px;
        height: 40px;
        margin-right: 20px;
        overflow: hidden;
    }

    .button-content {
        width: 100%;
        height: 100%;
        background-size: cover;
    }

    .topleft-btn:last-child {
        margin-right: 0;
    }
</style>
