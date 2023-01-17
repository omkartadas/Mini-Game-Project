export const countTimer = {
    id: 0,
    sec: 0,
    timer: function (mode) {
        const timerEl = document.getElementById("score");
        switch (mode) {
            case "reset":
                timerEl.innerHTML = "0000";
                this.sec = 0;
                clearInterval(this.id);
                break;
            case "start":
                this.sec = 0;
                this.id = setInterval(() => {
                    this.sec++;
                    timerEl.innerHTML = (this.sec).toFixed();
                }, 100);
                break;
            case "stop":
                clearInterval(this.id);
                break;
        }
    },
};
