(function($){
	$.fn.precambriaSwitch = function(spec)
	{
        var defaults        = {on:'&nbsp;',off:'&nbsp;',defaultState:'off'};
        var spec            = spec              || {};
        var on              = spec.on           || defaults.on;
        var off             = spec.off          || defaults.off;
        var afterLabel      = spec.labelRight   || '';
        var beforeLabel     = spec.labelLeft    || '';
        var currentState    = spec.defaultState || defaults.defaultState;
        var labelMargin     = spec.labelMargin  || 5;
        var self            = this[0];// convenience for getting at the clientX property of a mouse/touch event
        var h               = $('<div>');
        var m               = $('<div>');
        var jqself          = this;
        var onTitle         = $('<span class="pre-label onlabel">'+on+'</span>');
        var offTitle        = $('<span class="pre-label offlabel">'+off+'</span>');
        var ison            = (currentState === 'on')       ? true          : false;
        var touchmove       = ('ontouchmove' in window)     ? 'touchmove'   : 'mousemove';
        var touchstart      = ('ontouchstart' in window)    ? 'touchstart'  : 'mousedown';
        var touchend        = ('ontouchend' in window)      ? 'touchend'    : 'mouseup';
        var start,newPos;
        
            onTitle.hide();
            offTitle.hide();
        if(ison)onTitle.show();else offTitle.show();
        
		   h.addClass('pre-switch handle '+currentState);
           m.addClass('pre-switch center');
           h.html(m);
		this.addClass('pre-switch container');
        this.html(onTitle)
        this.append(offTitle);
        this.append(h);
        
        if(beforeLabel)// how big?
        {
            var canvas      = document.createElement('canvas');
            var ctx         = canvas.getContext("2d");
                ctx.font    = '16px sans-serif';//this.css('font-size');    
                console.log(ctx.font);
            var width       = ctx.measureText(beforeLabel).width+labelMargin;
            var elem        = $('<div>'+beforeLabel+'</div>').addClass('pre-beforeLabel');
                elem.css('left',(width*-1));
                
            this.css('margin-left',width);
            this.prepend(elem)
        }
        if(afterLabel)// how big?
        {
            var canvas      = document.createElement('canvas');
            var ctx         = canvas.getContext("2d");
                ctx.font    = '16px sans-serif';//this.css('font-family');      
                console.log(ctx.font);    
            var width       = ctx.measureText(afterLabel).width+labelMargin;
            var elem        = $('<div>'+afterLabel+'</div>').addClass('pre-afterLabel');
                elem.css('right',(width*-1));

            this.css('margin-right',width);
            this.prepend(elem)
        }
        
        var moveHandler = function(e)
        {
            newPos = e.touches ? e.touches[0].clientX : e.clientX;
            if(newPos != start)
            {
                if(newPos>start){
                    h.removeClass('off').addClass('on');
                    onTitle.fadeIn(300);
                    offTitle.fadeOut(300);
                    currentState = 'on';
                    jqself.data('checked',true);
                }
                else{
                    h.removeClass('on').addClass('off');
                    onTitle.fadeOut(300);
                    offTitle.fadeIn(300);
                    currentState = 'off';
                    jqself.data('checked',false);
                }
            self.removeEventListener(touchmove,moveHandler);
            self.removeEventListener(touchend,touchHandler);
            setTimeout(function(){
                jqself.trigger('change');
            },300);
            
            }
        };
        
        var touchHandler = function()
        {
            if(currentState == 'on')
            {
                h.removeClass('on').addClass('off');
                    onTitle.fadeOut(300);
                    offTitle.fadeIn(300);
                currentState = 'off';
                jqself.data('checked',false);
            }
            else
            {
                h.removeClass('off').addClass('on');
                    onTitle.fadeIn(300);
                    offTitle.fadeOut(300);
                currentState = 'on';
                    jqself.data('checked',true);
            }
            self.removeEventListener(touchmove,moveHandler);
            self.removeEventListener(touchend,touchHandler);
            setTimeout(function(){
                jqself.trigger('change');
            },300);
        }
        
        self.addEventListener(touchstart,function(e){
            e.preventDefault();
            start = e.touches ? e.touches[0].clientX : e.clientX;
            self.addEventListener(touchmove,moveHandler);
            self.addEventListener(touchend,touchHandler);
        },false);
        
		return this;
	}
}(jQuery));