let wrapper = null;
let canvas = null;
let g = null;
let $id = function(id){ return document.getElementById(id); };
let img = new Image();

const IMG_PATH = "qr.png";

/*
 * 画面ギチギチに表示
 */
function drawQRCode(){    
    var screen_min = Math.min(wrapper.offsetWidth, wrapper.offsetHeight);
    canvas.width = screen_min
    canvas.height = screen_min
	g.drawImage(img, 0, 0, canvas.width, canvas.height);
}

/*
 * リサイズ時
 */
window.addEventListener("resize", function(){
	drawQRCode();
});

/*
 * 起動処理
 */
window.addEventListener("load", function(){
	wrapper = $id("wrapper");
	canvas = $id("canvas");
	g = canvas.getContext("2d");
	img.src = IMG_PATH;

    img.onload = function(){
        drawQRCode();
	};

});
