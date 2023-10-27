<template>
  <div class = "background-stars" >
    <canvas id="background-stars-canvas" ref="canvasInstance">
        
    </canvas>
  </div>
</template>
<script  setup>

import { ref ,reactive,onMounted ,defineProps ,watch,onUpdated} from 'vue'
const canvasInstance = ref()
let width = ref(0)
let height = ref(360)
let stars = ref([])
let shootingStars = ref([])
let layers = [{
        speed: 0.015,
        scale: 0.2,
        count: 320
    }, {
        speed: 0.03,
        scale: 0.5,
        count: 50
    }, {
        speed: 0.05,
        scale: 0.75,
        count: 30
    }]
let starsAngle = ref(145)
let shootingStarSpeed = ref({
        min: 15,
        max: 20
    })
let shootingStarOpacityDelta = ref(0.01)
let trailLengthDelta = ref(0.01)
let shootingStarEmittingInterval = ref(2000)
let shootingStarLifeTime = ref(500)
let maxTrailLength = ref(300)
let starBaseRadius = ref(2)
let shootingStarRadius = ref(3)
let paused = ref(false)
let context = ref(null)
onMounted(()=>{
    startDrawing()

})

const startDrawing = () =>{
var canvas = document.getElementById("background-stars-canvas")
        // var canvas = canvasInstance.value.getContext('2d');

        context.value = canvas.getContext("2d")
        width.value = canvas.width = window.innerWidth-0
        height.value = canvas.height = window.innerHeight
        console.log( window.screen.height+"-"+window.innerHeight)


    //Create all stars
    for (var j = 0; j < layers.length; j += 1) {
        var layer = layers[j];
        for (var i = 0; i < layer.count; i += 1) {
            var star = particle.create(randomRange(0, width.value), randomRange(0, height.value), 0, 0);
            star.radius = starBaseRadius.value * layer.scale;
            star.setSpeed(layer.speed);
            star.setHeading(degreesToRads(starsAngle.value));
            stars.value.push(star);
        }
    }
    
    update();
}

















//Helpers
    const lineToAngle = (x1, y1, length, radians) => {
        var x2 = x1 + length * Math.cos(radians),
            y2 = y1 + length * Math.sin(radians);
        return {
            x: x2,
            y: y2
        };
    }

    const randomRange =(min, max) =>{
        return min + Math.random() * (max - min);
    }

    const degreesToRads = (degrees) => {
        return degrees / 180 * Math.PI;
    }

    const particle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 0,

        create: function(x, y, speed, direction) {
          debugger;
            var obj = Object.create(this);
            obj.x = x;
            obj.y = y;
            obj.vx = Math.cos(direction) * speed;
            obj.vy = Math.sin(direction) * speed;
            return obj;
        },

        getSpeed: function() {
            return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        },

        setSpeed: function(speed) {
            var heading = this.getHeading();
            this.vx = Math.cos(heading) * speed;
            this.vy = Math.sin(heading) * speed;
        },

        getHeading: function() {
            return Math.atan2(this.vy, this.vx);
        },

        setHeading: function(heading) {
            var speed = this.getSpeed();
            this.vx = Math.cos(heading) * speed;
            this.vy = Math.sin(heading) * speed;
        },

        update: function() {
            this.x += this.vx;
            this.y += this.vy;
        }
    }

const createShootingStar = () => {
        var shootingStar = particle.create(randomRange(width.value / 2, width.value), randomRange(0, height.value / 2), 0, 0);
        shootingStar.setSpeed(randomRange(shootingStarSpeed.value.min, shootingStarSpeed.value.max));
        shootingStar.setHeading(degreesToRads(starsAngle.value));
        shootingStar.radius = shootingStarRadius.value;
        shootingStar.opacity = 0;
        shootingStar.trailLengthDelta = 0;
        shootingStar.isSpawning = true;
        shootingStar.isDying = false;
        shootingStars.value.push(shootingStar);
  console.log("createShootingStar",shootingStars.value);
    }

    const killShootingStar = (shootingStar) => {
        setTimeout(function() {
            shootingStar.isDying = true;
        }, shootingStarLifeTime.value);
    }

    const  update = () => {
        // if (!paused.value) {
          if(true){
            context.value.clearRect(0, 0, width.value, height.value);
            // context.value.fillStyle = "#282a3a";
            //背景background-color
            context.value.fillStyle = "rgba(0,0,0,0.5)";
            context.value.fillRect(0, 0, width.value, height.value);
            context.value.fill();

            for (var i = 0; i < stars.value.length; i += 1) {
                var star = stars.value[i];
                star.update();
                drawStar(star);
                if (star.x > width.value) {
                    star.x = 0;
                }
                if (star.x < 0) {
                    star.x = width.value;
                }
                if (star.y > height.value) {
                    star.y = 0;
                }
                if (star.y < 0) {
                    star.y = height.value;
                }
            }
            
            for (i = 0; i < shootingStars.value.length; i += 1) {
                var shootingStar = shootingStars.value[i];
                if (shootingStar.isSpawning) {
                    shootingStar.opacity += shootingStarOpacityDelta.value;
                    if (shootingStar.opacity >= 1.0) {
                        shootingStar.isSpawning = false;
                        killShootingStar(shootingStar);
                    }
                }
                if (shootingStar.isDying) {
                    shootingStar.opacity -= shootingStarOpacityDelta.value;
                    if (shootingStar.opacity <= 0.0) {
                        shootingStar.isDying = false;
                        shootingStar.isDead = true;
                    }
                }
                shootingStar.trailLengthDelta += trailLengthDelta.value;

                shootingStar.update();
                if (shootingStar.opacity > 0.0) {
                    drawShootingStar(shootingStar);
                }
            }

            // //Delete dead shooting shootingStars
            // for (i = shootingStars.value.length - 1; i >= 0; i--) {
            //     if (shootingStars.value[i].isDead) {
            //         shootingStars.value.splice(i, 1);
            //     }
            // }
        }
        requestAnimationFrame(update);
    }

    const drawStar = (star) => {
        // context.value.fillStyle = "rgb(255, 221, 157)";
        context.value.fillStyle = "rgb(255, 255, 255)";
        context.value.beginPath();
        context.value.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        context.value.fill();
    }

    const drawShootingStar = (p) => {
        var x = p.x,
            y = p.y,
            currentTrailLength = (maxTrailLength.value * p.trailLengthDelta),
            pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

        context.value.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";
        // context.beginPath();
        // context.arc(x, y, p.radius, 0, Math.PI * 2, false);
        // context.fill();
        var starLength = 5;
        context.value.beginPath();
        context.value.moveTo(x - 1, y + 1);

        context.value.lineTo(x, y + starLength);
        context.value.lineTo(x + 1, y + 1);

        context.value.lineTo(x + starLength, y);
        context.value.lineTo(x + 1, y - 1);

        context.value.lineTo(x, y + 1);
        context.value.lineTo(x, y - starLength);

        context.value.lineTo(x - 1, y - 1);
        context.value.lineTo(x - starLength, y);

        context.value.lineTo(x - 1, y + 1);
        context.value.lineTo(x - starLength, y);

        context.value.closePath();
        context.value.fill();

        //流星尾迹
        // context.value.fillStyle = "rgba(255, 221, 157, " + p.opacity + ")";
        context.value.fillStyle = "rgba(255, 255, 255)";
        context.value.beginPath();
        context.value.moveTo(x - 1, y - 1);
        context.value.lineTo(pos.x, pos.y);
        context.value.lineTo(x + 1, y + 1);
        context.value.closePath();
        context.value.fill();
    }



    //Shooting stars
    setInterval(function() {
        if (paused.value) return;
        createShootingStar();
    }, shootingStarEmittingInterval.value);

    window.onfocus = function() {
        paused.value = false;
    };

    window.onblur = function() {
        paused.value = true;
    };    
</script>