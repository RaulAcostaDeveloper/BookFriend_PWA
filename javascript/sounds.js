const pop = new Audio('./Audios/pop.mp3');
const click = new Audio('./Audios/click.mp3');
reproducirClick();//Para que al entrar en pantalla siempre suene
function reproducirPop(){
    pop.play();
}
function reproducirClick(){
    click.play();
}