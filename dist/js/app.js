// Project.js

;(function(win, $){
    'use strict';

    /**
     * @namespace ok
     */

    if ('undefined' === typeof win.ok) {
		win.ok = {};
    }

    /**
     * @namespace ok.components
     */

    if ('undefined' === typeof win.ok.components) {
		win.ok.components = {};
	} 

    var Ok = win.ok.components;

    function Project(opts) {
        var defParams = {
            containerClass : '.project',
            foldBtn : '.project__button-more',
            foldClass : 'project--is-selected',
            foldBtnText : {
                element : '.project__button-more .ico',
                isToggled : '더보기',
                isUnToggle : '닫기'
            }
        }

        this.opts = $.extend(true, defParams, opts);

        return this;
    }

    Project.prototype = {
        init : function() {
            console.log('project init');
            this.$containers = $(this.opts.containerClass)
            this.$foldBtn = $(this.opts.foldBtn);
            this.foldClass = this.opts.foldClass;
            this.foldBtnTextElement = this.$foldBtn.find(this.opts.foldBtnText.element);
            this.isOpened = false;
            
            this._attachEvents();
        },
        _attachEvents : function() {
            this.$foldBtn.on('click', $.proxy(this._onfoldBtnListener,this));
        },
        _onfoldBtnListener: function(e) {
            this.$container = $(e.currentTarget).closest(this.opts.containerClass);
            this.$containerFoldBtn = this.$container.find(this.opts.foldBtnText.element);

            var isState = this.$container.hasClass(this.opts.foldClass);

            if(!isState) {
                this.$containers.removeClass(this.foldClass);
                this.$container.addClass(this.foldClass);
                this._addKeyHandler(this.$container);
            } else {
                this.$containers.removeClass(this.foldClass);
            }

            this._onChangeBtnText(isState);
        },
        _onChangeBtnText : function(isState) {
            var btnText = {
                isToggled : this.opts.foldBtnText.isToggled,
                isUnToggle : this.opts.foldBtnText.isUnToggle
            }
            switch (isState) {
                case true:
                        this.$containerFoldBtn.text(btnText.isToggled);
                    break;
                case false:
                        this.$containerFoldBtn.text(btnText.isUnToggle);
                    break;
                default:
                    break;
            }
        },
        _setFoldBtn : function() {
            this.foldBtnTextElement.text(this.opts.foldBtnText.isToggled);
        },
        _addKeyHandler : function(container) {
            container.on('keydown', $.proxy(function(e) {

                if ('Tab' !== e.key) {
                    return;
                } else {
                    e.preventDefault();
                    focusElement.focus();
                    container.off('keydown');
                }
                
            },this));
        }
    }

    // Global Export
    win.Project = Project;

})(window, window.jQuery);

;(function(win, $){
    'use strict';

    var Project = win.Project;
    var page = new Project();
    
    page.init();

})(window, window.jQuery);