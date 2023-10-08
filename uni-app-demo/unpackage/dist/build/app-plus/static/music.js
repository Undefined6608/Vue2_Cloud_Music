import store from '@/store/index.js'

function rbf(){
 var audio = document.getElementById('music1'); 
 audio.currentTime = 0;
  audio.play();
}
function bf(){
 var audio = document.getElementById('music1'); 
 if(audio!==null){             
    //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
     alert(audio.paused);
  if(audio.paused)                     {                 
      audio.play();//audio.play();// 这个就是播放  
  }else{
   audio.pause();// 这个就是暂停
  }
 } 
}