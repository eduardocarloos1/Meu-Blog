class Typed {
    constructor(element, options) {
        this.element = element;
        this.strings = options.strings || [];
        this.typeSpeed = options.typeSpeed || 50;
        this.backSpeed = options.backSpeed || 30;
        this.backDelay = options.backDelay || 2000;
        this.loop = options.loop || false;
        this.currentString = '';
        this.currentIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    type() {
        const currentText = this.strings[this.currentIndex];
        
        if (this.isDeleting) {
            this.currentString = currentText.substring(0, this.currentString.length - 1);
        } else {
            this.currentString = currentText.substring(0, this.currentString.length + 1);
        }

        this.element.textContent = this.currentString;

        let typeSpeed = this.isDeleting ? this.backSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentString === currentText) {
            typeSpeed = this.backDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentString === '') {
            this.isDeleting = false;
            this.currentIndex++;
            if (this.currentIndex >= this.strings.length) {
                if (this.loop) {
                    this.currentIndex = 0;
                } else {
                    return;
                }
            }
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    start() {
        this.type();
    }
} 