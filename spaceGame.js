
let gameInterface=document.getElementById('game-interface');
let obstacleInterface=document.getElementById('obstacle-interface')
let ufo=document.getElementById('ufo-div');
let userPointsHeader=document.getElementById('user-points');
let userPoints=5;
let ufoPosition=ufo.getBoundingClientRect();
let topp=0;
let bullets=[];
let obstacleCount=0;
let shootedCount=0;
let bossPoints=15;

let isGameOver=false;

function control(e){
     if(e.code=='ArrowUp'){
        movingUp(ufo);
        
     }
     else if(e.code=='ArrowDown'){
        movingDown(ufo);
        
     }
}

function movingUp(object){

    if(object.style.top != (0)+'px'){

        object.style.top=topp+'px';
        topp-=3;
    }
    
}
function movingDown(object){

    if(object.style.top!=(369)+'px'){

        object.style.top=topp+'px';
        topp+=3;
    }
}

function ufoBullets(){

        let speed=0
        let bullet=document.createElement('div');
        bullet.className='ufo-bullet';
        
        bullet.style.top=parseInt(ufo.style.top)+10+'px';
    
        let interval=setInterval(()=>{
        

            bullet.style.left=speed+'px';
            
            gameInterface.append(bullet);

            speed+=20;
            if(speed > 950){
                clearInterval(interval)
                bullet.remove()
                bullets = bullets.filter(b => b !== bullet); 
            }
        },20)

        bullets.push(bullet)
        return bullet;
   
}

setInterval(()=>{

    console.log(obstacleCount)
   if(userPoints>0 && !isGameOver){
    ufoBullets();
   }

   if(userPoints==0){
     isGameOver=true
   }
},250)

function createObstacles(){

    if( userPoints > 1 && obstacleCount < 4 ){
        let obstacleHipPoints=5;
    
    let obstacleDiv=document.createElement('div');
    obstacleDiv.className='obstacle-div';

    let obstacle=document.createElement('div');
    obstacle.className='obstacle';
    
    let obstaclePointsHeader=document.createElement('div')
    obstaclePointsHeader.className='obstacle-header';

    obstacleDiv.style.left='930px';

    let speed=parseInt(obstacleDiv.style.left);
    obstacleDiv.style.top=Math.floor(Math.random()*350)+'px';
    
    
   
    let interval=setInterval(()=>{
       
        bullets.forEach(bullet=>{
            
            if(isBulletHitObstacle(bullet,obstacle)){
                    obstacleHipPoints--
                    obstaclePointsHeader.innerHTML=obstacleHipPoints;
                    console.log(obstaclePointsHeader)
                    if(obstacleHipPoints == 0 ){

                          clearInterval(interval);

                                obstacleDiv.remove()
                                clearElement(obstacle);
                                clearElement(obstacleDiv);
                                clearElement(obstaclePointsHeader);

                          createObstacles();
                          shootedCount++;
                          obstacleCount++;
                    }
            }
         })
        obstacleDiv.style.left=speed+'px';
        speed-=15;
        obstacleDiv.append(obstacle);
        obstacleDiv.append(obstaclePointsHeader);
        obstacleInterface.append(obstacleDiv);
          
        if(parseInt(obstacleDiv.style.left)  ==  -45  ){

                clearInterval(interval);
                
                createObstacles()

                obstacleDiv.remove()
                clearElement(obstacle);
                clearElement(obstacleDiv);
                clearElement(obstaclePointsHeader);

                userPoints--;
                obstacleCount++
                userPointsHeader.innerHTML='user : '+userPoints ;
        }
        },100)
    }
    else if(shootedCount >= 1){
        bossLevel();
    }
    
}
createObstacles()


function isBulletHitObstacle(bullet,obstacle){
    if (!bullet || !obstacle) return false;
     
    let bulletRect = bullet.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if(bulletRect.right > obstacleRect.left &&
        bulletRect.left < obstacleRect.right &&
        bulletRect.bottom > obstacleRect.top &&
        bulletRect.top < obstacleRect.bottom
    ){
           return true
     }
    
}
    
document.addEventListener('keydown',control)


function clearElement(object){
    object.className='';
    object.innerHTML='';
}

function bossLevel(){

    let boss=document.createElement('div');
    boss.className='boss';

    let bossImage=document.createElement('img');
    bossImage.src='alien.jpeg';
    bossImage.className='boss';

    boss.append(bossImage);

    boss.style.left='870px';
    let speed=parseInt(boss.style.left);


            let interval=setInterval(()=>{

                if(boss.style.left == '0px'){
                    clearInterval(interval);
                    isGameOver=true;
                }

                bullets.forEach(bullet=>{

                    if(isBulletHitObstacle(bullet,boss)){

                        bossPoints--;
                        console.log(bossPoints)

                        if(bossPoints==0){
                            clearInterval(interval);
                            boss.remove()
                            isGameOver=true;
                            clearElement(boss)
                            clearElement(bossImage)
                        }
                    }
                })
                 
                boss.style.left=speed+'px';
                speed-=10;
                   
            },800)

    obstacleInterface.append(boss);        
}
