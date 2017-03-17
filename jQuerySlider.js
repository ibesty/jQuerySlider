;
(function($) {
    $.fn.jQuerySlider = function(options) {
        return this.each(function() {
            options = $.extend(true, $.fn.jQuerySlider.default, options || {});

            var $this = $(this).css({
                overflow: 'hidden'
            })
            var ctrBtn = $('<span rel=></span>')
            var containerHeight = $this.height(),
                containerWidth = $this.width(),
                ctrIconContaciner,
                sliderBox,
                imageNum = $this.children('img').length,
                sliderWidth = containerWidth * imageNum,
                nowPlay = 0,
                nextPlay
            var createSliderBox = function() {
                sliderBox = $('<div class="slider-box"></div>')
                var img = $this.children('img').width(containerWidth).height(containerHeight).css({
                    float: 'left',
                    display: 'block'
                }).detach()
                sliderBox.width(sliderWidth).height(containerHeight).css({
                    position: 'relative',
                    overflow: 'hidden'
                }).append(img)
                $this.append(sliderBox)
            }
            var createCtrIcon = function() {
                ctrIconContaciner = $('<div class="icon-container"></div>')
                for (var i = 1; i <= imageNum; i++) {
                    ctrIconContaciner.append('<span rel="' + i + '">' + i + '</span>')
                }
                $(ctrIconContaciner.children('span')[0]).addClass('active')
                $this.append(ctrIconContaciner)
                return ctrIconContaciner
            }

            createSliderBox()
            ctrIconContaciner = createCtrIcon(imageNum)
            ctrIcon = ctrIconContaciner.children('span')

            var slide = function(target) {
                if (target + 1) {
                    nextPlay = target
                } else {
                    nextPlay = (nowPlay + 1) % imageNum
                }
                $(ctrIcon[nowPlay]).removeClass('active')
                $(ctrIcon[nextPlay]).addClass('active')
                sliderBox.animate({
                        left: '-' + nextPlay * containerWidth + 'px'
                    },
                    options.speed,
                    function() {
                        /* stuff to do after animation is complete */
                    })
                nowPlay = nextPlay
            }

            var interval = setInterval(slide, options.interval)

            ctrIcon.each(function(index, el) {
                $(this).click(function(event) {
                    clearInterval(interval)
                    slide(index)
                    interval = setInterval(slide, options.interval)
                });
            });
            //console.log($this.children('img'))
        })
    }
    $.fn.jQuerySlider.default = {
        interval: 2000,
        speed: 500
    }
})(jQuery)
