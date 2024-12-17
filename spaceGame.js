
// getting the elements by its id / class name
let gameInterface=document.getElementById('game-interface');
let obstacleInterface=document.getElementById('obstacle-interface')
let ufo=document.getElementById('ufo-div');
let userPointsHeader=document.getElementById('user-points');
let gameOver=document.getElementById('game-over');


let userPoints=3;  // setting user hip points as 5
let topp=0;  // used top set top value for ufo
let bullets=[];   // for storing multiple bullets from ufo
let obstacleCount=0;   // obstacle count to check the maximum limit of obstacles gegerated or not
let shootedCount=0;    // for counting shooted obstacles
let bossPoints=40;   // setting boss hip points

let isGameOver=false;  // setting game over as false

// for checking the user click is Arrow up / down
function control(e){
     if(e.code=='ArrowUp'){
        movingUp(ufo); // calling this function to increase the top 'px' of ufo
        
     }
     else if(e.code=='ArrowDown'){
        movingDown(ufo); // calling thid function to decrease the top 'px' of ufo
        
     }
}

// function to increase the top 'px' of ufo
function movingUp(object){

    if(object.style.top != (0)+'px'){

        object.style.top=topp+'px';
        topp-=3;
    }
    
}

//  function to decrease the top 'px' of ufo
function movingDown(object){

    if(object.style.top!=(369)+'px'){

        object.style.top=topp+'px';
        topp+=3;
    }
}

// this interval for calling those function for each 250ms
let interval = setInterval(()=>{

    if(userPoints>0 && !isGameOver){  // checking the user point is > 0 , and game is over or not
 
     ufoBullets(); // calling the ufo bullet generating function
 
    } 
    if(userPoints==0){  // checking the user point is 0 , if it is 0 then the game is over
 
      isGameOver=true  // setting the game over as true
      clearInterval(interval); // clear the interval 
      gameOverMessage(); // calling the game over message
 
    }
    if(bossPoints==0){  // checking the boss point is 0 or not
 
       clearInterval(interval); // if it is 0, clear the interval
       userWonMEssage(); // call the user won message
 
    }
 },250)
 

// to generate bullets from ufo space ship
function ufoBullets(){

        let speed=0  // initiate speed as 0

        let bullet=document.createElement('div');  // creating a element 'div' for bullet
        bullet.className='ufo-bullet';  // setting class name as 'ufo-bullet'
        
        bullet.style.top=parseInt(ufo.style.top)+10+'px';  // setting bullet top as (ufo top position + 10 px) 10px for centering the bullet on ufo
    
        let interval=setInterval(()=>{   // this interval for moving the bullet to the right at 20ms
        

            bullet.style.left=speed+'px';  // setting bullet left position as speed
            
            speed+=10;  // increasing speed as 10px per each 20ms

            gameInterface.append(bullet);  // append a bullet to the game interface

            // checking the speed is greater than 950 , beacuse 950 is maximum length of the bullet
            if(speed > 950){  
                clearInterval(interval)  // clear the interval 
                bullet.remove()  // to remove the bullet when it reached the end limit 
                bullets = bullets.filter(b => b !== bullet);  // remove the bullet from the array bullets[]
            }
        },20)

        bullets.push(bullet)  // pushing bullet to the array bullets[]
       
}


// to create obstacles from the other end
function createObstacles(){

    if( userPoints > 1 && obstacleCount < 4 ){  // checking the user points > 1 and obstacle < 4
            
            let obstacleHipPoints = 5;  // setting the obstacle points as 5 . every time this function called , the obstacle should be created and its hip points set as 5
            
            // create element 'div' for obstacle div
            let obstacleDiv=document.createElement('div');
            obstacleDiv.className='obstacle-div';

            //creating element div for obstacle
            let obstacle=document.createElement('div');
            obstacle.className='obstacle';
            
            // creating element 'div' for hip points header
            let obstaclePointsHeader=document.createElement('div')
            obstaclePointsHeader.className='obstacle-header';

            // setting obstacle div left position as 930px , because thats a starting point for obstacle   
            obstacleDiv.style.left='930px';

            // setting speed as left position of obstacle div
            let speed=parseInt(obstacleDiv.style.left);

            // this is for creating a random numbers for setting top position of the obstacle div
            obstacleDiv.style.top=Math.floor(Math.random()*350)+'px';
            
            // this interval for moving obstacale div to left side as 20ms
            let interval=setInterval(()=>{
            
                bullets.forEach(bullet=>{   // for getting the bullet from the  array bullets[]
                    
                    if(isBulletHitObstacle(bullet,obstacle)){  // cheking the bullet is hitting obstacle or not
                           
                            obstacleHipPoints--;   // reduce obstacle points -1 
                            obstaclePointsHeader.innerHTML=obstacleHipPoints;  // setting obstacle hip points div text content as points of obstacle
                            bullet.className=''; // remove the color of the bullet after touching the obstacle

                            if(obstacleHipPoints == 0 ){  // if obstacle hip points is 0

                                clearInterval(interval); // clear the interval

                                        obstacleDiv.remove(); // remove obstcale div
                                        clearElement(obstacle);  // remove obstcale class name and its inner html
                                        clearElement(obstacleDiv); // rmeove obstacle div class name and ts inner html
                                        clearElement(obstaclePointsHeader); // rmeove obstacle hip points viwer 's class name and its inner html

                                createObstacles(); // then re-generate the obstacle
                                shootedCount++; // adding +1 on shooted count , because if the value is 0 , it must be shooted
                                obstacleCount++; // adding +1 on obstacle count , to count the obstcale
                            }
                    }
                })

                obstacleDiv.style.left=speed+'px';  // setting obstcale div's left position as speed px
                speed-=3; // decreasing -3 on speed to move the obstacle

                obstacleDiv.append(obstacle);  // append obstacle on obstacle div
                obstacleDiv.append(obstaclePointsHeader); // append obstacle hip points header on obstacle div
               
                obstacleInterface.append(obstacleDiv);  // append obstacle div on obstacle interface
                
                if(parseInt(obstacleDiv.style.left)  <=  -45  ){  // checking the obstacle div left position is < = -45 , because -45 is end limit

                        clearInterval(interval); // clear the interval
                        
                        createObstacles(); // re-generate the obstacle

                        obstacleDiv.remove();  // remove the obstcale div 
                        clearElement(obstacle); // clear the obstcale class name and its inner html
                        clearElement(obstacleDiv); // clear the obstcale div class name and its inner html
                        clearElement(obstaclePointsHeader); // clear the obstacle hip points header's class name and its inner html
 
                        userPoints--;  // decreasing user points ,because the obstacle is passed its end limit
                        obstacleCount++; // adding +1 on obstacle count
                        userPointsHeader.innerHTML='user : '+userPoints ; // updating user points on html
                }
                },20)
            }
    else if(shootedCount >= 3){  // if the shooter count > 1, then call the boss level
         bossLevel();
    }
}

createObstacles(); // calling obstcale create function


// this is for checking the bullet touching the obstacle or not

function isBulletHitObstacle(bullet,obstacle){
    if (!bullet || !obstacle) return false;  // if bullet or obstcale is not available , return false
     
    // for grtting coordinates
    let bulletRect = bullet.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if(bulletRect.right > obstacleRect.left &&
        bulletRect.left < obstacleRect.right &&
        bulletRect.bottom > obstacleRect.top &&
        bulletRect.top < obstacleRect.bottom
    ){
           return true ; // return true because the bullet is touching the obstcale
     }
    
}
    

// to clear the object's class name and its inner html
function clearElement(object){
    object.className='';
    object.innerHTML='';
}

// to create the boss 
function bossLevel(){

    // creating div for boss 
    let boss=document.createElement('div');
    boss.className='boss';

    // creating img tag for setting boss image
    let bossImage=document.createElement('img');
    bossImage.src='alien.jpeg';  // setting the boss image
    bossImage.className='boss';

    // creating hip points header for boss
    let bossPointsHeader=document.createElement('div');
   

    // append boss image on boss div
    boss.append(bossImage);
    // append boss hip points header on boss
    boss.append(bossPointsHeader);

    boss.style.left='870px'; // setting boss left position as 870px , starting point

    let speed=parseInt(boss.style.left); // setting spped as boss left position 

            // this interval for moving boss to left side as 800ms 
            let interval=setInterval(()=>{

                bullets.forEach(bullet=>{  // getting bullet from its array

                    if(isBulletHitObstacle(bullet,boss)){ // checking bullet and boss touching or not

                        if(bullet.style.left > boss.style.left){
                            bullet.className='';
                        }
                        bossPoints--;  // decrease -1 on boss hip points 

                        bossPointsHeader.innerHTML='Health : '+bossPoints; // update boss hip points on html

                        bullet.className='';

                        if(bossPoints==0){   // if boss hip points is 0 , the boss is dead
            
                            clearInterval(interval);  // clear the interval
            
                            boss.remove(); // remove the boss
                            isGameOver=true; // setting the game over is true
                            clearElement(boss); // clear the class name and its inner html on boss
                            clearElement(bossImage);  // clear the boss image's class name and its inner html
                        }
                    }
                })

                if(parseInt(boss.style.left) <= -45 ){  // if the boss left position id < = -45 , this is end limit for boss
                      
                        gameOverMessage();  // calling game over message
                        clearInterval(interval); // clear the interval
                        boss.remove(); // remove the boss
                        isGameOver=true; // setting game over as true

                        clearElement(boss);  // clear the boss class name and inner html
                        clearElement(bossImage);  // clear the boss image class name and inner html
                }
                 
                boss.style.left=speed+'px'; // setting boss left position as speed px
                speed-=1;  // decreasing -10 on speed to move the object
                   
            },20)

    obstacleInterface.append(boss);    // append boss on obstacle interface
}


// for showing game over message
function gameOverMessage(){
    gameOver.innerHTML='Game Over :(';
}

// for showing user winning message
function userWonMEssage(){
    gameOver.innerHTML='You Won :)';
}

//listen the all key down and pass it to the control function
document.addEventListener('keydown',control);
